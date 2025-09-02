import OfferCard from '../shared/OfferCard';

const TicketOffer = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100">
            <h2 className="text-4xl font-bold mb-4 text-chelsea-cucumber-500">Exclusive Ticket Offer</h2>
            <p className="text-lg">Get your tickets now and enjoy a special discount!</p>
            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Entrada General */}
                <OfferCard title="Entrada General" description="Acceso completo al evento" price={2500} variant="primary" icon="🎤" mutedText="Incluye show musical y acceso a todas las actividades" />

                {/* Entrada VIP */}
                <OfferCard title="Entrada VIP" description="Mejor ubicación + aperitivo" price={4000} variant="primary" icon="👑" mutedText="Mesa preferencial y aperitivo de bienvenida" />

                {/* Entrada + Cena */}
                <OfferCard title="Entrada + Cena" description="Evento completo con cena incluida" price={3800} variant="primary" icon="🍽️" mutedText="Menú completo: entrada, plato principal y postre" />
            </div>
        </div>
    );
};

export default TicketOffer;
