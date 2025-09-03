import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="min-h-screen bg-chelsea-cucumber-500 flex flex-col items-center justify-center h-full ">
            <div className="">
                <div className="text-center  px-4">
                    <h1 className="text-4xl md:text-8xl text-amber-200 font-bold">Festival de Santa Lucia</h1>
                    <p className="text-md md:text-2xl w-full lg:w-2/3 mx-auto  text-neutral-100 py-6 text-balance">
                        Un encuentro único para compartir en familia y con amigos: música en vivo, juegos, sabores irresistibles y la alegría de nuestra comunidad reunida en una gran fiesta.
                    </p>
                </div>
            </div>
            <div id="hero-buttons" className="mt-8">
                <a href="#combos" className="bg-amber-200 text-chelsea-cucumber-700 font-bold py-4 px-8 rounded-lg text-xl mx-2 hover:bg-amber-300 transition-colors">
                    Ver Entradas
                </a>
                <a href="#footer" className="bg-transparent border-2 border-amber-200 text-amber-200 font-bold py-4 px-8 rounded-lg text-xl mx-2 hover:bg-amber-200 hover:text-chelsea-cucumber-700 transition-colors">
                    Contacto
                </a>
            </div>
        </div>
    );
};

export default Hero;
