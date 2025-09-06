'use client';

import { useState } from 'react';
import { clearCache } from '@/app/actions/admin';
import { RefreshCw, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

const CacheManager = () => {
    const [isClearing, setIsClearing] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleClearCache = async () => {
        setIsClearing(true);
        setMessage(null);

        try {
            const result = await clearCache();
            setMessage({
                type: result.success ? 'success' : 'error',
                text: result.message,
            });
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'Error al limpiar el cache',
            });
        } finally {
            setIsClearing(false);
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Cache</h2>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <h3 className="text-sm font-medium text-blue-800 mb-1">Información sobre el Cache</h3>
                            <p className="text-sm text-blue-700">
                                El cache de Next.js mejora el rendimiento almacenando datos frecuentemente accedidos. Limpiar el cache forzará a la aplicación a obtener datos frescos de la base de datos.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Limpiar Todo el Cache</h3>
                            <p className="text-sm text-gray-500 mt-1">Elimina todos los datos cacheados incluyendo ofertas, combos, productos y órdenes</p>
                        </div>
                        <Trash2 className="w-8 h-8 text-gray-400" />
                    </div>

                    {message && (
                        <div className={`mb-4 p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                            <div className="flex items-center">
                                {message.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600 mr-2" /> : <AlertCircle className="w-5 h-5 text-red-600 mr-2" />}
                                <span className={`text-sm ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{message.text}</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleClearCache}
                        disabled={isClearing}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className={`w-4 h-4 ${isClearing ? 'animate-spin' : ''}`} />
                        {isClearing ? 'Limpiando Cache...' : 'Limpiar Cache'}
                    </button>
                </div>

                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">¿Cuándo limpiar el cache?</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Después de actualizar productos o combos en la base de datos</li>
                        <li>• Si los usuarios reportan datos desactualizados</li>
                        <li>• Tras modificar ofertas de la landing page</li>
                        <li>• Para forzar la actualización de estadísticas de órdenes</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CacheManager;
