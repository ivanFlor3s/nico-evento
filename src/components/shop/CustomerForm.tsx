'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mail } from 'lucide-react';

export interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
}

interface CustomerFormProps {
    onValidationChange?: (isValid: boolean, data: CustomerInfo | null) => void;
}

export default function CustomerForm({ onValidationChange }: CustomerFormProps) {
    const [formData, setFormData] = useState<CustomerInfo>({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

    const validateForm = useCallback((): boolean => {
        const newErrors: Partial<CustomerInfo> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Es obligatorio';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Es obligatorio';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Ingresá un email válido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Notificar al componente padre cuando cambie la validación
    useEffect(() => {
        const isValid = validateForm();
        if (onValidationChange) {
            onValidationChange(isValid, isValid ? formData : null);
        }
    }, [formData, onValidationChange, validateForm]);

    const handleInputChange = (field: keyof CustomerInfo, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    return (
        <div className="bg-white rounded-lg  mb-6">
            <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre *
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chelsea-cucumber-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    {/* Apellido */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido *
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chelsea-cucumber-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email *
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chelsea-cucumber-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    <p className="text-gray-500 text-xs mt-1">Te enviaremos la confirmación de tu compra a este email</p>
                </div>
            </form>
        </div>
    );
}
