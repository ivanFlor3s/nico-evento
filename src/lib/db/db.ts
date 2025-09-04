import { prisma } from "./prisma"

export const getLandingOffers = () => {
    return prisma.landingOffer.findMany({
        include: {
            combo: true
        }
    })
}