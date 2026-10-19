"use client";

import Text from "@/app/componentes/Text/Text";
import Title from "@/app/componentes/Title/Title";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/app/componentes/Button/Button";

export default function HeroSection() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 450]);

    return (
        <div className="relative w-full min-h-[100svh] bg-zinc-950 overflow-hidden flex flex-col justify-center">

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/imgs/HeroSection.png')", backgroundColor: "#270600" }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col mt-20 md:mt-10 md:ml-12">

                <div className="relative mb-10 md:mb-16 md:ml-6 flex flex-col w-full">
                    <Title as="h1">
                        Seu <br className="block md:hidden" /> Cocktail Bar
                    </Title>
                    <span className="font-ballet text-[4rem] sm:text-[4rem] md:text-[6.5rem] lg:text-[9rem] text-[#00b4d8] self-end -mt-6 md:mt-0 absolute -bottom-21  left-[35%] md:-bottom-33 md:left-[36%] md:right-auto md:rotate-0 whitespace-nowrap z-20 pointer-events-none">
                        preferido ;)
                    </span>
                </div>

                <div className="mt-10 md:mt-32 ml-0 md:ml-18 h-fit flex flex-col justify-center gap-6 border-l border-white py-4 pl-4 md:pl-6">
                    <div className="max-w-xl lg:max-w-2xl">
                        <Text className="font-asap text-base md:text-xl text-white/90 font-light leading-relaxed">
                            Nosso ambiente é perfeito para transformar sua noite em uma experiência única.
                            Venha viajar pelos diversos sabores e aromas clássicos e autorais dos nossos drinks além aproveitar o
                            Cocktail Bar mais Cool da cidade.
                        </Text>
                    </div>

                    <div className="mt-0 flex flex-wrap gap-3 md:mt-8 md:gap-4">
                        <Button>
                            Carta de drinks
                        </Button>
                        <Button >
                            Fazer reserva
                        </Button>
                    </div>
                </div>
            </div>

            <motion.div
                style={{ y }}
                className="absolute top-20 md:top-28 right-4 md:right-10 lg:right-20 xl:right-32 z-10"
            >
                <Image
                    src="/imgs/Star1.png"
                    alt="Estrela azul"
                    width={250}
                    height={250}
                    className="w-24 sm:w-32 md:w-40 lg:w-52 object-contain"
                />
            </motion.div>

        </div>
    );
}