import Image from "next/image";
import Text from "@/app/componentes/Text/Text";
import Title from "@/app/componentes/Title/Title";

export default function InfoSection() {
    return (
        <section className="w-full bg-[#270600] text-white py-24 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-[90rem] mx-auto flex flex-col gap-56">

                {/* ================= SEÇÃO 1: COQUETELARIA ================= */}
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 relative">

                    <div className="w-full md:w-1/2 relative">
                        <Image
                            src="/imgs/info1.png"
                            alt="Coquetelaria"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover relative z-10"
                        />
                        <Image
                            src="/imgs/Star1.png"
                            alt="Estrela azul"
                            width={200}
                            height={200}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 hidden md:block"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-6 relative">
                        <div className="relative w-fit">
                            <Title as="h2">
                                COQUETELARIA
                            </Title>

                            <span className="absolute left-full top-3 ml-4 -rotate-10 font-beth-ellen text-[#00b4d8] text-lg md:text-lg whitespace-nowrap">
                                = felicidade
                            </span>
                        </div>

                        <div className="flex flex-col gap-6 border-l-2 border-[#D9D9D9] pl-6">
                            <Text className="font-asap text-lg text-white/90">
                                Prove drinks clássicos e criações autorais exclusivas e contemporâneas feitos pelo nosso bar.
                            </Text>
                            <Text className="font-asap text-lg text-white/90">
                                Usamos ingredientes frescos, destilados selecionados e xaropes artesanais feitos na nossa própria casa.
                            </Text>
                            <Text className="font-asap text-lg text-white/90">
                                Dos sabores mais frescos e cítricos aos perfis intensos e complexos, temos a combinação perfeita para cada momento da sua noite.
                            </Text>
                            <button className="font-asap text-lg px-6 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300 w-fit mt-2">
                                Carta de drinks
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= SEÇÃO 2: EVENTOS ================= */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-32 relative">

                    <div className="w-full md:w-1/2 relative">
                        <Image
                            src="/imgs/info2.png"
                            alt="Eventos"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover relative z-10"
                        />
                        <Image
                            src="/imgs/Star3.png"
                            alt="Estrela"
                            width={200}
                            height={200}
                            className="absolute -top-8 -right-8 z-20 hidden md:block"
                        />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col gap-6 relative">
                        {/* Estrutura do Título igual ao Card 1 */}
                        <div className="relative w-fit">
                            <Title as="h2">
                                EVENTOS
                            </Title>
                            <span className="absolute left-full top-3 ml-4 -rotate-5 font-beth-ellen text-[#00b4d8] text-lg md:text-lg whitespace-nowrap">
                                = sua nova memória favorita
                            </span>
                        </div>

                        {/* Textos e Botão */}
                        <div className="flex flex-col gap-6">
                            <Text className="font-asap text-lg text-white/90">
                                Feche o bar para comemorar o seu momento especial em grande estilo com quem você ama. o clima aqui é outro.
                            </Text>
                            <Text className="font-asap text-lg text-white/90">
                                Nosso ambiente com luz baixa, a música no volume perfeito, você reunida com as pessoas certas sendo servida por pessoas legais fazendo drinks lindos.
                            </Text>
                            <Text className="font-asap text-lg text-white/90">
                                Você se diverte e a gente cuida do resto :)
                            </Text>

                            {/* Adicionado -mt-4 para puxar o botão para cima */}
                            <button className="-mt-15 self-end font-asap text-lg px-6 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300 w-fit">
                                Fazer reserva
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= SEÇÃO 3: SOBRE NÓS ================= */}
                <div className="flex flex-col items-center relative">

                    <div className="relative mb-16 text-center w-full max-w-md">
                        <Title as="h2">
                            SOBRE NÓS
                        </Title>
                        <div className="w-full h-[2px] bg-white/30 mt-4"></div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full">
                        <div className="w-full md:w-1/2 relative">
                            <Image
                                src="/imgs/info3.png"
                                alt="Sobre Nós"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover relative z-10"
                            />
                            <svg className="absolute -bottom-10 -left-10 z-20 hidden md:block" width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 0 L53 47 L100 50 L53 53 L50 100 L47 53 L0 50 L47 47 Z" fill="#00b4d8" />
                                <path d="M20 20 L43 43 L40 46 L17 23 Z" fill="#00b4d8" />
                                <path d="M80 20 L57 43 L60 46 L83 23 Z" fill="#00b4d8" />
                                <path d="M20 80 L43 57 L40 54 L17 77 Z" fill="#00b4d8" />
                                <path d="M80 80 L57 57 L60 54 L83 77 Z" fill="#00b4d8" />
                            </svg>
                        </div>

                        <div className="w-full md:w-1/2 flex flex-col gap-6 border-l-2 border-[#D9D9D9] pl-6">
                            <Text className="font-asap text-lg text-white/90">
                                Nascemos do desejo de criar um lugar onde as pessoas pudessem relaxar e aproveitar bons drinks em boa companhia.
                            </Text>
                            <Text className="font-asap text-lg text-white/90">
                                Nosso compromisso é oferecer um ambiente acolhedor, com uma equipe dedicada e uma seleção cuidadosa de bebidas.
                            </Text>
                            <Text className="font-asap text-lg text-white/90">
                                Acreditamos que cada detalhe importa, desde a seleção dos ingredientes até a forma como servimos. Nosso objetivo é proporcionar momentos inesquecíveis.
                            </Text>
                            <Text className="font-asap text-lg text-white/90">
                                Somos apaixonados por criar conexões e proporcionar experiências únicas.
                            </Text>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}