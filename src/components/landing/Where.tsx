export const Where: React.FC = () => {
    return (
        <section id="where" className="min-h-screen py-20 bg-gradient-to-b from-amber-50 to-amber-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* Título principal */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-chelsea-cucumber-800 mb-4">📍 ¿Cuándo y Dónde?</h2>
                    <p className="text-xl text-chelsea-cucumber-600 max-w-2xl mx-auto">Te esperamos en una noche especial llena de música, comida y buena compañía</p>
                </div>

                {/* Grid principal */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Información del evento */}
                    <div className="space-y-8">
                        {/* Fecha y hora */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-chelsea-cucumber-200">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-chelsea-cucumber-600 rounded-full flex items-center justify-center text-3xl">📅</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-chelsea-cucumber-800">Fecha del Evento</h3>
                                    <p className="text-chelsea-cucumber-600">¡Marca tu calendario!</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-chelsea-cucumber-500 rounded-full"></span>
                                    <span className="text-xl font-semibold text-gray-800">Sábado 27 de Diciembre de 2024</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-chelsea-cucumber-500 rounded-full"></span>
                                    <span className="text-lg text-gray-700">A partir de las 11:30 hs</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-chelsea-cucumber-500 rounded-full"></span>
                                    <span className="text-lg text-gray-700">Un día completo de diversión</span>
                                </div>
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-amber-200">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-3xl">🏛️</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Ubicación</h3>
                                    <p className="text-gray-600">Un lugar con historia</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xl font-bold text-gray-800">&ldquo;El Campito&rdquo;</h4>
                                <p className="text-gray-700">📍 Herrera 554, CABA</p>
                                <div className="pt-4">
                                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">🏟️ Espacio al aire libre</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mapa */}
                    <div className="lg:sticky lg:top-8">
                        <div className="bg-white rounded-3xl p-4 shadow-xl border-4 border-gray-200">
                            <div className="mb-4 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">🗺️ Cómo llegar</h3>
                                <p className="text-gray-600 text-sm">Toca el mapa para ver las direcciones</p>
                            </div>

                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.793339714617!2d-58.37529669780507!3d-34.63466239650655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb3590725cc7%3A0x97232f25ce880b11!2sParroquia%20Santa%20Luc%C3%ADa%20Virgen%20y%20M%C3%A1rtir!5e0!3m2!1ses-419!2sar!4v1757019858036!5m2!1ses-419!2sar"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full"
                                ></iframe>
                            </div>

                            {/* Información adicional del mapa */}
                            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                                <div className="bg-green-50 rounded-lg p-3">
                                    <div className="text-2xl mb-1">🚇</div>
                                    <div className="text-xs text-gray-600">Acceso por transporte público</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
