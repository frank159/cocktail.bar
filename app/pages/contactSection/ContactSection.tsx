import Text from "@/app/componentes/Text/Text";
import Title from "@/app/componentes/Title/Title";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section
      id="contato"
      // 1. Removemos o overflow-hidden daqui e deixamos o z-index alto
      className="relative z-30 w-full min-h-screen flex flex-col justify-between bg-[#270600] pt-32"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/imgs/banerFinal.png')" }}
      />

      {/* 2. WRAPPER DE CORTE: Cobre a seção inteira e tem overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -translate-y-1/2 right-10 md:right-32 z-20 hidden md:block">
          <Image
            src="/imgs/Star3.png"
            alt="Estrela azul"
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* 4. Conteúdo Principal */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 flex-grow flex items-center">
        <div className="w-full md:w-5/6 flex flex-col gap-10">

          {/* Título com texto cursivo ao lado */}
          <div className="flex items-end relative w-fit">
            <Title as="h2">CONTATO</Title>
            <span className="font-beth-ellen mb-1 ml-3 text-[#00b4d8] text-1xl md:text-2xl whitespace-nowrap">
              Manda um alô!!!
            </span>
          </div>

          <div className="flex flex-col gap-6 max-w-2xl">
            <Text className="font-asap text-lg text-white/90">
              Estamos te esperando na Rua das flores, 443, São Francisco.
            </Text>
            <Text className="font-asap text-lg text-white/90">
              Abrimos de quinta a domingo, a partir das 19h.
            </Text>
            <Text className="font-asap text-lg text-white/90">
              Se quiser garantir o seu lugar no balcão ou tirar alguma dúvida sobre festas e eventos, é só mandar uma mensagem no nosso WhatsApp  ;)
            </Text>

            {/* Botão */}
            <button className="font-asap text-lg px-8 py-2 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300 w-fit mt-4 self-end">
              Garantir meu lugar
            </button>
          </div>
        </div>
      </div>

      {/* 5. Footer (Copyright) */}
      <footer className="relative z-10 w-full py-6 border-t border-white/10 mt-20">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 text-center">
          <Text className="font-asap text-sm text-white/50">
            © 2026 Cocktail Blue bar. Todos os direitos reservados.
          </Text>
        </div>
      </footer>
    </section>
  );
}