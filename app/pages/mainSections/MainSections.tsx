"use client";

import {
    animate,
    motion,
    useAnimation,
    useInView,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Text from "@/app/componentes/Text/Text";
import Title from "@/app/componentes/Title/Title";
import Button from "@/app/componentes/Button/Button";

const EMBER_COLORS = ["#0790ab", "#535301", "#270600"];
const BURN_SLOPE = 30;

/* =====================================================================
 *  ANIMAÇÕES DE ENTRADA DOS TEXTOS
 * ===================================================================== */

type Direction = "left" | "right" | "top" | "bottom" | "none";

const DISTANCE = 48;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const offsetFor = (from: Direction, distance: number) => {
    switch (from) {
        case "left":
            return { x: -distance, y: 0 };
        case "right":
            return { x: distance, y: 0 };
        case "top":
            return { x: 0, y: -distance };
        case "bottom":
            return { x: 0, y: distance };
        default:
            return { x: 0, y: 0 };
    }
};

const groupVariants: Variants = {
    hidden: {},
    show: (stagger: number) => ({
        transition: { staggerChildren: stagger, delayChildren: 0.1 },
    }),
};

const itemVariants: Variants = {
    hidden: ({ from, distance }: { from: Direction; distance: number }) => ({
        opacity: 0,
        ...offsetFor(from, distance),
    }),
    show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.95, ease: EASE },
    },
};

const popVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6, y: 10 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 260, damping: 14, mass: 0.8 },
    },
};

const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.15, ease: EASE } },
};

function RevealGroup({
    children,
    className = "",
    stagger = 0.24,
    amount = 0.2,
}: {
    children: ReactNode;
    className?: string;
    stagger?: number;
    amount?: number;
}) {
    return (
        <motion.div
            className={className}
            variants={groupVariants}
            custom={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount }}
        >
            {children}
        </motion.div>
    );
}

function RevealItem({
    children,
    from = "bottom",
    className = "",
    distance = DISTANCE,
}: {
    children: ReactNode;
    from?: Direction;
    className?: string;
    distance?: number;
}) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            variants={itemVariants}
            custom={{ from: reduce ? "none" : from, distance }}
        >
            {children}
        </motion.div>
    );
}

function RevealPop({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.span className={className} variants={popVariants}>
            {children}
        </motion.span>
    );
}

function RevealLine({
    className = "",
    origin = "right",
}: {
    className?: string;
    origin?: "left" | "right";
}) {
    return (
        <motion.div
            className={className}
            variants={lineVariants}
            style={{ transformOrigin: origin }}
        />
    );
}

function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return isDesktop;
}

/* ===================================================================== */

type Ember = {
    id: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    delay: number;
    duration: number;
    color: string;
};

const makeEmbers = (): Ember[] =>
    Array.from({ length: 24 }, (_, id) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 55;
        return {
            id,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            dx: (Math.random() - 0.5) * 70,
            dy: -(50 + Math.random() * 110),
            size: [3, 4, 6][Math.floor(Math.random() * 3)],
            delay: 0.05 + Math.random() * 0.35,
            duration: 0.5 + Math.random() * 0.6,
            color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        };
    });

/**
 * Estrela interativa com queima e renascimento lateral.
 */
function BurnStar({ className = "", from = "left" }: { className?: string; from?: "left" | "right" }) {
    const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const burnId = `star-burn-${uid}`;
    const whiteId = `star-white-${uid}`;
    const maskId = `star-shine-mask-${uid}`;
    const gradId = `star-shine-grad-${uid}`;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inView = useInView(wrapperRef, { amount: 0.3 });
    const prefersReducedMotion = useReducedMotion();

    const controls = useAnimation();
    const burningRef = useRef(false);
    const [isBurning, setIsBurning] = useState(false);
    const [embers, setEmbers] = useState<Ember[]>([]);
    const showIdle = inView && !isBurning && !prefersReducedMotion;

    const burn = useMotionValue(0);
    const mask0 = useRef<SVGFEFuncAElement>(null);
    const mask1 = useRef<SVGFEFuncAElement>(null);
    const mask2 = useRef<SVGFEFuncAElement>(null);

    useMotionValueEvent(burn, "change", (v) => {
        const t = 0.1 + v * 0.85;
        mask0.current?.setAttribute("intercept", String(-BURN_SLOPE * t));
        mask1.current?.setAttribute("intercept", String(-BURN_SLOPE * (t - 0.045)));
        mask2.current?.setAttribute("intercept", String(-BURN_SLOPE * (t - 0.1)));
    });

    const triggerBurn = async () => {
        if (burningRef.current) return;
        burningRef.current = true;
        setIsBurning(true);
        navigator.vibrate?.(15);

        // 1. antecipação (squash + tremida)
        await controls.start({
            scale: [1, 1.22, 1.14],
            x: [0, -3, 3, -2, 2, 0],
            rotate: [0, -5, 4, -3, 2, 0],
            transition: { duration: 0.28, ease: "easeOut" },
        });

        // 2. queima + brasas
        setEmbers(makeEmbers());
        controls.start({
            scale: [1.14, 1.2, 1.08],
            rotate: [0, 3, -2],
            transition: { duration: 0.9, ease: "easeInOut" },
        });
        await animate(burn, 1, { duration: 0.9, ease: "easeInOut" });
        setEmbers([]);

        // 3. reset invisível com deslocamento lateral + renascimento elástico
        const startX = from === "left" ? -60 : 60;
        controls.set({ opacity: 0, scale: 0.5, rotate: 0, x: startX });
        burn.set(0);
        await controls.start({
            opacity: 1,
            x: 0,
            scale: [0.5, 1.18, 1],
            transition: { duration: 0.8, ease: EASE },
        });

        burningRef.current = false;
        setIsBurning(false);
    };

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x: from === "left" ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
        >
            <div ref={wrapperRef} className="relative w-full">
                <motion.div
                    animate={
                        showIdle
                            ? {
                                scale: [1, 1.04, 1],
                                filter: [
                                    "drop-shadow(0 0 0px rgba(0,180,216,0))",
                                    "drop-shadow(0 0 8px rgba(0,180,216,0.35))",
                                    "drop-shadow(0 0 0px rgba(0,180,216,0))",
                                ],
                            }
                            : {
                                scale: 1,
                                filter: "drop-shadow(0 0 0px rgba(0,180,216,0))",
                            }
                    }
                    transition={
                        showIdle
                            ? { duration: 2.7, repeat: Infinity, ease: "easeInOut" }
                            : { duration: 0.2 }
                    }
                    className="w-full cursor-pointer touch-manipulation"
                    onClick={triggerBurn}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            triggerBurn();
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Ativar efeito da estrela"
                >
                    <motion.div animate={controls} initial={{ scale: 1, opacity: 1, x: 0 }}>
                        <svg viewBox="0 0 200 200" className="w-full h-auto overflow-visible" aria-hidden="true">
                            <defs>
                                <filter
                                    id={burnId}
                                    filterUnits="userSpaceOnUse"
                                    x="-30" y="-30" width="260" height="260"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="7" result="noise" />
                                    <feColorMatrix
                                        in="noise" type="matrix" result="n"
                                        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
                                    />
                                    <feComponentTransfer in="n" result="m0">
                                        <feFuncA ref={mask0} type="linear" slope="30" intercept="-3" />
                                    </feComponentTransfer>
                                    <feComponentTransfer in="n" result="m1">
                                        <feFuncA ref={mask1} type="linear" slope="30" intercept="-1.65" />
                                    </feComponentTransfer>
                                    <feComponentTransfer in="n" result="m2">
                                        <feFuncA ref={mask2} type="linear" slope="30" intercept="0" />
                                    </feComponentTransfer>

                                    <feComposite in="SourceGraphic" in2="m0" operator="in" result="body" />
                                    <feComposite in="m1" in2="m0" operator="out" result="ring1" />
                                    <feFlood floodColor="#0790ab" result="c1" />
                                    <feComposite in="c1" in2="ring1" operator="in" result="hot0" />
                                    <feComposite in="hot0" in2="SourceAlpha" operator="in" result="hot" />

                                    <feComposite in="m2" in2="m1" operator="out" result="ring2" />
                                    <feFlood floodColor="#535301" result="c2" />
                                    <feComposite in="c2" in2="ring2" operator="in" result="glow0" />
                                    <feComposite in="glow0" in2="SourceAlpha" operator="in" result="glow" />
                                    <feGaussianBlur in="glow" stdDeviation="2.5" result="bloom" />

                                    <feMerge>
                                        <feMergeNode in="bloom" />
                                        <feMergeNode in="glow" />
                                        <feMergeNode in="hot" />
                                        <feMergeNode in="body" />
                                    </feMerge>
                                </filter>

                                <filter id={whiteId} colorInterpolationFilters="sRGB">
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"
                                    />
                                </filter>
                                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
                                    <image href="/imgs/Star1.png" width="200" height="200" filter={`url(#${whiteId})`} />
                                </mask>
                                <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            <g filter={`url(#${burnId})`}>
                                <image href="/imgs/Star1.png" width="200" height="200" />
                            </g>

                            {showIdle && (
                                <g mask={`url(#${maskId})`}>
                                    <motion.g
                                        initial={{ x: -100 }}
                                        animate={{ x: [-100, 240] }}
                                        transition={{
                                            duration: 0.9,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatDelay: 4.5,
                                            delay: 0.9,
                                        }}
                                    >
                                        <polygon points="20,-10 80,-10 50,210 -10,210" fill={`url(#${gradId})`} />
                                    </motion.g>
                                </g>
                            )}
                        </svg>
                    </motion.div>
                </motion.div>

                <div className="pointer-events-none absolute inset-0 z-10">
                    {embers.map((e) => (
                        <motion.span
                            key={e.id}
                            className="absolute left-1/2 top-1/2"
                            style={{
                                width: e.size,
                                height: e.size,
                                marginLeft: -e.size / 2,
                                marginTop: -e.size / 2,
                                background: e.color,
                                boxShadow: `0 0 8px 2px ${e.color}`,
                            }}
                            initial={{ x: e.x, y: e.y, scale: 1, opacity: 1 }}
                            animate={{
                                x: e.x + e.dx,
                                y: e.y + e.dy,
                                scale: [1, 1, 0],
                                opacity: [1, 1, 0],
                            }}
                            transition={{ delay: e.delay, duration: e.duration, ease: "easeOut" }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function MainSections() {
    const isDesktop = useIsDesktop();
    const side = (desktop: Direction, mobile: Direction = "bottom"): Direction =>
        isDesktop ? desktop : mobile;

    const { scrollYProgress } = useScroll();

    const rotation = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), {
        stiffness: 50,
        damping: 20,
        mass: 1.2,
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const eventStarRef = useRef(null);
    const { scrollYProgress: eventStarProgress } = useScroll({
        target: eventStarRef,
        offset: ["start end", "center start"],
    });
    const eventStarX = useSpring(
        useTransform(eventStarProgress, [0, 1], [0, 150]),
        {
            stiffness: 100,
            damping: 20,
            mass: 1,
        }
    );
    const starRef = useRef(null);
    const isStarInView = useInView(starRef);

    const contactStarRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: contactStarProgress } = useScroll({
        target: contactStarRef,
        offset: ["start end", "center center"],
    });
    const contactStarX = useSpring(
        useTransform(contactStarProgress, [0, 1], [0, -80]),
        {
            stiffness: 100,
            damping: 20,
            mass: 1,
        }
    );

    return (
        <div className="relative w-full flex flex-col overflow-hidden">
            {/* ================= SEÇÃO 1: INFO SECTION ================= */}
            <div className="w-full bg-[#270600] text-white py-24 px-6 pb-20 md:pb-70 md:px-12 relative z-0">
                <div className="max-w-90rem mx-auto flex flex-col gap-24 md:gap-56">

                    {/* CARD 1: COQUETELARIA */}
                    <div id="coquetelaria" className="flex flex-col md:flex-row items-center gap-10 md:gap-32 relative scroll-mt-20">
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

                        <RevealGroup className="w-full md:w-1/2 flex flex-col gap-6 relative">
                            <div className="relative w-full md:w-fit flex flex-col md:block">
                                <RevealPop className="left-6 -top-10 mt-2 text-sm md:mt-0 absolute md:left-full md:top-3 md:ml-4 md:text-lg -rotate-15 font-beth-ellen text-[#00b4d8] whitespace-nowrap">
                                    = felicidade
                                </RevealPop>
                                <RevealItem from={side("right")}>
                                    <Title as="h2">
                                        Coquetelaria
                                    </Title>
                                </RevealItem>
                            </div>

                            <div className="flex flex-col gap-6 border-l-0 pl-0 md:border-l md:border-[#D9D9D9] md:pl-6 mt-2 md:mt-0">
                                <RevealItem from={side("right")}>
                                    <Text className="font-asap text-base md:text-lg text-white/90">Prove drinks clássicos e criações autorais exclusivas e contemporâneas feitos pelo nosso bar.</Text>
                                </RevealItem>
                                <RevealItem from={side("right")}>
                                    <Text className="font-asap text-base md:text-lg text-white/90">Usamos ingredientes frescos, destilados selecionados e xaropes artesanais feitos na nossa própria casa.</Text>
                                </RevealItem>
                                <RevealItem from={side("right")}>
                                    <Text className="font-asap text-base md:text-lg text-white/90">Dos sabores mais frescos e cítricos aos perfis intensos e complexos, temos a combinação perfeita para cada momento da sua noite.</Text>
                                </RevealItem>

                                <RevealItem from="bottom" distance={24} className="w-fit mt-4 mx-auto md:mx-0 md:self-start">
                                    <button className="font-asap text-base md:text-lg px-6 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300">
                                        Carta de drinks
                                    </button>
                                </RevealItem>
                            </div>
                        </RevealGroup>
                    </div>

                    {/* CARD 2: EVENTOS */}
                    <div id="eventos" className="flex flex-col md:flex-row items-center gap-10 md:gap-32 relative scroll-mt-20">
                        <RevealGroup className="w-full md:w-1/2 flex flex-col relative z-10">
                            <div className="relative w-fit">
                                <RevealItem from={side("left", "right")}>
                                    <Title as="h2">Eventos</Title>
                                </RevealItem>
                                <RevealPop className="left-30 -top-13 mt-2 text-sm md:mt-0 absolute md:left-full md:top-3 md:ml-4 md:text-lg -rotate-10 font-beth-ellen text-[#00b4d8] whitespace-nowrap md:-rotate-5">
                                    = sua nova memória favorita
                                </RevealPop>
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
                                    <RevealItem from={side("left", "right")} className="w-full md:w-auto">
                                        <Text className="font-asap text-base md:text-lg text-white/90">
                                            Feche o bar para comemorar o seu momento especial em grande estilo com quem você ama. o clima aqui é outro.
                                        </Text>
                                    </RevealItem>
                                    <RevealItem from={side("left", "right")} className="w-[85%] ml-auto md:ml-0 md:w-auto">
                                        <Text className="font-asap text-base md:text-lg text-white/90">
                                            Nosso ambiente com luz baixa, a música no volume perfeito, você reunida com as pessoas certas sendo servida por pessoas legais fazendo drinks lindos.
                                        </Text>
                                    </RevealItem>
                                    <RevealItem from={side("left", "right")} className="w-[70%] ml-auto md:ml-0 md:w-auto">
                                        <Text className="font-asap text-base md:text-lg text-white/90">
                                            Você se diverte e a gente cuida do resto :)
                                        </Text>
                                    </RevealItem>
                                    <RevealItem from="bottom" distance={24} className="mt-2 self-end md:mt-0">
                                        <Button>
                                            Fazer reserva
                                        </Button>
                                    </RevealItem>
                                </div>
                            </div>
                        </RevealGroup>

                        <div className="w-full md:w-1/2 relative z-99">
                            <Image
                                src="/imgs/info2.png"
                                alt="Eventos"
                                width={800}
                                height={600}
                                className="hidden md:block w-full h-auto object-cover"
                            />
                            <motion.div
                                ref={eventStarRef}
                                style={{ x: eventStarX }}
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

                    {/* CARD 3: SOBRE NÓS */}
                    <div id="sobre" className="flex flex-col relative w-full scroll-mt-20">
                        <RevealGroup className="flex items-end md:mb-16 w-full" stagger={0.18} amount={0.5}>
                            <RevealLine
                                origin="right"
                                className="hidden md:block flex-1 mr-4 md:mr-6 border-b border-[#D9D9D9]"
                            />
                            <RevealItem from={side("right", "left")}>
                                <Title as="h2">Sobre nós</Title>
                            </RevealItem>
                        </RevealGroup>

                        <div className="mb-30 md:mb-0 flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full">
                            <div className="w-full md:w-1/2 relative">
                                <Image src="/imgs/info3.png" alt="Sobre Nós" width={800} height={600} className="hidden md:block w-full h-auto object-cover relative z-10" />
                                <motion.div
                                    ref={starRef}
                                    style={{ y: isStarInView ? y : 0 }}
                                    className="hidden md:block md:absolute md:-bottom-10 md:-left-24 md:z-20"
                                >
                                    <BurnStar className="w-[200px]" from="left" />
                                </motion.div>
                            </div>

                            <RevealGroup className="w-full md:w-1/2 flex flex-col gap-6 border-l border-[#D9D9D9] pl-2 py-2 md:border-l-0 md:pl-6">
                                <RevealItem from={side("right")}>
                                    <Text className="font-asap text-base md:text-lg text-white/90">Nascemos da vontade de criar o bar onde nós mesmos gostaríamos de passar todas as nossas noites.</Text>
                                </RevealItem>
                                <RevealItem from={side("right")}>
                                    <Text className="font-asap text-base md:text-lg text-white/90">Não queríamos apenas servir bebidas, mas construir um espaço acolhedor com luz baixa, som de qualidade e um balcão onde todo mundo se sente em casa.</Text>
                                </RevealItem>
                                <RevealItem from={side("right")}>
                                    <Text className="font-asap text-base md:text-lg text-white/90">Aqui, a alta coquetelaria perde a postura séria e ganha frescor, criatividade e muita energia boa.</Text>
                                </RevealItem>
                                <RevealItem from={side("right")}>
                                    <Text className="font-asap text-base md:text-lg text-white/90">Somos apaixonados por misturar sabores, conectar pessoas e criar momentos incríveis.</Text>
                                </RevealItem>
                            </RevealGroup>

                            <BurnStar className="absolute bottom-0 -right-5 self-end md:hidden w-34 md:w-40 lg:w-52" from="right" />
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

                <motion.div
                    ref={contactStarRef}
                    style={{ x: contactStarX }}
                    className="absolute -top-24 right-10 md:right-32 z-50 hidden md:block"
                >
                    <Image
                        src="/imgs/Star3.png"
                        alt="Estrela verde"
                        width={200}
                        height={200}
                    />
                </motion.div>

                <div className="py-10 md:py-0 relative z-10 w-full max-w-[90rem] mx-auto px-3 md:px-12 flex-grow flex items-center">
                    <RevealGroup className="w-full md:w-5/6 flex flex-col gap-10">
                        <div className="flex md:flex-row w-full justify-start md:justify-start items-end relative md:w-fit gap-2 md:gap-0">
                            <RevealItem from="left">
                                <Title as="h2">Contato</Title>
                            </RevealItem>
                            <RevealPop className="font-beth-ellen md:mb-1 text-[#00b4d8] md:ml-4 md:text-lg ">
                                Manda um alô!
                            </RevealPop>
                        </div>
                        <div className="flex flex-col gap-6 max-w-2xl">
                            <RevealItem from="left">
                                <Text className="font-asap text-base md:text-lg text-white/90">Estamos te esperando na Rua das flores, 443, São Francisco.</Text>
                            </RevealItem>
                            <RevealItem from="left">
                                <Text className="font-asap text-base md:text-lg text-white/90">Abrimos de quinta a domingo, a partir das 19h.</Text>
                            </RevealItem>
                            <RevealItem from="left">
                                <Text className="font-asap text-base md:text-lg text-white/90">Se quiser garantir o seu lugar no balcão ou tirar alguma dúvida sobre festas e eventos, é só mandar uma mensagem no nosso WhatsApp  ;)</Text>
                            </RevealItem>
                            <RevealItem from="right" className="w-fit mt-4 self-end">
                                <button className="font-asap text-base md:text-lg px-8 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300">
                                    Garantir meu lugar
                                </button>
                            </RevealItem>
                        </div>
                    </RevealGroup>
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