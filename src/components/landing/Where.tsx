export const Where: React.FC = () => {
    return (
        <section id="where" className="min-h-screen py-20 bg-amber-100">
            <div className="max-w-6xl mx-auto px-6 text-chelsea-cucumber-800 ">
                <h2 className="text-4xl font-bold text-center mb-4    ">🗺️ Dónde Será</h2>
                <p className="text-center  mb-12 text-lg">Acompáñanos en una noche inolvidable en un lugar especial</p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-y-3 md:gap-y-0 md:flex-row md:justify-evenly">
                <div className="max-w-[350px] flex flex-col gap-y-3 text-chelsea-cucumber-800">
                    <p className="flex items-center gap-2 text-lg">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-bus-front-icon lucide-bus-front text-chelsea-cucumber-700"
                        >
                            <path d="M4 6 2 7" />
                            <path d="M10 6h4" />
                            <path d="m22 7-2-1" />
                            <rect width="16" height="16" x="4" y="3" rx="2" />
                            <path d="M4 11h16" />
                            <path d="M8 15h.01" />
                            <path d="M16 15h.01" />
                            <path d="M6 19v2" />
                            <path d="M18 21v-2" />
                        </svg>
                        118, 37, 79, 45
                    </p>

                    <p className="flex items-center gap-2 text-lg">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-tram-front-icon lucide-tram-front text-chelsea-cucumber-700"
                        >
                            <rect width="16" height="16" x="4" y="3" rx="2" />
                            <path d="M4 11h16" />
                            <path d="M12 3v8" />
                            <path d="m8 19-2 3" />
                            <path d="m18 22-2-3" />
                            <path d="M8 15h.01" />
                            <path d="M16 15h.01" />
                        </svg>
                        Roca, Belgrano Sur
                    </p>
                    <p className="flex items-center gap-2 text-lg">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-train-front-tunnel-icon lucide-train-front-tunnel text-chelsea-cucumber-700"
                        >
                            <path d="M2 22V12a10 10 0 1 1 20 0v10" />
                            <path d="M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8" />
                            <path d="M10 15h.01" />
                            <path d="M14 15h.01" />
                            <path d="M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z" />
                            <path d="m9 19-2 3" />
                            <path d="m15 19 2 3" />
                        </svg>
                        Linea C, Linea H
                    </p>
                </div>

                <div className=" hidden xl:block md:w-1/2 pr-2">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26261.465635598062!2d-58.38237764223632!3d-34.63744512725652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb3590725cc7%3A0x97232f25ce880b11!2sParroquia%20Santa%20Luc%C3%ADa%20Virgen%20y%20M%C3%A1rtir!5e0!3m2!1ses-419!2sar!4v1756751955786!5m2!1ses-419!2sar"
                        height="450"
                        width={700}
                        loading="lazy"
                    ></iframe>
                </div>
                <div className=" xl:hidden pr-2">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26261.465635598062!2d-58.38237764223632!3d-34.63744512725652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb3590725cc7%3A0x97232f25ce880b11!2sParroquia%20Santa%20Luc%C3%ADa%20Virgen%20y%20M%C3%A1rtir!5e0!3m2!1ses-419!2sar!4v1756751955786!5m2!1ses-419!2sar"
                        height="450"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};
