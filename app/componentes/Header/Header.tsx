"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Coquetelaria", href: "#coquetelaria" },
    { name: "Eventos", href: "#eventos" },
    { name: "Sobre nós", href: "#sobre" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] border-b border-white transition-all duration-300 ease-in-out ${
        isScrolled || isMenuOpen
          ? "bg-white/10 backdrop-blur-lg" // Sombra para baixo
          : "bg-transparent" // Totalmente transparente no topo

      }`}
    >
      <div className="flex justify-end w-full h-16 md:h-13">
        
        {/* === VERSÃO DESKTOP (Aparece em telas maiores que 'md') === */}
        <nav className="hidden md:flex items-center gap-16 px-14 border-l border-white ml-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-asap text-white text-base tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* === VERSÃO MOBILE (Aparece APENAS em telas menores que 'md') === */}
        <div className="flex md:hidden ml-auto border-l border-white h-full">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-6 h-full text-white hover:text-[#00b4d8] transition-colors focus:outline-none flex items-center justify-center relative z-[101]"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? (
              // Ícone X (Fechar)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ícone Hambúrguer (Abrir) - Três linhas grossas
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100 bg-[#270600]/95 backdrop-blur-lg border-b border-white" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center py-6 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="font-asap text-white text-lg tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}