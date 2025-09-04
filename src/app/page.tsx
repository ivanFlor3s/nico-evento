import Hero from '@/components/landing/Hero';
import { Where } from '@/components/landing/Where';

export default function Home() {
    return (
        <div>
            <section id="hero">
                <Hero />
            </section>

            <section id="donde">
                <Where />
            </section>
        </div>
    );
}
