'use client';

import { useState } from 'react';

interface Combo {
    id: string;
    name: string;
    price: number;
    description?: string;
}

interface ComboListProps {
    combos: Combo[];
    onComboSelect: (combo: Combo) => void;
}

export default function ComboList({ combos, onComboSelect }: ComboListProps) {
    const [selectedCombos, setSelectedCombos] = useState<Set<string>>(new Set());

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleComboToggle = (combo: Combo) => {
        const newSelected = new Set(selectedCombos);

        if (newSelected.has(combo.id)) {
            newSelected.delete(combo.id);
        } else {
            newSelected.add(combo.id);
        }
        onComboSelect(combo);

        setSelectedCombos(newSelected);
    };

    return (
        <div className="flex-1">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Agregale combos a tu entrada</h2>
                <p className="text-gray-600">Elegí los combos que querés y ajustá las cantidades en el carrito</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {combos.map((combo) => (
                    <div
                        key={combo.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            selectedCombos.has(combo.id) ? 'border-chelsea-cucumber-500 bg-chelsea-cucumber-50 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        onClick={() => handleComboToggle(combo)}
                    >
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                checked={selectedCombos.has(combo.id)}
                                onChange={() => handleComboToggle(combo)}
                                className="mt-1 w-4 h-4 text-chelsea-cucumber-600 bg-gray-100 border-gray-300 rounded focus:ring-chelsea-cucumber-500"
                                onClick={(e) => e.stopPropagation()}
                            />

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{combo.name}</h3>

                                {combo.description && <p className="text-sm text-gray-600 mb-2">{combo.description}</p>}

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-chelsea-cucumber-600">{formatPrice(combo.price)}</span>

                                    {selectedCombos.has(combo.id) && <span className="text-xs bg-chelsea-cucumber-600 text-white px-2 py-1 rounded-full">Seleccionado</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {combos.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                    <p className="text-lg mb-2">No hay combos disponibles</p>
                    <p className="text-sm">Volvé más tarde para ver las ofertas</p>
                </div>
            )}
        </div>
    );
}
