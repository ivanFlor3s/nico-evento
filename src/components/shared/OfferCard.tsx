import { redirect } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import MercadoPagoConfig from 'mercadopago';
import { MercadoPagoService } from '@/app/services/mercado-pago';

interface OfferCardProps {
    title: string;
    description?: string;
    price: number;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    mutedText?: string;
    icon?: string;
}

interface VariantStyles {
    border: string;
    text: string;
    button: string;
}

export default function OfferCard({ title, description, price, variant = 'primary', mutedText, icon = '🎫' }: OfferCardProps) {
    // Definir colores según el variant
    const getVariantStyles = (variant: string): VariantStyles => {
        const styles = {
            primary: {
                border: 'border-amber-200',
                text: 'text-amber-200',
                button: 'bg-amber-300 text-chelsea-cucumber-700 hover:bg-amber-400',
            },
            secondary: {
                border: 'border-purple-200',
                text: 'text-purple-600',
                button: 'bg-purple-600 hover:bg-purple-700',
            },
            success: {
                border: 'border-green-200',
                text: 'text-green-600',
                button: 'bg-green-600 hover:bg-green-700',
            },
            warning: {
                border: 'border-orange-200',
                text: 'text-orange-600',
                button: 'bg-orange-600 hover:bg-orange-700',
            },
            danger: {
                border: 'border-red-200',
                text: 'text-red-600',
                button: 'bg-red-600 hover:bg-red-700',
            },
        };
        return styles[variant as keyof typeof styles] || styles.primary;
    };

    const handlePayment = async () => {
        'use server';
        const service = new MercadoPagoService();
        const url = await service.createPreference();
        if (url) redirect(url);
    };

    const variantStyles = getVariantStyles(variant);

    // Formatear precio
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className={`rounded-xl p-6 border border-chelsea-cucumber-600  shadow-lg hover:shadow-xl bg-chelsea-cucumber-500`}>
            <div className="text-center">
                {/* Icon */}
                <div className="text-4xl mb-4">{icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

                {/* Description (opcional) */}
                {description && <p className="text-white mb-4 text-sm">{description}</p>}

                {/* Precio */}
                <div className={`text-3xl font-bold ${variantStyles.text} mb-6`}>{formatPrice(price)}</div>

                {/* Botón de compra */}

                <form action={handlePayment}>
                    <button
                        type="submit"
                        className={`w-full ${variantStyles.button}  font-bold py-2 px-6 rounded-full transition-colors duration-200 transform hover:scale-101 active:scale-95 cursor-pointer flex flex-row justify-between items-center`}
                    >
                        <span>Ir a comprar</span> <ArrowRight className="h-4 w-4" />
                    </button>
                </form>

                {/* Texto aclaratorio (opcional) */}
                {mutedText && <p className="text-neutral-50 text-xs mt-3 italic">{mutedText}</p>}
            </div>
        </div>
    );
}
