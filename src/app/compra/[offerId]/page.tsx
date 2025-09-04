import { getAllOffersForBuy, getOfferLandingById } from '@/lib/db/db';
import CompraClient from '@/components/shop/CompraClient';
import { notFound } from 'next/navigation';

const CurrentOffer = async ({ offerName, offerIcon }: { offerName: string; offerIcon: string }) => {
    return (
        <>
            {offerName ? (
                <div className="bg-chelsea-cucumber-500 text-white py-6 px-4 text-center">
                    <h1 className="text-4xl font-bold">
                        Seleccionaste {offerIcon} {offerName}
                    </h1>
                </div>
            ) : (
                <div className="bg-red-500 text-white py-6 px-4 text-center">
                    <h1 className="text-4xl font-bold">Oferta no encontrada</h1>
                </div>
            )}
        </>
    );
};

export default async function Compra({ params }: { params: Promise<{ offerId: string }> }) {
    'use cache';
    const { offerId } = await params;
    const offer = await getOfferLandingById(offerId);

    const combos = await getAllOffersForBuy();

    // Formatear los combos para que coincidan con la interfaz esperada
    const formattedCombos = combos.map((combo) => ({
        id: combo.id,
        name: combo.name,
        price: combo.price,
        description: `Combo especial con descuentos`, // Puedes mejorar esto con datos reales
    }));

    if (!offer) {
        notFound();
    }

    return (
        <>
            <CurrentOffer offerName={offer.name} offerIcon={offer.icon} />
            <CompraClient initialOfferId={offer.id} initialOfferName={offer.name} initialOfferPrice={offer.price} combos={formattedCombos} />
        </>
    );
}
