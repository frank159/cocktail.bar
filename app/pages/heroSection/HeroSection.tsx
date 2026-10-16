"use client"; // 1. Obrigatório para usar hooks de interatividade

import Text from "@/app/componentes/Text/Text";
import Title from "@/app/componentes/Title/Title";
import Image from "next/image";
// 2. Importando as ferramentas de animação
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    // 3. Captura a posição do scroll vertical da página
    const { scrollY } = useScroll();

    // 4. Cria a mágica do parallax
    // Quando o usuário rolar de 0 a 1000px, a estrela vai se mover de 0 a 150px
    // Isso faz com que ela desça mais devagar que o resto da página, criando profundidade
    const y = useTransform(scrollY, [0, 1000], [0, 450]);

    return (
        <div className="relative w-full min-h-screen bg-zinc-950 overflow-hidden flex items-center">

            {/* 1. Background Image com Overlay Escuro */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/imgs/HeroSection.png')", backgroundColor: "#270600" }}
            >
                <div className="absolute inset-0 to-transparent"></div>
            </div>

            {/* 2. Conteúdo Principal */}
            <div className="relative z-10 w-full max-w-7xl ml-12 mt-25 px-6 md:px-12 py-20 flex flex-col">

                {/* Título */}
                <div className="relative mb-12 md:mb-16 ml-0 md:ml-6">
                    <Title>
                        Seu Cocktail Bar
                    </Title>

                    {/* Texto Cursivo */}
                    <span className="font-ballet text-5xl md:text-[7rem] lg:text-[9rem] text-[#00b4d8] absolute -bottom-16 md:-bottom-24 left-[37%] whitespace-nowrap">
                        preferido ;)
                    </span>
                </div>

                {/* Bloco de Texto */}
                <div className="mt-32 ml-6 md:ml-18 h-fit flex flex-col justify-center gap-6 border-l border-white py-4 pl-4 md:pl-6">
                    <div className="max-w-xl lg:max-w-2xl">
                        <Text className="font-asap text-lg md:text-xl text-white font-light leading-relaxed">
                            Nosso ambiente é perfeito para transformar sua noite em uma experiência única.
                            Venha viajar pelos diversos sabores e aromas clássicos e autorais dos nossos drinks além aproveitar o
                            Cocktail Bar mais Cool da cidade.
                        </Text>
                    </div>

                    {/* Botões */}
                    <div className="flex flex-wrap gap-4">
                        <button className="font-asap text-lg px-6 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-zinc-950 transition-colors duration-300">
                            Carta de drinks
                        </button>
                        <button className="font-asap text-lg px-6 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-zinc-950 transition-colors duration-300">
                            Fazer reserva
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Estrela com Parallax */}
            {/* Transformado de div para motion.div e aplicado o style={{ y }} */}
            <motion.div 
                style={{ y }} 
                className="absolute top-30 right-20 md:right-58 z-10 hidden md:block"
            >
                <Image src="/imgs/star1.png" alt="start01" width={250} height={250} />
            </motion.div>

        </div>
    );
}