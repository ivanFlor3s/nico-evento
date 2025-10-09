'use client';

import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
    return (
        <>
            <div className="min-h-screen bg-green-300 flex items-center justify-center">
                <div className="max-w-md w-full mx-4 bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                        <h2 className="text-2xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h2>
                        <p className="text-gray-600 mb-2">Tu compra se ha procesado correctamente</p>
                        <p className="text-sm text-gray-500">Recibirás un email de confirmación en breve</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg text-start my-6">
                        <h4 className="text-sm text-green-800 mb-2">Detalles de tu compra:</h4>
                        <div className="text-sm text-green-700 space-y-1">
                            <div className="flex justify-between">
                                <span>• Número de orden:</span>
                                <span className="font-mono">#12345</span>
                            </div>
                            <div className="flex justify-between">
                                <span>• Fecha del evento:</span>
                                <span>Sábado, 18 de Octubre de 2025</span>
                            </div>
                            <div className="flex justify-between">
                                <span>• Horario:</span>
                                <span>A partir de las 11:30 hs</span>
                            </div>
                            <div className="flex justify-between">
                                <span>• Lugar:</span>
                                <span>&ldquo;El Campito&rdquo; - Herrera 554</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
