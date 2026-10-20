"use client";

import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Text from "@/app/componentes/Text/Text";
import Title from "@/app/componentes/Title/Title";
import Button from "@/app/componentes/Button/Button";

export default function MainSections() {
    const { scrollYProgress } = useScroll();
    const rotation = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]), {
        stiffness: 50,
        damping: 20,
        mass: 1.2,
    });
    const reverseRotation = useSpring(useTransform(scrollYProgress, [0, 1], [0, -360]), {
        stiffness: 35,
        damping: 22,
        mass: 1.5,
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const starRef = useRef(null);
    const isStarInView = useInView(starRef);

    return (
        <div className="relative w-full flex flex-col overflow-hidden">
            {/* ================= SEÇÃO 1: INFO SECTION ================= */}
            <div className="w-full bg-[#270600] text-white py-24 px-6 pb-20 md:pb-70 md:px-12 relative z-0">
                <div className="max-w-[90rem] mx-auto flex flex-col gap-24 md:gap-56">

                    {/* CARD 1: COQUETELARIA */}
                    <div id="coquetelaria" className="flex flex-col md:flex-row items-center gap-10 md:gap-32 relative scroll-mt-20">
                        {/* Imagem e Estrela */}
                        <div className="w-full md:w-1/2 relative">
                            <div className="relative w-[85%] aspect-6/3 overflow-hidden md:aspect-auto ml-auto md:ml-0 md:w-full">
                                <Image
                                    src="/imgs/info1.png"
                                    alt="Coquetelaria"
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover object-bottom md:object-center relative z-10 scale-110 origin-bottom-left md:scale-100"
                                />
                            </div>
                            {/* Estrela no topo esquerdo (Mobile) / Meio direita (Desktop) */}
                            <motion.div
                                style={{ rotate: rotation }}
                                className="absolute -top-10 -left-6 w-32 md:w-50 md:top-1/2 md:-translate-y-1/2 md:right-0 md:left-auto md:translate-x-1/2 z-20"
                            >
                                <Image
                                    src="/imgs/Star1.png"
                                    alt="Estrela azul"
                                    width={200}
                                    height={200}
                                    className="w-full h-auto"
                                />
                            </motion.div>
                        </div>

                        {/* Textos e Botão */}
                        <div className="w-full md:w-1/2 flex flex-col gap-6 relative">

                            {/* Título e Texto Cursivo */}
                            <div className="relative w-full md:w-fit flex flex-col md:block">
                                {/* Texto cursivo (Mobile: Acima do título) */}
                                <span className="left-6 -top-10 mt-2 text-sm md:mt-0 absolute md:left-full md:top-3 md:ml-4 md:text-lg -rotate-15 font-beth-ellen text-[#00b4d8] whitespace-nowrap">
                                    = felicidade
                                </span>
                                <Title as="h2">
                                    Coquetelaria
                                </Title>
                            </div>

                            {/* Descrição */}
                            {/* Removida a borda e o padding no mobile */}
                            <div className="flex flex-col gap-6 border-l-0 pl-0 md:border-l md:border-[#D9D9D9] md:pl-6 mt-2 md:mt-0">
                                <Text className="font-asap text-base md:text-lg text-white/90">Prove drinks clássicos e criações autorais exclusivas e contemporâneas feitos pelo nosso bar.</Text>
                                <Text className="font-asap text-base md:text-lg text-white/90">Usamos ingredientes frescos, destilados selecionados e xaropes artesanais feitos na nossa própria casa.</Text>
                                <Text className="font-asap text-base md:text-lg text-white/90">Dos sabores mais frescos e cítricos aos perfis intensos e complexos, temos a combinação perfeita para cada momento da sua noite.</Text>

                                {/* Botão (Centralizado no Mobile) */}
                                <button className="font-asap text-base md:text-lg px-6 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300 w-fit mt-4 mx-auto md:mx-0 md:self-start">
                                    Carta de drinks
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="eventos" className="flex flex-col md:flex-row items-center gap-10 md:gap-32 relative scroll-mt-20">

                        {/* Container Principal (Texto e Título) */}
                        <div className="w-full md:w-1/2 flex flex-col relative z-10">

                            {/* 1. Título (Fica no topo, no fluxo normal, sem sobreposição) */}
                            <div className="relative w-fit">
                                <Title as="h2">Eventos</Title>
                                <span className="left-30 -top-13 mt-2 text-sm md:mt-0 absolute md:left-full md:top-3 md:ml-4 md:text-lg -rotate-10 font-beth-ellen text-[#00b4d8] whitespace-nowrap md:-rotate-5">
                                    = sua nova memória favorita
                                </span>
                            </div>

                            <div className="relative w-full mt-4 md:mt-0">
                                <div className="absolute bottom-0 left-0 w-[75%] h-full z-0 md:hidden overflow-hidden">
                                    <Image
                                        src="/imgs/info2.png"
                                        alt="Eventos"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 relative z-20 py-6 md:p-0 text-right md:text-left">
                                    <Text className="font-asap text-base md:text-lg text-white/90 w-full md:w-auto">
                                        Feche o bar para comemorar o seu momento especial em grande estilo com quem você ama. o clima aqui é outro.
                                    </Text>
                                    <Text className="font-asap text-base md:text-lg text-white/90 w-[85%] ml-auto md:ml-0 md:w-auto">
                                        Nosso ambiente com luz baixa, a música no volume perfeito, você reunida com as pessoas certas sendo servida por pessoas legais fazendo drinks lindos.
                                    </Text>
                                    <Text className="font-asap text-base md:text-lg text-white/90 w-[70%] ml-auto md:ml-0 md:w-auto">
                                        Você se diverte e a gente cuida do resto :)
                                    </Text>
                                    <Button className="mt-2 self-end md:mt-0">
                                        Fazer reserva
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className=" w-full md:w-1/2 relative z-99">
                            <Image
                                src="/imgs/info2.png"
                                alt="Eventos"
                                width={800}
                                height={600}
                                className="hidden md:block w-full h-auto object-cover"
                            />
                            <motion.div
                                style={{ rotate: reverseRotation }}
                                className="absolute -top-20 left-0 md:-top-8 md:-right-8 w-34 md:w-40 lg:w-52"
                            >
                                <Image
                                    src="/imgs/Star3.png"
                                    alt="Estrela"
                                    width={200}
                                    height={200}
                                    className="w-full h-auto"
                                />
                            </motion.div>
                        </div>

                    </div>
                    {/* CARD 3: SOBRE NÓS (Mantido o código anterior) */}
                    <div id="sobre" className="flex flex-col relative w-full scroll-mt-20">
                        <div className="flex items-end md:mb-16 w-full">
                            <div className="hidden md:block flex-1 mr-4 md:mr-6 border-b border-[#D9D9D9]"></div>
                            <Title as="h2">Sobre nós</Title>
                        </div>

                        <div className="mb-30 md:mb-0 flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full">
                            <div className="w-full md:w-1/2 relative">
                                <Image src="/imgs/info3.png" alt="Sobre Nós" width={800} height={600} className="hidden md:block w-full h-auto object-cover relative z-10" />
                                <motion.div
                                    ref={starRef}
                                    style={{ y: isStarInView ? y : 0 }}
                                    className="hidden md:block md:absolute md:-bottom-10 md:-left-24 md:z-20"
                                >
                                    <Image src="/imgs/Star1.png" alt="Estrela" width={200} height={200} className="w-[200px] h-auto" />
                                </motion.div>
                            </div>

                            <div className="w-full md:w-1/2 flex flex-col gap-6 border-l border-[#D9D9D9] pl-2 py-2 md:border-l-0 md:pl-6">
                                <Text className="font-asap text-base md:text-lg text-white/90">Nascemos da vontade de criar o bar onde nós mesmos gostaríamos de passar todas as nossas noites.</Text>
                                <Text className="font-asap text-base md:text-lg text-white/90">Não queríamos apenas servir bebidas, mas construir um espaço acolhedor com luz baixa, som de qualidade e um balcão onde todo mundo se sente em casa.</Text>
                                <Text className="font-asap text-base md:text-lg text-white/90">Aqui, a alta coquetelaria perde a postura séria e ganha frescor, criatividade e muita energia boa.</Text>
                                <Text className="font-asap text-base md:text-lg text-white/90">Somos apaixonados por misturar sabores, conectar pessoas e criar momentos incríveis.</Text>
                            </div>
                            <motion.div
                                style={{ rotate: rotation }}
                                className="absolute bottom-0 -right-5 self-end md:hidden w-34 md:w-40 lg:w-52"
                            >
                                <Image src="/imgs/Star1.png" alt="Estrela" width={200} height={200} className="w-full h-auto object-contain" />
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ================= SEÇÃO DE CONTATO ================= */}
            <div
                id="contato"
                className="relative z-10 w-full md:min-h-screen flex flex-col justify-between bg-[#270600] md:pt-32 scroll-mt-20"
            >
                <div
                    className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat -z-10 md:block"
                    style={{ backgroundImage: "url('/imgs/banerFinal.png')" }}
                />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10 md:hidden"
                    style={{ backgroundImage: "url('/imgs/bannerFinalMobile.png')" }}
                />

                <div className="absolute -top-24 right-10 md:right-32 z-50 hidden md:block">
                    <Image
                        src="/imgs/Star3.png"
                        alt="Estrela verde"
                        width={200}
                        height={200}
                    />
                </div>

                <div className="py-10 md:py-0 relative z-10 w-full max-w-[90rem] mx-auto px-3 md:px-12 flex-grow flex items-center">
                    <div className="w-full md:w-5/6 flex flex-col gap-10">
                        <div className="flex md:flex-row w-full justify-start md:justify-start items-end relative md:w-fit gap-2 md:gap-0">
                            <Title as="h2">Contato</Title>
                            <span className="font-beth-ellen md:mb-1 text-[#00b4d8] md:ml-4 md:text-lg ">
                                Manda um alô!
                            </span>
                        </div>
                        <div className="flex flex-col gap-6 max-w-2xl">
                            <Text className="font-asap text-base md:text-lg text-white/90">Estamos te esperando na Rua das flores, 443, São Francisco.</Text>
                            <Text className="font-asap text-base md:text-lg text-white/90">Abrimos de quinta a domingo, a partir das 19h.</Text>
                            <Text className="font-asap text-base md:text-lg text-white/90">Se quiser garantir o seu lugar no balcão ou tirar alguma dúvida sobre festas e eventos, é só mandar uma mensagem no nosso WhatsApp  ;)</Text>
                            <button className="font-asap text-base md:text-lg px-8 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300 w-fit mt-4 self-end">
                                Garantir meu lugar
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="relative z-10 w-full py-6 md:mt-20 bg-[#201F00]">
                    <div className="max-w-[90rem] mx-auto px-6 md:px-12 text-center">
                        <Text className="font-asap text-sm text-white/50">
                            © 2026 Cocktail Blue bar. Todos os direitos reservados.
                        </Text>
                    </div>
                </footer>
            </div>
        </div>
    );
}