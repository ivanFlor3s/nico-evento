import { prisma } from "./prisma"

export const getLandingOffers = () => {
    return prisma.landingOffer.findMany({
        include: {
            combo: true
        }
    })
}

export const getAllOffersForBuy = () => {
    return prisma.combo.findMany({
        where: {
            OR: [
                {
                    landingOffer: null // Combos sin landing offer
                },
                {
                    name: {
                        contains: "Entrada General" // Excepción para Entrada General
                    }
                }
            ]
        },
        include: {
            comboItems: {
                include: {
                    product: true
                }
            }
        }
    })
}

export const getOfferLandingById = (id: string) => {
    return prisma.landingOffer.findUnique({
        where: {
            id
        }
    })
}

export interface OrderData {
    buyerName: string;
    buyerLastName: string;
    buyerEmail: string;
    payMethod: string; // "mercadopago" | "cash"
    total: number;
    status: string; // "pending" | "paid" | "cancelled"
    paymentId?: string; // ID del pago en MercadoPago
    preferenceId?: string; // ID de la preferencia de MercadoPago        
}

export interface OrderItemData {
    productId?: string;
    comboId?: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export const createOrder = (orderData: OrderData, orderItems: OrderItemData[]) => {
    console.log('📦 Creando orden con datos:', orderItems.map(x => x.comboId));
    return prisma.order.create({
        data: {
            ...orderData,
            orderItems: {
                create: orderItems
            }
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                    combo: true
                }
            }
        }
    })
}