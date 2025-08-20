"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  return (
    <section id="about" className="relative py-24">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-2"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 tracking-tight">
            About Us
          </h2>
          <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-1.5 sm:h-2 bg-gradient-to-r from-[#0ea5e9] via-[#8b5cf6] to-[#10b981] rounded-full shadow-lg shadow-blue-500/25" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-bold leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Learn Smarter. Build Faster.
              </span>
            </motion.h3>

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Knowledge Hub is your space to learn clearly and quickly. We turn
              complex ideas into simple, practical lessons with examples you can
              use right away.
            </motion.p>

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Browse concise articles, hands‑on courses, and clean slide decks.
              Explore at your pace and find exactly what you need with fast,
              accurate search.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="group relative w-full max-w-md md:max-w-lg justify-self-center lg:justify-self-end lg:ml-8 xl:ml-12"
          >
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-indigo-500/25 to-purple-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-indigo-400/20"></div>

            <div className="relative rounded-3xl overflow-hidden border-2 border-white/30 bg-white/15 backdrop-blur-xl p-3 sm:p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] transition-all duration-500 transform group-hover:-translate-y-3 hover:-translate-y-3 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] z-10">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/about.png"
                  alt="People collaborating happily around a laptop"
                  fill
                  sizes="(min-width:1280px) 520px, (min-width:1024px) 440px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                  quality={85}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-500/0 to-indigo-600/10" />
    </section>
  );
}

export default AboutSection;


