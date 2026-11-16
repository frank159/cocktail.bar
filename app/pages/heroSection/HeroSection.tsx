"use client";

import Text from "@/app/componentes/Text/Text";
import Title from "@/app/componentes/Title/Title";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import Button from "@/app/componentes/Button/Button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const T = {
    title: 0.25,
    titleStep: 0.13,
    star: 0.6,
    script: 0.95,
    line: 1.1,
    paragraph: 1.25,
    buttons: 1.5,
    buttonsStep: 0.12,
};

function Word({ children, index }: { children: ReactNode; index: number }) {
    const reduce = useReducedMotion();
    return (
        <span className="inline-block overflow-hidden align-bottom pt-[0.12em] -mt-[0.12em] pb-[0.15em] -mb-[0.15em]">
            <motion.span
                className="inline-block"
                initial={reduce ? { opacity: 0 } : { y: "115%", rotate: 4, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{
                    duration: 0.9,
                    ease: EASE,
                    delay: T.title + index * T.titleStep,
                }}
                style={{ transformOrigin: "0% 100%" }}
            >
                {children}
            </motion.span>
        </span>
    );
}

function HeroButton({ children, index }: { children: ReactNode; index: number }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.7,
                ease: EASE,
                delay: T.buttons + index * T.buttonsStep,
            }}
        >
            {children}
        </motion.div>
    );
}

export default function HeroSection() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 450]);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
    }, []);


    return (
        <div id="home" className="relative w-full min-h-[100svh] bg-zinc-950 overflow-hidden flex flex-col justify-center">

            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/imgs/HeroSection.png')", backgroundColor: "#270600" }}
                initial={reduce ? false : { scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: EASE }}
            >
                <motion.div
                    className="absolute inset-0 bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col mt-20 md:mt-10 md:ml-12">

                <div className="relative mb-10 md:mb-16 md:ml-6 flex flex-col w-full">
                    <Title as="h1">
                        <Word index={0}>Seu</Word>{" "}
                        <br className="block md:hidden" />
                        <Word index={1}>Cocktail</Word>{" "}
                        <Word index={2}>Bar</Word>
                    </Title>

                    <motion.span
                        className="font-ballet text-[4rem] sm:text-[4rem] md:text-[6.5rem] lg:text-[9rem] text-[#00b4d8] self-end -mt-6 md:mt-0 absolute -bottom-21  left-[35%] md:-bottom-33 md:left-[36%] md:right-auto md:rotate-0 whitespace-nowrap z-20 pointer-events-none"
                        initial={
                            reduce
                                ? { opacity: 0 }
                                : { clipPath: "inset(-60% 100% -60% -25%)", opacity: 0, x: -16, filter: "blur(6px)" }
                        }
                        animate={
                            reduce
                                ? { opacity: 1 }
                                : { clipPath: "inset(-60% -15% -60% -25%)", opacity: 1, x: 0, filter: "blur(0px)" }
                        }
                        transition={{ duration: 1.1, ease: "easeOut", delay: T.script }}
                    >
                        preferido ;)
                    </motion.span>
                </div>

                <div className="relative mt-10 md:mt-32 ml-0 md:ml-18 h-fit flex flex-col justify-center gap-6 py-4 pl-4 md:pl-6">
                    <motion.div
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-full w-px bg-white"
                        style={{ transformOrigin: "top" }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1, ease: EASE, delay: T.line }}
                    />

                    <motion.div
                        className="max-w-xl lg:max-w-2xl"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, x: -28, filter: "blur(8px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: EASE, delay: T.paragraph }}
                    >
                        <Text className="font-asap text-base md:text-xl text-white/90 font-light leading-relaxed">
                            Nosso ambiente é perfeito para transformar sua noite em uma experiência única.
                            Venha viajar pelos diversos sabores e aromas clássicos e autorais dos nossos drinks além aproveitar o
                            Cocktail Bar mais Cool da cidade.
                        </Text>
                    </motion.div>

                    <div className="mt-0 flex flex-wrap gap-3 md:mt-8 md:gap-4">
                        <HeroButton index={0}>
                            <Button>
                                Carta de drinks
                            </Button>
                        </HeroButton>
                        <HeroButton index={1}>
                            <Button >
                                Fazer reserva
                            </Button>
                        </HeroButton>
                    </div>
                </div>
            </div>

            <motion.div
                style={{ y }}
                className="absolute top-20 md:top-28 right-4 md:right-10 lg:right-20 xl:right-32 z-10"
            >
                <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.2, rotate: -140 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        delay: T.star,
                        opacity: { duration: 0.5, delay: T.star },
                        type: "spring",
                        stiffness: 90,
                        damping: 11,
                        mass: 0.9,
                    }}
                >
                    <motion.div
                        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 4, 0] }}
                        transition={{
                            duration: 5.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: T.star + 1.4,
                        }}
                    >
                        <Image
                            src="/imgs/Star1.png"
                            alt="Estrela azul"
                            width={250}
                            height={250}
                            priority
                            className="w-24 h-auto sm:w-32 md:w-40 lg:w-52 object-contain"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

        </div>
    );
}