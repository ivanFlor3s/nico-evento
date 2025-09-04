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

    //Send email to customer
    console.log('SEND EMAIL TO CUSTOMER');

    return new Response(JSON.stringify({ message: 'Notification received' }), { status: 200 });
}