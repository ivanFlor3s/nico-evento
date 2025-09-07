'use client';

import { useState } from 'react';
import OrdersTable from './OrdersTable';
import CacheManager from './CacheManager';
import { BarChart3, Database, LogOut, RefreshCw } from 'lucide-react';
import { adminLogout } from '@/app/actions/admin';

interface AdminOrder {
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

interface AdminDashboardProps {
    initialOrders: AdminOrder[];
}

const AdminDashboard = ({ initialOrders }: AdminDashboardProps) => {
    const [activeTab, setActiveTab] = useState('orders');

    const handleLogout = async () => {
        try {
            await adminLogout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const tabs = [
        { id: 'orders', label: 'Órdenes', icon: BarChart3 },
        { id: 'cache', label: 'Cache', icon: RefreshCw },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Database className="w-8 h-8 text-chelsea-cucumber-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                        </div>

                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors">
                            <LogOut className="w-5 h-5" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="mb-8">
                    <nav className="flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id ? 'border-chelsea-cucumber-500 text-chelsea-cucumber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow">
                    {activeTab === 'orders' && <OrdersTable initialOrders={initialOrders} />}
                    {activeTab === 'cache' && <CacheManager />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
