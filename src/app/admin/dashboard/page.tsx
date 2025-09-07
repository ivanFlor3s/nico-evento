import { redirect } from 'next/navigation';
import { verifyAdminAuth, getOrdersWithFilters } from '@/app/actions/admin';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function AdminDashboardPage() {
    const isAuthenticated = await verifyAdminAuth();

    if (!isAuthenticated) {
        redirect('/admin');
    }

    // Obtener órdenes iniciales sin filtros
    const initialOrders = (await getOrdersWithFilters({
        status: 'all',
        payMethod: 'all',
        startDate: '',
        endDate: '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any[];

    return <AdminDashboard initialOrders={initialOrders} />;
}
