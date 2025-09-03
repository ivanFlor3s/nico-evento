import { MercadoPagoConfig, Preference } from 'mercadopago';

export class MercadoPagoService {
    private client: MercadoPagoConfig;

    constructor() {
        this.client = new MercadoPagoConfig({
            accessToken: process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN || '',
        });
    }

    async createPreference() {
        const preference = new Preference(this.client);

        const response = await preference.create({
            body: {
                items: [
                    {
                        id: "1",
                        title: 'Mi producto',
                        quantity: 1,
                        unit_price: 2000
                    }
                ],
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
                    failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`
                },

            }
        })

        return response.init_point;
    }

}