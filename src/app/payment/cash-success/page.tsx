import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { simplifyOrderId } from '@/lib/order-id-format';

interface CashSuccessContentProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

function CashSuccessContent({ searchParams }: CashSuccessContentProps) {
    const orderId = searchParams.orderId as string;
    const customerEmail = searchParams.email as string;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Tarjeta principal */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-amber-500 text-white p-8 text-center">
                        <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold mb-2">¡Reserva Confirmada! 🎉</h1>
                        <p className="text-amber-100 text-lg">Pago en Efectivo</p>
                    </div>

                    {/* Contenido */}
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">¡Gracias por tu reserva!</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Tu reserva ha sido confirmada exitosamente.
                                {customerEmail && (
                                    <span>
                                        {' '}
                                        Te hemos enviado todos los detalles a <strong>{customerEmail}</strong>.
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Código de reserva destacado */}
                        {orderId && (
                            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-8 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">🎫 Tu Código de Reserva</h3>
                                <div className="text-3xl font-mono font-bold text-amber-600 bg-white inline-block px-4 py-2 rounded ">#{simplifyOrderId(orderId)}</div>
                                <p className="text-sm text-gray-600 mt-2">Presenta este código en la entrada</p>
                            </div>
                        )}

                        {/* Instrucciones */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                            <div className="space-y-3 text-amber-700">
                                <p className="flex items-start">
                                    <span className="text-amber-500 mr-2">💵</span>
                                    <span>El pago se realizará en efectivo el día del evento</span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-amber-500 mr-2">📱</span>
                                    <span>Presenta el email o tu código de reserva en la entrada</span>
                                </p>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/" className="px-6 py-3 bg-chelsea-cucumber-600 text-white rounded-lg font-semibold hover:bg-chelsea-cucumber-700 transition-colors">
                                🏠 Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">¿Tienes alguna pregunta? No dudes en contactarnos.</p>
                    <p className="text-gray-400 text-xs mt-2">Peña de la Iglesia • 2025</p>
                </div>
            </div>
        </div>
    );
}

export default function CashSuccessPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chelsea-cucumber-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando confirmación...</p>
                    </div>
                </div>
            }
        >
            <CashSuccessContent searchParams={searchParams} />
        </Suspense>
    );
}
