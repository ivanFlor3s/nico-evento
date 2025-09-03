'use client';

import { Clock, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPending() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <>
            <div className="min-h-screen bg-yellow-400 flex items-center justify-center">
                <div className="max-w-md w-full mx-4 bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                        <Clock className="w-12 h-12 text-yellow-600 mb-4 animate-pulse" />
                        <h2 className="text-2xl font-bold text-yellow-600 mb-4">Pago Pendiente</h2>
                        <p className="text-gray-600 mb-4">Tu pago está siendo procesado</p>
                        <p className="text-sm text-gray-500">Por favor, espera unos momentos mientras confirmamos tu transacción</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg text-start mb-6">
                        <h4 className="text-sm text-yellow-800 mb-2">Importante:</h4>
                        <p className="text-sm text-yellow-700">No cierres esta ventana ni actualices la página. El proceso puede tardar hasta 3 minutos.</p>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={handleRefresh} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                            <RefreshCw className="inline mr-2 w-4 h-4" />
                            Actualizar Estado
                        </button>

                        <Link href="/" className="flex-1">
                            <button className="w-full bg-gray-200 border-2 border-gray-200 cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-gray-300 text-gray-700 transition-colors">
                                <Home className="inline mr-2 w-4 h-4" />
                                Ir al Inicio
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
