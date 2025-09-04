export const simplifyOrderId = (orderId: string): string => {
    // Extraer los últimos 8 caracteres del UUID
    return orderId.slice(-8).toUpperCase();
}