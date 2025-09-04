'use client';

import { useState } from 'react';
import CartSidebar, { CartItem } from './CartSidebar';
import ComboList from './ComboList';
import ProductList from './ProductList';
import { CustomerInfo } from './CustomerForm';
import { Product, Combo } from '@/generated/prisma';

interface CompraClientProps {
    combos: Combo[];
    productsWithoutEntrada: Product[];
    entradaGeneral: Product | undefined;
}

const CompraClient: React.FC<CompraClientProps> = ({ combos, productsWithoutEntrada, entradaGeneral }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

    const handleProductSelect = (product: Product) => {
        const alreadySelected = cartItems.find((item) => item.id === product.id);

        if (alreadySelected) {
            removeFromCart(product.id);
        } else {
            setCartItems((prevItems) => {
                const existingItem = prevItems.find((item) => item.id === product.id);

                if (existingItem) {
                    return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
                } else {
                    return [
                        ...prevItems,
                        {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            type: 'product' as const,
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

    const handleCashPayment = async (customerInfo: CustomerInfo) => {
        if (cartItems.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        try {
            console.log('💵 Iniciando proceso de pago en efectivo...');

            // Importar dinámicamente la Server Action para efectivo
            const { createCashPayment } = await import('@/app/actions/payment');

            // Crear orden para pago en efectivo
            const result = await createCashPayment(cartItems, customerInfo);

            if (result.success) {
                console.log('✅ Reserva de efectivo creada exitosamente:', result.orderId);

                // Redirigir a la página de confirmación de efectivo con parámetros
                const searchParams = new URLSearchParams({
                    orderId: result.orderId as string,
                    email: customerInfo.email,
                });
                window.location.href = `/payment/cash-success?${searchParams.toString()}`;
            } else {
                console.error('❌ Error en el pago en efectivo:', result.error);
                alert(`Error al procesar tu reserva: ${result.error}`);
            }
        } catch (error) {
            console.error('❌ Error en pago en efectivo:', error);
            alert('Hubo un error al procesar tu reserva. Por favor, intentá de nuevo.');
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Sección de productos y combos */}
                    <div className="flex-1 space-y-8">
                        <ProductList products={[entradaGeneral as Product]} onProductSelect={handleProductSelect} />

                        <ComboList combos={combos} onComboSelect={handleComboSelect} />

                        {productsWithoutEntrada.length > 0 && <ProductList products={productsWithoutEntrada} onProductSelect={handleProductSelect} />}
                    </div>

                    {/* Carrito */}
                    <CartSidebar items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} onCashPayment={handleCashPayment} />
                </div>
            </div>
        </div>
    );
};

export default CompraClient;
