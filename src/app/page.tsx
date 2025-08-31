import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Hero Section */}
            <section className="relative px-6 pt-16 pb-24 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Peña de la Iglesia 2025</h1>
                    <p className="text-xl mb-8 text-gray-200">Una noche llena de música, comida deliciosa y comunidad</p>
                    <p className="text-lg mb-12 text-gray-300">📅 Fecha: Por confirmar | 📍 Lugar: Salón de la Iglesia</p>
                    <div className="flex justify-center">
                        <a
                            href="#entradas"
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            🎫 ¡Comprar Entradas Ahora!
                        </a>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 text-6xl opacity-20">🎵</div>
                <div className="absolute top-32 right-20 text-4xl opacity-20">🍽️</div>
                <div className="absolute bottom-20 left-20 text-5xl opacity-20">❤️</div>
                <div className="absolute bottom-32 right-10 text-4xl opacity-20">🙏</div>
            </section>

            {/* Entradas Section */}
            <section id="entradas" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">🎫 Entradas Disponibles</h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">Elige la opción que más te guste y únete a esta noche especial</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Entrada General */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🎤</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Entrada General</h3>
                                <p className="text-gray-600 mb-4">Acceso completo al evento</p>
                                <div className="text-3xl font-bold text-blue-600 mb-6">$2,500</div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Comprar Entrada</button>
                            </div>
                        </div>

                        {/* Entrada VIP */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">👑</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Entrada VIP</h3>
                                <p className="text-gray-600 mb-4">Mejor ubicación + aperitivo</p>
                                <div className="text-3xl font-bold text-purple-600 mb-6">$4,000</div>
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Comprar Entrada VIP</button>
                            </div>
                        </div>

                        {/* Entrada + Cena */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🍽️</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Entrada + Cena</h3>
                                <p className="text-gray-600 mb-4">Evento completo con cena incluida</p>
                                <div className="text-3xl font-bold text-green-600 mb-6">$3,800</div>
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Comprar con Cena</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Combos Section */}
            <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">🎁 Combos Especiales</h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">Paquetes especiales con descuentos para grupos y familias</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Combo 1 */}
                        <div className="bg-white rounded-xl p-8 shadow-xl border border-orange-200">
                            <div className="text-center mb-6">
                                <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">Combo Familiar</h3>
                                <p className="text-gray-600 text-lg">Perfecto para toda la familia</p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">4 Entradas Generales</span>
                                    <span className="text-gray-500">$10,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">2 Cenas incluidas</span>
                                    <span className="text-gray-500">$3,000</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-800">Total Normal:</span>
                                        <span className="text-gray-500 line-through">$13,000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-orange-600 text-xl">Precio Combo:</span>
                                        <span className="font-bold text-orange-600 text-xl">$10,500</span>
                                    </div>
                                    <div className="text-green-600 text-sm font-medium">¡Ahorrás $2,500!</div>
                                </div>
                            </div>

                            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors">Comprar Combo Familiar</button>
                        </div>

                        {/* Combo 2 */}
                        <div className="bg-white rounded-xl p-8 shadow-xl border border-red-200">
                            <div className="text-center mb-6">
                                <div className="text-5xl mb-4">💑</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">Combo Pareja VIP</h3>
                                <p className="text-gray-600 text-lg">Una noche especial para dos</p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">2 Entradas VIP</span>
                                    <span className="text-gray-500">$8,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">2 Cenas Premium</span>
                                    <span className="text-gray-500">$4,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Bebidas incluidas</span>
                                    <span className="text-gray-500">$1,500</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-800">Total Normal:</span>
                                        <span className="text-gray-500 line-through">$13,500</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-red-600 text-xl">Precio Combo:</span>
                                        <span className="font-bold text-red-600 text-xl">$11,000</span>
                                    </div>
                                    <div className="text-green-600 text-sm font-medium">¡Ahorrás $2,500!</div>
                                </div>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors">Comprar Combo Pareja</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">¿Tienes preguntas?</h3>
                    <p className="text-gray-300 mb-6">Contáctanos para más información sobre el evento</p>
                    <div className="flex justify-center space-x-8">
                        <div>📞 +54 11 1234-5678</div>
                        <div>📧 eventos@iglesia.com</div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400">
                        <p>&copy; 2025 Peña de la Iglesia. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
