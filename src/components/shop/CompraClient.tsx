'use client';

import { useState } from 'react';
import CartSidebar, { CartItem } from './CartSidebar';
import ComboList from './ComboList';
import { CustomerInfo } from './CustomerForm';

interface Combo {
    id: string;
    name: string;
    price: number;
    description?: string;
}

interface CompraClientProps {
    combos: Combo[];
    initialOfferName: string;
    initialOfferPrice: number;
    initialOfferId: string;
}

const CompraClient: React.FC<CompraClientProps> = ({ combos, initialOfferName, initialOfferPrice, initialOfferId }: CompraClientProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([{ id: initialOfferId, name: initialOfferName, price: initialOfferPrice, quantity: 1, type: 'combo' as const }]);

    const handleComboSelect = (combo: Combo) => {
        const alreadySelected = cartItems.find((item) => item.id === combo.id);

        if (alreadySelected) {
            removeFromCart(combo.id);
        } else {
            setCartItems((prevItems) => {
                const existingItem = prevItems.find((item) => item.id === combo.id);

                if (existingItem) {
                    return prevItems.map((item) => (item.id === combo.id ? { ...item, quantity: item.quantity + 1 } : item));
                } else {
                    return [
                        ...prevItems,
                        {
                            id: combo.id,
                            name: combo.name,
                            price: combo.price,
                            quantity: 1,
                            type: 'combo' as const,
                        },
                    ];
                }
            });
        }
    };

    const removeFromCart = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
    };

    const handleRemoveItem = (id: string) => {
        removeFromCart(id);
    };

    const handleCheckout = async (customerInfo: CustomerInfo) => {
        if (cartItems.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        try {
            // Importar dinámicamente la Server Action
            const { startPayment } = await import('@/app/actions/payment');

            // Iniciar el proceso completo de pago (preferencia + orden en BD)
            const result = await startPayment(cartItems, customerInfo);
            console.log('🚀 Resultado del proceso de pago:', JSON.stringify(result));
            if (result.success && result.initPoint) {
                console.log('✅ Preferencia creada, redirigiendo a MercadoPago...');

                // Redirigir a MercadoPago
                window.location.href = result.initPoint;
            } else {
                console.error('❌ Error en el proceso de pago:', result.error);
                alert(`Error al procesar el pago: ${result.error}`);
            }
        } catch (error) {
            console.error('❌ Error en checkout:', error);
            alert('Hubo un error al procesar tu compra. Por favor, intentá de nuevo.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <ComboList combos={combos} onComboSelect={handleComboSelect} />

                    <CartSidebar items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />
                </div>
            </div>
        </div>
    );
};

export default CompraClient;
