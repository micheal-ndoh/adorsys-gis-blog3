"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-2"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 tracking-tight">
            About Us
          </h2>
          <div className="mt-2 h-1 w-24 bg-orange-400/80 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <motion.h3
              className="text-3xl md:text-4xl font-semibold text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Discover Excellence Together
            </motion.h3>

            <motion.p
              className="text-lg md:text-xl text-white/70 leading-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              We are a community of passionate learners and builders. Whether you are
              just getting started or leveling up your craft, our platform brings
              people together to share knowledge, collaborate on ideas, and create
              extraordinary results.
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-white/70 leading-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Join us to discover inspiring stories, learn from experts, and find a
              supportive network that helps you grow.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl lg:ml-6 xl:ml-12"
          >
            <Image
              src="/about.png"
              alt="People collaborating happily around a laptop"
              width={1280}
              height={960}
              className="w-full h-auto object-cover"
              priority={false}
            />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-500/0 to-indigo-600/10" />
    </section>
  );
}

export default AboutSection;


