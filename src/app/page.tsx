import { Footer } from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import TicketOffer from '@/components/landing/TicketOffer';
import { Where } from '@/components/landing/Where';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section id="hero">
                <Hero />
            </section>

            <section id="donde">
                <Where />
            </section>

            {/* Entradas Section */}
            <section id="entradas">
                <TicketOffer />
            </section>
        </div>
    );
}
