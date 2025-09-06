'use client';

import { useState, useEffect, useCallback } from 'react';
import { getOrdersWithFilters, getOrdersForExport, updateOrderStatus } from '@/app/actions/admin';
import { Download, Filter, RefreshCw, Eye, Calendar, CreditCard, CheckCircle, Clock, XCircle, Check, X } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Order {
    id: string;
    buyerName: string;
    buyerLastName: string;
    buyerEmail: string;
    payMethod: string;
    total: number;
    status: string;
    createdAt: string;
    orderItems: Array<{
        quantity: number;
        price: number;
        product?: { name: string; category: string };
        combo?: { name: string };
    }>;
}

interface OrdersTableProps {
    initialOrders: Order[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        status: 'all',
        payMethod: 'all',
        startDate: '',
        endDate: '',
    });

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

    const handleFilterChange = useCallback(async () => {
        setLoading(true);
        try {
            const filteredOrders = await getOrdersWithFilters(filters);
            // Convertir fechas a string para que coincida con el tipo Order
            const ordersWithStringDates = filteredOrders.map((order) => ({
                ...order,
                createdAt: order.createdAt.toString(),
            }));
            setOrders(ordersWithStringDates);
        } catch (error) {
            console.error('Error filtrando órdenes:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const refreshedOrders = await getOrdersWithFilters(filters);
            // Convertir fechas a string para que coincida con el tipo Order
            const ordersWithStringDates = refreshedOrders.map((order) => ({
                ...order,
                createdAt: order.createdAt.toString(),
            }));
            setOrders(ordersWithStringDates);
        } catch (error) {
            console.error('Error actualizando órdenes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (orderId: string, newStatus: 'pending' | 'paid' | 'cancelled') => {
        setUpdatingOrder(orderId);
        try {
            const result = await updateOrderStatus(orderId, newStatus);
            if (result.success) {
                // Actualizar la orden en el estado local
                setOrders((prevOrders) => prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus === 'paid' ? 'approved' : newStatus } : order)));
            } else {
                console.error('Error actualizando estado:', result.message);
            }
        } catch (error) {
            console.error('Error actualizando estado:', error);
        } finally {
            setUpdatingOrder(null);
        }
    };

    const handleExport = async () => {
        try {
            const exportData = await getOrdersForExport(filters);

            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Órdenes');

            const fileName = `ordenes_${new Date().toISOString().split('T')[0]}.xlsx`;
            XLSX.writeFile(wb, fileName);
        } catch (error) {
            console.error('Error exportando:', error);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
            case 'approved':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'cancelled':
            case 'rejected':
                return <XCircle className="w-4 h-4 text-red-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'paid':
            case 'approved':
                return 'Pagado';
            case 'pending':
                return 'Pendiente';
            case 'cancelled':
            case 'rejected':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const getPayMethodIcon = (payMethod: string) => {
        return payMethod === 'mercadopago' ? <CreditCard className="w-4 h-4 text-blue-600" /> : <span className="text-green-600 font-bold text-sm">💵</span>;
    };

    useEffect(() => {
        if (filters.status !== 'all' || filters.payMethod !== 'all' || filters.startDate || filters.endDate) {
            handleFilterChange();
        }
    }, [filters.status, filters.payMethod, filters.startDate, filters.endDate, handleFilterChange]);

    return (
        <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4 mb-4">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Estado */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-chelsea-cucumber-500"
                        >
                            <option value="all">Todos</option>
                            <option value="paid">Pagado</option>
                            <option value="pending">Pendiente</option>
                            <option value="cancelled">Cancelado</option>
                        </select>
                    </div>

                    {/* Método de pago */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                        <select
                            value={filters.payMethod}
                            onChange={(e) => setFilters({ ...filters, payMethod: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-chelsea-cucumber-500"
                        >
                            <option value="all">Todos</option>
                            <option value="mercadopago">MercadoPago</option>
                            <option value="cash">Efectivo</option>
                        </select>
                    </div>

                    {/* Fecha desde */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-chelsea-cucumber-500"
                        />
                    </div>

                    {/* Fecha hasta */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-chelsea-cucumber-500"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button onClick={() => setFilters({ status: 'all', payMethod: 'all', startDate: '', endDate: '' })} className="text-gray-600 hover:text-gray-800 text-sm">
                        Limpiar filtros
                    </button>

                    <button onClick={handleExport} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Exportar Excel
                    </button>
                </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Órdenes</p>
                            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pagadas</p>
                            <p className="text-2xl font-bold text-green-600">{orders.filter((o) => o.status === 'paid' || o.status === 'approved').length}</p>
                        </div>
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-600">{orders.filter((o) => o.status === 'pending').length}</p>
                        </div>
                        <Clock className="w-12 h-12 text-yellow-600" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Ventas</p>
                            <p className="text-2xl font-bold text-chelsea-cucumber-600">
                                $
                                {orders
                                    .filter((o) => o.status === 'approved' || o.status === 'paid')
                                    .reduce((sum, o) => sum + o.total, 0)
                                    .toLocaleString('es-AR')}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-chelsea-cucumber-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Órdenes</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={handleRefresh} disabled={loading} className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50">
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Actualizar
                        </button>
                        {loading && <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pago</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">#{order.id.slice(-8)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {order.buyerName} {order.buyerLastName}
                                            </div>
                                            <div className="text-sm text-gray-500">{order.buyerEmail}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                            <div>
                                                <div className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString('es-AR')}</div>
                                                <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleTimeString('es-AR', { hour12: false, hour: '2-digit', minute: '2-digit' })}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getPayMethodIcon(order.payMethod)}
                                            <span className="ml-2 text-sm text-gray-900">{order.payMethod === 'mercadopago' ? 'MercadoPago' : 'Efectivo'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon(order.status)}
                                            <span className="ml-2 text-sm text-gray-900">{getStatusText(order.status)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.total.toLocaleString('es-AR')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setSelectedOrder(order)} className="text-chelsea-cucumber-600 hover:text-chelsea-cucumber-900 p-1 rounded" title="Ver detalle">
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            {/* Botones para cambiar estado */}
                                            {order.status === 'pending' && order.payMethod === 'cash' && (
                                                <button
                                                    onClick={() => handleUpdateOrderStatus(order.id, 'paid')}
                                                    disabled={updatingOrder === order.id}
                                                    className="text-green-600 hover:text-green-800 p-1 rounded disabled:opacity-50"
                                                    title="Marcar como pagado"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}

                                            {(order.status === 'paid' || order.status === 'approved') && (
                                                <button
                                                    onClick={() => handleUpdateOrderStatus(order.id, 'pending')}
                                                    disabled={updatingOrder === order.id}
                                                    className="text-yellow-600 hover:text-yellow-800 p-1 rounded disabled:opacity-50"
                                                    title="Marcar como pendiente"
                                                >
                                                    <Clock className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {orders.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No se encontraron órdenes</p>
                    </div>
                )}
            </div>

            {/* Modal de detalle */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Detalle de Orden #{selectedOrder.id.slice(-8)}</h3>
                                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                                    <XCircle className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Cliente</p>
                                        <p className="font-medium">
                                            {selectedOrder.buyerName} {selectedOrder.buyerLastName}
                                        </p>
                                        <p className="text-sm text-gray-500">{selectedOrder.buyerEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Fecha</p>
                                        <p className="font-medium">
                                            {new Date(selectedOrder.createdAt).toLocaleDateString('es-AR')} {new Date(selectedOrder.createdAt).toLocaleTimeString('es-AR', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="font-medium mb-3">Items</h4>
                                    <div className="space-y-2">
                                        {selectedOrder.orderItems.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                                <div>
                                                    <p className="font-medium">{item.product?.name || item.combo?.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Cantidad: {item.quantity} | Precio: ${item.price.toLocaleString('es-AR')}
                                                    </p>
                                                </div>
                                                <p className="font-medium">${(item.price * item.quantity).toLocaleString('es-AR')}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t pt-4 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center">
                                            {getPayMethodIcon(selectedOrder.payMethod)}
                                            <span className="ml-2 font-medium">{selectedOrder.payMethod === 'mercadopago' ? 'MercadoPago' : 'Efectivo'}</span>
                                        </div>
                                        <div className="flex items-center">
                                            {getStatusIcon(selectedOrder.status)}
                                            <span className="ml-2 font-medium">{getStatusText(selectedOrder.status)}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Total</p>
                                        <p className="text-2xl font-bold text-chelsea-cucumber-600">${selectedOrder.total.toLocaleString('es-AR')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
