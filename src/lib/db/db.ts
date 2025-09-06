import { prisma } from "./prisma"

export const getLandingOffers = async () => {
    'use cache';
    return prisma.landingOffer.findMany({
        include: {
            combo: true
        }
    })
}

export const getAllCombosForBuy = async () => {
    'use cache';
    return prisma.combo.findMany({
        include: {
            comboItems: {
                include: {
                    product: true
                }
            }
        },
        where: {
            available: true
        },
    })
}

export const getProducts = async () => {
    'use cache';
    return prisma.product.findMany(
        {
            where: {
                available: true
            }
        }
    )
}

export const updateOrderStatus = (orderId: string, paymentId: number, status: 'pending' | 'approved' | 'rejected') => {
    return prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status,
            paymentId: BigInt(paymentId)
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
    paymentId?: number; // ID del pago en MercadoPago
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


export const orderSetPreferenceId = async (orderId: string, preferenceId: string) => {
    return prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            preferenceId
        }
    })
}

// Funciones específicas para el panel de administración
export const getAllOrders = async () => {
    return prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true,
                    combo: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getOrdersByStatus = async (status: string) => {
    return prisma.order.findMany({
        where: {
            status: status
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                    combo: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getOrdersByPayMethod = async (payMethod: string) => {
    return prisma.order.findMany({
        where: {
            payMethod: payMethod
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                    combo: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getOrdersByDateRange = async (startDate: Date, endDate: Date) => {
    'use cache';
    return prisma.order.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                    combo: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}