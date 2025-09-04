'use server';

import { CartItem } from '@/components/shop/CartSidebar';
import { CustomerInfo } from '@/components/shop/CustomerForm';
import { MercadoPagoService } from '@/app/services/mercado-pago';
import { createOrder, OrderData, OrderItemData, orderSetPreferenceId } from '@/lib/db/db';

export async function createPaymentPreference(orderId: string, cartItems: CartItem[], customerInfo: CustomerInfo) {
    try {


        // Validar que hay items en el carrito
        if (!cartItems || cartItems.length === 0) {
            throw new Error('El carrito está vacío');
        }

        // Validar datos del comprador
        if (!customerInfo || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
            throw new Error('Los datos del comprador son obligatorios');
        }

        // Preparar los items para MercadoPago
        const items = cartItems.map((item) => ({
            id: item.id,
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'ARS'
        }));

        // Calcular el total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        console.log('💰 Total de la compra:', total);
        console.log('📦 Items para MP:', items);

        // Crear la preferencia usando el servicio de MercadoPago
        const mercadoPagoService = new MercadoPagoService();
        const preferenceResult = await mercadoPagoService.createPreference({
            items,
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
                failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
                pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`
            },
            metadata: {
                internal_order_id: orderId,
                buyer_name: customerInfo.firstName,
                buyer_last_name: customerInfo.lastName,
                buyer_email: customerInfo.email,
                cart_items: JSON.stringify(cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    type: item.type
                })))
            }
        });

        console.log('✅ Preferencia creada exitosamente:', preferenceResult);

        return {
            success: true,
            preferenceId: preferenceResult.id,
            initPoint: preferenceResult.init_point
        };

    } catch (error) {
        console.error('❌ Error creando preferencia de pago:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido al crear la preferencia'
        };
    }
}

export const startPayment = async (cartItems: CartItem[], customerInfo: CustomerInfo) => {
    try {
        console.log('🚀 Iniciando proceso completo de pago...');


        // Calcular el total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // 2. Crear la orden en la base de datos
        const orderResult = await createOrderInDb(
            cartItems,
            customerInfo,
            'mercadopago',
            total,
            undefined,
            undefined
        );

        if (!orderResult.success) {
            console.error('⚠️ Error creando orden en BD, pero la preferencia ya fue creada',
                JSON.stringify({ cartItems, customerInfo }));
            return {
                success: false,
                error: `Error creando orden en BD: ${orderResult.error}`
            };
        }

        const preferenceResult = await createPaymentPreference(orderResult.order?.id as string, cartItems, customerInfo);

        if (!preferenceResult.success) {
            return {
                success: false,
                error: `Error creando preferencia: ${preferenceResult.error}`
            };
        }

        await orderSetPreferenceId(orderResult.orderId as string, preferenceResult.preferenceId as string);

        console.log('✅ Proceso completo exitoso');

        return {
            success: true,
            preferenceId: preferenceResult.preferenceId,
            initPoint: preferenceResult.initPoint,
            orderId: orderResult.success ? orderResult.orderId : undefined,
            order: orderResult.success ? orderResult.order : undefined
        };

    } catch (error) {
        console.error('❌ Error en startPayment:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido en el proceso de pago'
        };
    }
}

const createOrderInDb = async (cartItems: CartItem[], customerInfo: CustomerInfo, paymentMethod: string, total: number, paymentId?: number, preferenceId?: string) => {
    try {
        // Preparar datos de la orden
        const orderData: OrderData = {
            buyerName: customerInfo.firstName,
            buyerLastName: customerInfo.lastName,
            buyerEmail: customerInfo.email,
            payMethod: paymentMethod,
            total: total,
            status: 'pending',
            paymentId: paymentId,
            preferenceId: preferenceId
        };

        // Preparar items de la orden
        const orderItems: OrderItemData[] = cartItems.map(item => ({
            productId: item.type === 'product' ? item.id : undefined,
            comboId: item.type === 'combo' ? item.id : undefined,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity
        }));

        // Crear la orden en la base de datos
        const order = await createOrder(orderData, orderItems);

        console.log('📝 Orden creada en BD:', order.id);

        return {
            success: true,
            orderId: order.id,
            order: order
        };

    } catch (error) {
        console.error('❌ Error creando orden en BD:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido al crear la orden'
        };
    }
}

export const createCashPayment = async (cartItems: CartItem[], customerInfo: CustomerInfo) => {
    try {
        console.log('💵 Iniciando proceso de pago en efectivo...');
        console.log('👤 Datos del comprador:', customerInfo);

        // Calcular el total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Crear la orden en la base de datos con estado pending
        const orderResult = await createOrderInDb(
            cartItems,
            customerInfo,
            'cash', // método de pago en efectivo
            total,
            undefined, // sin paymentId para efectivo
            undefined  // sin preferenceId para efectivo
        );

        if (!orderResult.success) {
            return {
                success: false,
                error: `Error creando orden en BD: ${orderResult.error}`
            };
        }

        console.log('✅ Orden de efectivo creada exitosamente:', orderResult.orderId);

        // Enviar email de confirmación para pago en efectivo
        try {
            const { sendCashPaymentEmail } = await import('@/app/services/email-sender');
            await sendCashPaymentEmail(
                customerInfo.email,
                orderResult.orderId as string,
                customerInfo.firstName,
                customerInfo.lastName,
                cartItems
            );
            console.log('📧 Email de confirmación de efectivo enviado');
        } catch (emailError) {
            console.error('⚠️ Error enviando email de efectivo:', emailError);
            // No fallar el proceso si no se puede enviar el email
        }

        return {
            success: true,
            orderId: orderResult.orderId,
            order: orderResult.order,
            paymentMethod: 'cash'
        };

    } catch (error) {
        console.error('❌ Error en createCashPayment:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido en el proceso de pago en efectivo'
        };
    }
}