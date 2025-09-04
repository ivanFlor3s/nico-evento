'use client';

import { useState } from 'react';
import { Product } from '@/generated/prisma';

interface ProductListProps {
    products: Product[];
    onProductSelect: (product: Product) => void;
}

export default function ProductList({ products, onProductSelect }: ProductListProps) {
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleProductToggle = (product: Product) => {
        const newSelected = new Set(selectedProducts);

        if (newSelected.has(product.id)) {
            newSelected.delete(product.id);
        } else {
            newSelected.add(product.id);
        }
        onProductSelect(product);

        setSelectedProducts(newSelected);
    };

    return (
        <div className="flex-1">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">😋 Agregá lo que quieras</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            selectedProducts.has(product.id) ? 'border-chelsea-cucumber-500 bg-chelsea-cucumber-50 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        onClick={() => handleProductToggle(product)}
                    >
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                checked={selectedProducts.has(product.id)}
                                onChange={() => handleProductToggle(product)}
                                className="mt-1 w-4 h-4 text-chelsea-cucumber-600 bg-gray-100 border-gray-300 rounded focus:ring-chelsea-cucumber-500"
                                onClick={(e) => e.stopPropagation()}
                            />

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>

                                <div className="mb-2">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">{product.category}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-chelsea-cucumber-600">{formatPrice(product.price)}</span>

                                    {selectedProducts.has(product.id) && <span className="text-xs bg-chelsea-cucumber-600 text-white px-2 py-1 rounded-full">Seleccionado</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                    <p className="text-lg mb-2">No hay productos disponibles</p>
                    <p className="text-sm">Volvé más tarde para ver los productos</p>
                </div>
            )}
        </div>
    );
}
