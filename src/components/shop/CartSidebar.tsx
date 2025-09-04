'use client';

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import CustomerForm, { CustomerInfo } from './CustomerForm';
import { useState } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    type: 'combo' | 'product';
}

interface CartSidebarProps {
    items: CartItem[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
    onCheckout: (customerInfo: CustomerInfo) => void;
    onCashPayment: (customerInfo: CustomerInfo) => void;
}

export default function CartSidebar({ items, onUpdateQuantity, onRemoveItem, onCheckout, onCashPayment }: CartSidebarProps) {
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            onRemoveItem(id);
        } else {
            onUpdateQuantity(id, newQuantity);
        }
    };

    const handleValidationChange = (isValid: boolean, data: CustomerInfo | null) => {
        setIsFormValid(isValid);
        setCustomerInfo(data);
    };

    const handleCheckoutClick = () => {
        if (!isFormValid || !customerInfo) {
            alert('Por favor, completá todos los datos obligatorios antes de continuar');
            return;
        }
        onCheckout(customerInfo);
    };

    const handleCashPaymentClick = () => {
        if (!isFormValid || !customerInfo) {
            alert('Por favor, completá todos los datos obligatorios antes de continuar');
            return;
        }
        onCashPayment(customerInfo);
    };

    return (
        <div className="w-full md:w-80 bg-white rounded-lg shadow-lg p-0 md:p-6 h-fit sticky top-6">
            <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="w-5 h-5 text-chelsea-cucumber-600" />
                <h3 className="text-xl font-bold text-gray-800">Tu Compra</h3>
                <span className="bg-chelsea-cucumber-100 text-chelsea-cucumber-700 text-xs font-medium px-2 py-1 rounded-full">{items.length}</span>
            </div>

            {items.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No hay items en tu carrito</p>
                    <p className="text-xs mt-1">Seleccioná combos de la lista</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                        {items.map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-gray-800 text-sm leading-tight">{item.name}</h4>
                                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Eliminar item">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>

                                        <span className="w-8 text-center font-medium">{item.quantity}</span>

                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="w-7 h-7 rounded-full bg-chelsea-cucumber-200 hover:bg-chelsea-cucumber-300 flex items-center justify-center transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">{formatPrice(item.price)} c/u</p>
                                        <p className="font-bold text-chelsea-cucumber-600">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">{formatPrice(total)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-chelsea-cucumber-600">{formatPrice(total)}</span>
                        </div>
                    </div>

                    <CustomerForm onValidationChange={handleValidationChange} />

                    <div className="space-y-3">
                        {/* Botón Pago Online */}
                        <button
                            onClick={handleCheckoutClick}
                            disabled={!isFormValid}
                            className={`w-full font-bold py-3 px-6 rounded-lg transition-colors transform hover:scale-105 active:scale-95 ${
                                isFormValid ? 'bg-chelsea-cucumber-600 hover:bg-chelsea-cucumber-700 text-white cursor-pointer' : 'bg-gray-400 cursor-not-allowed text-gray-200'
                            }`}
                        >
                            MercadoPago
                        </button>

                        {/* Divisor */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-xs text-gray-500 font-medium">O</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Botón Pago en Efectivo */}
                        <button
                            onClick={handleCashPaymentClick}
                            disabled={!isFormValid}
                            className={`w-full font-bold py-3 px-6 rounded-lg transition-colors transform hover:scale-105 active:scale-95 border-2 ${
                                isFormValid ? 'border-chelsea-cucumber-600 text-chelsea-cucumber-600 hover:bg-chelsea-cucumber-600 hover:text-white cursor-pointer' : 'border-gray-400 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Efectivo
                        </button>
                        <div className="text-xs text-gray-500 font-medium">Al seleccionar esta opción, recibirás un email con los detalles de tu reserva</div>
                    </div>
                </>
            )}
        </div>
    );
}
