"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b border-white hidden md:block transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/10 backdrop-blur-lg" // Sombra para baixo
          : "bg-transparent" // Totalmente transparente no topo
      }`}
    >
      <div className="flex justify-end">
        <nav className="flex items-center gap-16 px-14 py-2 border-l border-white">
          
          <a 
            href="#home" 
            className="font-asap text-white text-base tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase"
          >
            Home
          </a>
          
          <a 
            href="#coquetelaria" 
            className="font-asap text-white text-base tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase"
          >
            Coquetelaria
          </a>
          
          <a 
            href="#eventos" 
            className="font-asap text-white text-base tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase"
          >
            Eventos
          </a>
          
          <a 
            href="#sobre" 
            className="font-asap text-white text-base tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase"
          >
            Sobre nós
          </a>
          
          <a 
            href="#contato" 
            className="font-asap text-white text-base tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase"
          >
            Contato
          </a>

        </nav>
      </div>
    </header>
  );
}