import { getLandingOffers } from '@/lib/db/db';
import OfferCard from '../shared/OfferCard';

async function Offers() {
    'use cache';

    const data = await getLandingOffers();
    
    return (
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((offer) => (
                <OfferCard 
                    id={offer.id} 
                    key={offer.id} 
                    title={offer.name} 
                    description={offer.description} 
                    price={offer.price} 
                    variant="primary" 
                    icon={offer.icon} 
                />
            ))}
        </div>
    );
}

const TicketOffer = () => {
    return (
        <div className="min-h-screen mt-4 md:mt-0 px-10 flex flex-col items-center justify-center bg-neutral-100">
            <h2 className="text-6xl font-bold mb-4 text-chelsea-cucumber-500">Obtene tus entradas</h2>
            <p className="text-3xl">¡Compra tus entradas ahora y disfruta de un descuento especial!</p>
            <Offers />
        </div>
    );
};

export default TicketOffer;
