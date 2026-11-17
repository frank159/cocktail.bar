"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";

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

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Coquetelaria", href: "#coquetelaria" },
    { name: "Eventos", href: "#eventos" },
    { name: "Sobre nós", href: "#sobre" },
    { name: "Contato", href: "#contato" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      const headerOffset = 64;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    closeMenu();
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
        <div className="flex justify-between w-full h-16 md:h-13">
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center px-6">
            <Image src="/imgs/logo.png" alt="Logo" width={160} height={40} className="h-auto w-40 md:w-50 object-contain" />
          </a>
          <nav className="hidden md:flex items-center gap-16 px-14 border-l border-white ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-asap text-white text-base tracking-widest hover:text-[#00b4d8] transition-colors duration-300 uppercase cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex md:hidden ml-auto border-l border-white h-full">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-6 h-full border-0 outline-none ring-0 text-white hover:text-[#00b4d8] transition-colors focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 active:border-0 active:outline-none active:ring-0 flex items-center justify-center relative z-101"
              style={{ WebkitTapHighlightColor: "transparent" }}
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
                  onClick={(e) => handleNavClick(e, link.href)}
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