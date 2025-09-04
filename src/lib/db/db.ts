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