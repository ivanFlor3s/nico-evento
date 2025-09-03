'use client';

import { Home, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailure() {
    return (
        <>
            <div className="min-h-screen bg-red-400 flex items-center justify-center">
                <div className="max-w-md w-full mx-4 bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                        <XCircle className="w-12 h-12 text-red-600 mb-4" />
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Pago Fallido</h2>
                        <p className="text-gray-600">Lamentablemente no pudimos procesar tu pago</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-start">
                        <h4 className="text-sm text-yellow-800 mb-2">Posibles causas:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• Fondos insuficientes en la tarjeta</li>
                            <li>• Datos de la tarjeta incorrectos</li>
                            <li>• Límite de compras excedido</li>
                            <li>• Problemas temporales del banco</li>
                            <li>• Pago cancelado por el usuario</li>
                        </ul>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/" className="w-full">
                            <button className=" w-full bg-amber-200 border-2 border-amber-200 cursor-pointer font-medium py-2 px-8 rounded-lg  mx-2 hover:bg-amber-200 text-chelsea-cucumber-700 transition-colors">
                                <Home className="inline mr-2" />
                                Ir al Inicio
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
