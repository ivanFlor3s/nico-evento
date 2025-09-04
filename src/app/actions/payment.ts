'use server';

import { CartItem } from '@/components/shop/CartSidebar';
import { MercadoPagoService } from '@/app/services/mercado-pago';

export async function createPaymentPreference(cartItems: CartItem[]) {
    try {
        console.log('🛒 Creando preferencia de pago para items:', cartItems);

        // Validar que hay items en el carrito
        if (!cartItems || cartItems.length === 0) {
            throw new Error('El carrito está vacío');
        }

        // Preparar los items para MercadoPago
        const items = cartItems.map((item) => ({
            id: item.id,
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'ARS'
        }));

        // Calcular el total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        console.log('💰 Total de la compra:', total);
        console.log('📦 Items para MP:', items);

        // Crear la preferencia usando el servicio de MercadoPago
        const mercadoPagoService = new MercadoPagoService();
        const preferenceResult = await mercadoPagoService.createPreference({
            items,
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
                failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
                pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`
            },
            metadata: {
                cart_items: JSON.stringify(cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    type: item.type
                })))
            }
        });

        console.log('✅ Preferencia creada exitosamente:', preferenceResult.id);

        return {
            success: true,
            preferenceId: preferenceResult.id,
            initPoint: preferenceResult.init_point
        };

    } catch (error) {
        console.error('❌ Error creando preferencia de pago:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido al crear la preferencia'
        };
    }
}
