import { sendEmail } from "@/app/services/email-sender";
import { MercadoPagoService } from "@/app/services/mercado-pago";
import { updateOrderStatus } from "@/lib/db/db";

export const POST = async (req: Request) => {

    console.log('Received payment notification', req);
    const body = await req.json();
    const { id } = body.data;
    console.log('Received payment notification for preference ID:', id);


    //Get payment from mercado pago
    const mpService = new MercadoPagoService();
    const payment = await mpService.getPayment(Number(id));

    if (!payment) {
        console.error('Payment not found for ID:', id);
        return new Response(null, { status: 200 });
    }

    // Mapear estados de MercadoPago a estados de la aplicación
    let orderStatus: 'pending' | 'approved' | 'rejected';

    switch (payment.status) {
        case 'approved':
            orderStatus = 'approved';
            break;
        case 'rejected':
        case 'cancelled':
            orderStatus = 'rejected';
            break;
        case 'pending':
        case 'in_process':
        case 'in_mediation':
            orderStatus = 'pending';
            break;
        default:
            console.log('⚠️ Estado de pago desconocido:', payment.status);
            orderStatus = 'pending';
    }


    //Update order in DB based on preference ID
    await updateOrderStatus(payment.metadata['internal_order_id'] as string, Number(payment.id), orderStatus);

    // Send email to customer if payment was approved
    if (orderStatus === 'approved') {
        try {
            console.log('📧 Enviando email de confirmación al cliente...');

            // Obtener los detalles de la orden desde la base de datos
            const { prisma } = await import('@/lib/db/prisma');
            const order = await prisma.order.findUnique({
                where: { id: payment.metadata['internal_order_id'] as string },
                include: {
                    orderItems: {
                        include: {
                            combo: true,
                            product: true
                        }
                    }
                }
            });

            if (!order) {
                console.error('❌ Orden no encontrada para enviar email');
            } else {
                // Convertir OrderItems a CartItems para el email
                const cartItems = order.orderItems.map((item: {
                    comboId: string | null;
                    productId: string | null;
                    price: number;
                    quantity: number;
                    combo?: { name: string } | null;
                    product?: { name: string } | null;
                }) => ({
                    id: item.comboId || item.productId || '',
                    name: item.combo?.name || item.product?.name || 'Item desconocido',
                    price: item.price,
                    quantity: item.quantity,
                    type: item.comboId ? 'combo' as const : 'product' as const
                }));

                // Enviar el email
                await sendEmail(
                    order.buyerEmail,
                    order.id,
                    order.buyerName,
                    order.buyerLastName,
                    cartItems
                );

                console.log('✅ Email de confirmación enviado a:', order.buyerEmail);
            }
        } catch (emailError) {
            console.error('❌ Error enviando email de confirmación:', emailError);
            // No fallar el webhook si no se puede enviar el email
        }
    } else {
        console.log(`⏭️ No se envía email - Estado del pago: ${orderStatus}`);
    }


    return new Response(JSON.stringify({ message: 'Notification received' }), { status: 200 });
}