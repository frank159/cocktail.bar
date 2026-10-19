"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

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

  // NOVA FUNÇÃO: Intercepta o clique e faz a rolagem suave
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Impede o redirecionamento brusco padrão

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      // Calcula a posição do elemento e subtrai a altura do header (64px = 4rem)
      const headerOffset = 64;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" // AQUI ESTÁ A MÁGICA DA ROLAGEM SUAVE
      });
    }

    closeMenu(); // Fecha o menu mobile se estiver aberto
  };

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    open: {
      height: "calc(100dvh - 4rem)",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } satisfies Variants;

  const itemVariants = {
    closed: { y: -20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  } satisfies Variants;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-100 border-b border-white transition-all duration-300 ease-in-out ${isScrolled || isMenuOpen ? "bg-white/10 backdrop-blur-lg" : "bg-transparent"
          }`}
      >
        <div className="flex justify-end w-full h-16 md:h-13">
          {/* === VERSÃO DESKTOP === */}
          <nav className="hidden md:flex items-center gap-16 px-14 border-l border-white ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)} // CONECTADO AQUI
                className="font-asap text-white text-base tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* === VERSÃO MOBILE === */}
          <div className="flex md:hidden ml-auto border-l border-white h-full">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-6 h-full text-white hover:text-[#00b4d8] transition-colors focus:outline-none flex items-center justify-center relative z-101"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* === MENU DROPDOWN MOBILE ANIMADO === */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed top-16 left-0 w-full overflow-hidden bg-[#270600]/70 backdrop-blur-xl z-90"
          >
            <nav className="flex h-full w-full flex-col items-center">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)} // CONECTADO AQUI TAMBÉM
                  variants={itemVariants}
                  className="font-asap flex w-full flex-1 items-center justify-center border-t border-white/20 text-center text-white text-lg tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}