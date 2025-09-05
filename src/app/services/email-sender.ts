import { Resend } from 'resend';
import { CartItem } from '@/components/shop/CartSidebar';
import { simplifyOrderId } from '@/lib/order-id-format';

const resend = new Resend(process.env.RESEND_API_KEY);

// Función para generar el HTML del email
const generateEmailHTML = (firstName: string, lastName: string, cartItems: CartItem[], orderId: string): string => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const itemsHTML = cartItems.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
            <div>
                <span style="font-weight: bold; color: #374151;">
                    ${item.name}
                </span>
                <br />
                <span style="font-size: 14px; color: #6b7280;">
                    $${item.price.toLocaleString('es-AR')} x ${item.quantity}
                </span>
            </div>
            <div style="font-weight: bold; color: #059669;">
                $${(item.price * item.quantity).toLocaleString('es-AR')}
            </div>
        </div>
    `).join('');

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            <!-- Header -->
            <div style="background-color: #059669; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">¡Confirmación de Compra! 🎉</h1>
                <p style="margin: 8px 0 0 0; opacity: 0.9;">Peña Iglesia - Orden #${simplifyOrderId(orderId)}</p>
            </div>

            <!-- Content -->
            <div style="background-color: white; padding: 24px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #374151; font-size: 18px; margin-bottom: 16px;">
                    Hola ${firstName} ${lastName}!
                </h2>

                <p style="color: #6b7280; line-height: 1.5; margin-bottom: 24px;">
                    ¡Gracias por tu compra! Tu pago ha sido procesado exitosamente. Aquí tienes los detalles de tu orden:
                </p>

                <!-- Items -->
                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
                    <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">
                        Items Comprados:
                    </h3>
                    ${itemsHTML}
                </div>

                <!-- Total -->
                <div style="text-align: right; padding: 16px 0; border-top: 2px solid #059669;">
                    <span style="font-size: 20px; font-weight: bold, color: #059669;">
                        Total: $${total.toLocaleString('es-AR')}
                    </span>
                </div>

                <!-- Info adicional -->
                <div style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 6px; padding: 16px; margin-top: 24px;">
                    <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px;">
                        📅 Información del Evento
                    </h4>
                    <div style="margin: 0; color: #374151; font-size: 14px; line-height: 1.8;">
                        <p style="margin: 0 0 8px 0;"><strong>📅 Fecha:</strong> Sábado, 27 de Diciembre de 2024</p>
                        <p style="margin: 0 0 8px 0;"><strong>🕕 Horario:</strong> A partir de las 11:30 hs</p>
                        <p style="margin: 0 0 8px 0;"><strong>🏛️ Lugar:</strong> "El Campito"</p>
                        <p style="margin: 0 0 8px 0;"><strong>📍 Dirección:</strong> Herrera 554, CABA</p>
                        <p style="margin: 0;"><strong>🌳 Ambiente:</strong> Espacio al aire libre</p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                        ¡Te esperamos en la peña! 🎵<br />
                        Si tienes alguna pregunta, no dudes en contactarnos.
                    </p>
                </div>
            </div>
        </div>
    `;
};

// Función para generar el HTML del email de pago en efectivo
const generateCashPaymentEmailHTML = (firstName: string, lastName: string, cartItems: CartItem[], orderId: string): string => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const itemsHTML = cartItems.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
            <div>
                <span style="font-weight: bold; color: #374151;">
                    ${item.name}
                </span>
                <br />
                <span style="font-size: 14px; color: #6b7280;">
                    $${item.price.toLocaleString('es-AR')} x ${item.quantity}
                </span>
            </div>
            <div style="font-weight: bold; color: #f59e0b;">
                $${(item.price * item.quantity).toLocaleString('es-AR')}
            </div>
        </div>
    `).join('');

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            <!-- Header -->
            <div style="background-color: #f59e0b; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">💵 ¡Reserva Confirmada! 📋</h1>
                <p style="margin: 8px 0 0 0; opacity: 0.9;">Pago en Efectivo - Orden #${orderId}</p>
            </div>

            <!-- Content -->
            <div style="background-color: white; padding: 24px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #374151; font-size: 18px; margin-bottom: 16px;">
                    Hola ${firstName} ${lastName}!
                </h2>

                <p style="color: #6b7280; line-height: 1.5; margin-bottom: 24px;">
                    ¡Gracias por tu reserva! Hemos registrado tu pedido para <strong>pago en efectivo</strong>. 
                    Aquí tienes los detalles de tu orden:
                </p>

                <!-- Items -->
                <div style="background-color: #fef3c7; padding: 16px; border-radius: 6px; margin-bottom: 24px; border-left: 4px solid #f59e0b;">
                    <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 16px;">
                        📦 Items Reservados:
                    </h3>
                    ${itemsHTML}
                </div>

                <!-- Total -->
                <div style="text-align: right; padding: 16px 0; border-top: 2px solid #f59e0b;">
                    <span style="font-size: 20px; font-weight: bold; color: #f59e0b;">
                        Total a Pagar: $${total.toLocaleString('es-AR')}
                    </span>
                </div>

                <!-- Instrucciones de Pago -->
                <div style="background-color: #fef2f2; border: 1px solid #ef4444; border-radius: 6px; padding: 16px; margin-top: 24px;">
                    <h4 style="margin: 0 0 8px 0; color: #dc2626;">
                        Instrucciones de Pago
                    </h4>
                    <div style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                        <p style="margin: 0 0 8px 0;"><strong>• Debes pagar en efectivo el día del evento</strong></p>
                        <p style="margin: 0 0 8px 0;"><strong>• Presenta este email en la entrada</strong></p>
                        <p style="margin: 0;"><strong>• Total a abonar: $${total.toLocaleString('es-AR')}</strong></p>
                    </div>
                </div>

                <!-- Info del Evento -->
                <div style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 6px; padding: 16px; margin-top: 24px;">
                    <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px;">
                        📅 Información del Evento
                    </h4>
                    <div style="margin: 0; color: #374151; font-size: 14px; line-height: 1.8;">
                        <p style="margin: 0 0 8px 0;"><strong>📅 Fecha:</strong> Sábado, 27 de Diciembre de 2024</p>
                        <p style="margin: 0 0 8px 0;"><strong>🕕 Horario:</strong> A partir de las 11:30 hs</p>
                        <p style="margin: 0 0 8px 0;"><strong>🏛️ Lugar:</strong> "El Campito"</p>
                        <p style="margin: 0 0 8px 0;"><strong>📍 Dirección:</strong> Herrera 554, CABA</p>
                        <p style="margin: 0 0 8px 0;"><strong>🌳 Ambiente:</strong> Espacio al aire libre</p>
                        <p style="margin: 0;"><strong>🎫 Tu código de reserva:</strong> #${simplifyOrderId(orderId)}</p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                        ¡Te esperamos en la peña! 🎵<br />
                        Si tienes alguna pregunta, no dudes en contactarnos.
                    </p>
                </div>
            </div>
        </div>
    `;
};

export const sendEmail = async (to: string, orderId: string, buyerFirstName: string, buyerLastName: string, cartItems: CartItem[]) => {
    try {
        const emailHTML = generateEmailHTML(buyerFirstName, buyerLastName, cartItems, orderId);

        const result = await resend.emails.send({
            from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL || 'onboarding@resend.dev'}>` as string,
            to,
            subject: `Confirmación de compra - Orden #${simplifyOrderId(orderId)}`,
            html: emailHTML,
        });

        console.log('✅ Email enviado exitosamente:', result);
        return result;
    } catch (error) {
        console.error('❌ Error enviando email:', error);
        throw error;
    }
};

export const sendCashPaymentEmail = async (to: string, orderId: string, buyerFirstName: string, buyerLastName: string, cartItems: CartItem[]) => {
    try {
        const emailHTML = generateCashPaymentEmailHTML(buyerFirstName, buyerLastName, cartItems, orderId);

        const result = await resend.emails.send({
            from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL || 'onboarding@resend.dev'}>` as string,
            to,
            subject: `💵 Reserva Confirmada - Pago en Efectivo - Orden #${orderId}`,
            html: emailHTML,
        });

        console.log('✅ Email de pago en efectivo enviado exitosamente:', result);
        return result;
    } catch (error) {
        console.error('❌ Error enviando email de pago en efectivo:', error);
        throw error;
    }
};