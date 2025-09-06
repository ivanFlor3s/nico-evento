'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAllOrders, getOrdersByStatus, getOrdersByPayMethod } from '@/lib/db/db';

// Función para verificar autenticación de admin
export async function verifyAdminAuth() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin-session');

    if (!adminSession || adminSession.value !== process.env.ADMIN_SESSION_SECRET) {
        return false;
    }

    return true;
}

// Función para login de admin
export async function adminLogin(email: string, password: string) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
        const cookieStore = await cookies();
        cookieStore.set('admin-session', process.env.ADMIN_SESSION_SECRET || 'default-secret', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 7 días
        });

        redirect('/admin/dashboard');
    } else {
        throw new Error('Credenciales inválidas');
    }
}

// Función para logout de admin
export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin-session');
    redirect('/admin');
}

// Función para limpiar cache
export async function clearCache() {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        throw new Error('No autorizado');
    }

    try {
        // Revalidar todas las rutas principales
        revalidatePath('/');
        revalidatePath('/comprar');
        revalidateTag('orders');
        revalidateTag('products');
        revalidateTag('combos');
        revalidateTag('landing-offers');

        return { success: true, message: 'Cache limpiado exitosamente' };
    } catch (error) {
        console.error('Error limpiando cache:', error);
        return { success: false, message: 'Error limpiando cache' };
    }
}

// Función para obtener órdenes con filtros
export async function getOrdersWithFilters(filters: {
    status?: string;
    payMethod?: string;
    startDate?: string;
    endDate?: string;
}) {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        throw new Error('No autorizado');
    }

    try {
        let orders;

        if (filters.status && filters.status !== 'all') {
            orders = await getOrdersByStatus(filters.status);
        } else if (filters.payMethod && filters.payMethod !== 'all') {
            orders = await getOrdersByPayMethod(filters.payMethod);
        } else {
            orders = await getAllOrders();
        }

        // Filtrar por fecha si se proporciona
        if (filters.startDate && filters.endDate) {
            const startDate = new Date(filters.startDate);
            const endDate = new Date(filters.endDate);
            endDate.setHours(23, 59, 59, 999); // Incluir todo el día final

            orders = orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= startDate && orderDate <= endDate;
            });
        }

        return orders;
    } catch (error) {
        console.error('Error obteniendo órdenes:', error);
        throw new Error('Error obteniendo órdenes');
    }
}

// Función para generar datos de exportación Excel
export async function getOrdersForExport(filters: {
    status?: string;
    payMethod?: string;
    startDate?: string;
    endDate?: string;
}) {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        throw new Error('No autorizado');
    }

    const orders = await getOrdersWithFilters(filters);

    // Transformar datos para Excel
    return orders.map(order => ({
        'ID de Orden': order.id.slice(-8), // Últimos 8 caracteres
        'Fecha': new Date(order.createdAt).toLocaleDateString('es-AR'),
        'Hora': new Date(order.createdAt).toLocaleTimeString('es-AR', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        'Cliente': `${order.buyerName} ${order.buyerLastName}`,
        'Email': order.buyerEmail,
        'Método de Pago': order.payMethod === 'mercadopago' ? 'MercadoPago' : 'Efectivo',
        'Estado': order.status === 'pending' ? 'Pendiente' : (order.status === 'paid' || order.status === 'approved') ? 'Pagado' : 'Cancelado',
        'Total': `$${order.total.toLocaleString('es-AR')}`,
        'Items': order.orderItems.map(item =>
            `${item.product?.name || item.combo?.name} (x${item.quantity})`
        ).join(', '),
        'Cantidad de Items': order.orderItems.reduce((sum, item) => sum + item.quantity, 0)
    }));
}

// Función para actualizar el estado de una orden
export async function updateOrderStatus(orderId: string, newStatus: 'pending' | 'paid' | 'cancelled') {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        throw new Error('No autorizado');
    }

    try {
        const { updateOrderStatus: dbUpdateOrderStatus } = await import('@/lib/db/db');

        // Mapear los estados del frontend a los de la base de datos
        let dbStatus: 'pending' | 'approved' | 'rejected';
        if (newStatus === 'paid') {
            dbStatus = 'approved';
        } else if (newStatus === 'cancelled') {
            dbStatus = 'rejected';
        } else {
            dbStatus = 'pending';
        }

        await dbUpdateOrderStatus(orderId, 0, dbStatus);

        // Revalidar cache de órdenes
        revalidateTag('orders');

        return { success: true, message: 'Estado actualizado exitosamente' };
    } catch (error) {
        console.error('Error actualizando estado:', error);
        return { success: false, message: 'Error actualizando estado' };
    }
}
