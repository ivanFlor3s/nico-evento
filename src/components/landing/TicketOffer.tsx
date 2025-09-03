import OfferCard from '../shared/OfferCard';

const TicketOffer = () => {
    return (
        <div className="min-h-screen mt-4 md:mt-0 flex flex-col items-center justify-center bg-neutral-100">
            <h2 className="text-6xl font-bold mb-4 text-chelsea-cucumber-500">Obtene tus entradas</h2>
            <p className="text-3xl">¡Compra tus entradas ahora y disfruta de un descuento especial!</p>
            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <OfferCard title="Entrada General" description="Acceso al evento" price={2500} variant="primary" icon="🎤" />

                <OfferCard title="Entrada Pareja" description="Acceso al evento + 2 comidas + 2 bebidas" price={4000} variant="primary" icon="👨‍👩" />

                <OfferCard title="Entrada Familiar" description="Acceso al evento + 4 comidas + 4 bebidas" price={3800} variant="primary" icon="👨‍👩‍👧‍👦" />
            </div>
        </div>
    );
};

export default TicketOffer;
