import { CartItem } from '../shop/CartSidebar';

interface EmailTemplateProps {
    firstName: string;
    lastName: string;
    cartItems: CartItem[];
    orderId: string;
}

export function EmailTemplate({ firstName, lastName, cartItems, orderId }: EmailTemplateProps) {
    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#f9fafb',
            }}
        >
            {/* Header */}
            <div
                style={{
                    backgroundColor: '#059669',
                    color: 'white',
                    padding: '24px',
                    borderRadius: '8px 8px 0 0',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ margin: '0', fontSize: '24px' }}>¡Confirmación de Compra! 🎉</h1>
                <p style={{ margin: '8px 0 0 0', opacity: '0.9' }}>Peña Iglesia - Orden #{orderId}</p>
            </div>

            {/* Content */}
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '0 0 8px 8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2
                    style={{
                        color: '#374151',
                        fontSize: '18px',
                        marginBottom: '16px',
                    }}
                >
                    Hola {firstName} {lastName}!
                </h2>

                <p
                    style={{
                        color: '#6b7280',
                        lineHeight: '1.5',
                        marginBottom: '24px',
                    }}
                >
                    ¡Gracias por tu compra! Tu pago ha sido procesado exitosamente. Aquí tienes los detalles de tu orden:
                </p>

                {/* Items */}
                <div
                    style={{
                        backgroundColor: '#f3f4f6',
                        padding: '16px',
                        borderRadius: '6px',
                        marginBottom: '24px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            color: '#374151',
                            fontSize: '16px',
                        }}
                    >
                        Items Comprados:
                    </h3>

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px 0',
                                borderBottom: '1px solid #e5e7eb',
                            }}
                        >
                            <div>
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#374151',
                                    }}
                                >
                                    {item.name}
                                </span>
                                <br />
                                <span
                                    style={{
                                        fontSize: '14px',
                                        color: '#6b7280',
                                    }}
                                >
                                    ${item.price.toLocaleString('es-AR')} x {item.quantity}
                                </span>
                            </div>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    color: '#059669',
                                }}
                            >
                                ${(item.price * item.quantity).toLocaleString('es-AR')}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div
                    style={{
                        textAlign: 'right',
                        padding: '16px 0',
                        borderTop: '2px solid #059669',
                    }}
                ></div>

                {/* Info adicional */}
                <div
                    style={{
                        backgroundColor: '#eff6ff',
                        border: '1px solid #3b82f6',
                        borderRadius: '6px',
                        padding: '16px',
                        marginTop: '24px',
                    }}
                >
                    <h4
                        style={{
                            margin: '0 0 8px 0',
                            color: '#1e40af',
                        }}
                    >
                        📅 Información del Evento
                    </h4>
                    <p
                        style={{
                            margin: '0',
                            color: '#374151',
                            fontSize: '14px',
                        }}
                    >
                        <strong>Fecha:</strong> [FECHA DEL EVENTO]
                        <br />
                        <strong>Lugar:</strong> [DIRECCIÓN]
                        <br />
                        <strong>Horario:</strong> [HORA DE INICIO]
                    </p>
                </div>

                {/* Footer */}
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '32px',
                        paddingTop: '16px',
                        borderTop: '1px solid #e5e7eb',
                    }}
                >
                    <p
                        style={{
                            color: '#6b7280',
                            fontSize: '14px',
                            margin: '0',
                        }}
                    >
                        ¡Te esperamos en la peña! 🎵
                        <br />
                        Si tienes alguna pregunta, no dudes en contactarnos.
                    </p>
                </div>
            </div>
        </div>
    );
}
