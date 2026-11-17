"use client";

import { useEffect, useRef, useState, type UIEvent } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type ProjectModalProps = {
  open: boolean;
  name: string;

  images?: string[];

  pdfHref?: string;

  fitToViewport?: boolean;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;


const HIDE_THRESHOLD = 40;

const SHOW_THRESHOLD = 25;

const ALWAYS_SHOW_BELOW = 80;


const VIEWPORT_H = "h-[100dvh] sm:h-[calc(100dvh-5rem)]";
const VIEWPORT_MAX_H = "max-h-[100dvh] sm:max-h-[calc(100dvh-5rem)]";

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
};


const panelVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    transition: { duration: 0.3, ease: EASE },
  },
};


const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

type Bucket = { r: number; g: number; b: number; n: number };



function getDominantColor(img: HTMLImageElement): string | null {
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  const buckets = new Map<string, Bucket>();

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;

    const key = `${data[i] >> 4}-${data[i + 1] >> 4}-${data[i + 2] >> 4}`;
    const bucket = buckets.get(key) ?? { r: 0, g: 0, b: 0, n: 0 };
    bucket.r += data[i];
    bucket.g += data[i + 1];
    bucket.b += data[i + 2];
    bucket.n++;
    buckets.set(key, bucket);
  }

  let best: Bucket | null = null;
  for (const bucket of buckets.values()) {
    if (!best || bucket.n > best.n) best = bucket;
  }
  if (!best) return null;

  const r = Math.round(best.r / best.n);
  const g = Math.round(best.g / best.n);
  const b = Math.round(best.b / best.n);
  return `rgb(${r}, ${g}, ${b})`;
}


function useHideOnScroll() {
  const lastY = useRef(0);
  const [visible, setVisible] = useState(true);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;


    const maxScroll = Math.max(el.scrollHeight - el.clientHeight, 0);
    const y = Math.min(Math.max(el.scrollTop, 0), maxScroll);
    const delta = y - lastY.current;

    if (y < ALWAYS_SHOW_BELOW || delta <= -SHOW_THRESHOLD) {
      setVisible(true);
      lastY.current = y;
    } else if (delta >= HIDE_THRESHOLD) {
      setVisible(false);
      lastY.current = y;
    }

  };

  return { visible, onScroll };
}

type ModalContentProps = Omit<ProjectModalProps, "open">;

function ModalContent({
  name,
  images = [],
  pdfHref,
  fitToViewport = false,
  onClose,
}: ModalContentProps) {
  const reduceMotion = useReducedMotion();
  const bg = '#480102'
  const { visible: showClose, onScroll } = useHideOnScroll();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (

    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {}
      <div
        onScroll={onScroll}
        onClick={onClose}

        data-lenis-prevent
        className="absolute inset-0 cursor-pointer overflow-x-hidden overflow-y-auto overscroll-contain"
      >
        <div
          className={`flex min-h-full justify-center ${fitToViewport ? "items-center px-4 sm:px-0 sm:py-10" : "items-start"
            }`}
        >
          {/* Coluna única: as imagens se encostam e formam uma imagem longa.
              No modo "fit" o painel tem exatamente o tamanho da imagem
              (w-fit), então a cor de fundo nunca sobra em volta dela. */}
          <motion.div
            className={`overflow-hidden transition-colors duration-300 ${fitToViewport ? "w-fit max-w-full" : "w-full max-w-[1100px]"
              }`}

            style={{ backgroundColor: bg }}
            variants={panelVariants}
          >
            {images.map((src, i) => (
              <motion.div key={src} variants={itemVariants}>
                <Image
                  src={src}
                  alt={`${name} - imagem ${i + 1} de ${images.length}`}
                  width={0}
                  height={0}
                  sizes="(min-width: 1100px) 1100px, 100vw"

                  className={
                    fitToViewport
                      ? `block h-auto w-auto max-w-[calc(100vw-2rem)] sm:max-w-[100vw] ${VIEWPORT_MAX_H}`
                      : "block h-auto w-full"
                  }
                  priority={i === 0}
                />
              </motion.div>
            ))}

            {pdfHref && (
              <motion.div variants={itemVariants} className={`w-full ${VIEWPORT_H}`}>
                <iframe
                  src={`${pdfHref}#toolbar=1&navpanes=0&view=FitH`}
                  title={name}
                  className="h-full w-full border-0"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {}
      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Fechar projeto"
        tabIndex={showClose ? 0 : -1}
        aria-hidden={!showClose}
        initial={false}
        animate={
          showClose
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -20, scale: 0.8 }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: showClose ? 0.35 : 0.25, ease: EASE }
        }
        whileHover={showClose ? { scale: 1.1 } : undefined}
        whileTap={showClose ? { scale: 0.95 } : undefined}
        style={{ pointerEvents: showClose ? "auto" : "none" }}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#f9fadb] text-xl leading-none text-black shadow-lg will-change-transform lg:right-8 lg:top-6"
      >
        ✕
      </motion.button>
    </motion.div>
  );
}

export default function ProjectModal({ open, ...props }: ProjectModalProps) {
  return (
    <AnimatePresence>{open && <ModalContent {...props} />}</AnimatePresence>
  );
}