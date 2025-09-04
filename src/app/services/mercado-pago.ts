import { MercadoPagoConfig, Preference } from 'mercadopago';

interface PreferenceData {
    items: {
        id?: string;
        title: string;
        quantity: number;
        unit_price: number;
        currency_id?: string;
    }[];
    back_urls?: {
        success: string;
        failure: string;
        pending: string;
    };
    auto_return?: string;
    notification_url?: string;
    metadata?: Record<string, string>;
}

export class MercadoPagoService {
    private client: MercadoPagoConfig;

    constructor() {
        this.client = new MercadoPagoConfig({
            accessToken: process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN || '',
        });
    }

    async createPreference(data: PreferenceData) {
        const preference = new Preference(this.client);

        const response = await preference.create({
            body: {
                items: data.items.map((item, index) => ({
                    id: item.id || `item-${index + 1}`,
                    title: item.title,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    currency_id: item.currency_id || 'ARS'
                })),
                back_urls: data.back_urls,
                auto_return: data.auto_return,
                notification_url: data.notification_url,
                metadata: data.metadata
            }
        });

        return {
            id: response.id,
            init_point: response.init_point,
            response: response
        };
    }
}