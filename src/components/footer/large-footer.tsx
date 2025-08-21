"use client";

import icon from "@blog/components/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@blog/components/container";
import { useTranslation } from "react-i18next";
import { GitHub, Linkedin, Send, Youtube } from "react-feather";

export default function LargeFooter() {
  const { t } = useTranslation();
  return (
    <div className="bg-black/60 border-t border-white/10">
      <Container>
        <div className="py-8 sm:py-10 text-white/85">
          <div className="text-center sm:text-left mb-8">
            <Image
              src={icon}
              className="fill-current w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto"
              alt={t("footer.logo") ?? "logo"}
            />
            <p className="text-sm sm:text-base mt-2">
              {t("footer.copyright", { year: new Date().getFullYear() })}
              <br />
              {t("footer.rights")}
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-8">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center rounded-full p-2 sm:p-2.5 border border-white/15 text-white/85 hover:text-white hover:bg-white/10 transition"
              title="GitHub"
            >
              <GitHub size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="inline-flex items-center justify-center rounded-full p-2 sm:p-2.5 border border-white/15 text-white/85 hover:text-white hover:bg-white/10 transition"
              title="Telegram"
            >
              <Send size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center rounded-full p-2 sm:p-2.5 border border-white/15 text-white/85 hover:text-white hover:bg-white/10 transition"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="inline-flex items-center justify-center rounded-full p-2 sm:p-2.5 border border-white/15 text-white/85 hover:text-white hover:bg-white/10 transition"
              title="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-6 sm:gap-12">
            <nav className="text-center">
              <h6 className="font-semibold text-base mb-2">{t("footer.company")}</h6>
              <div className="flex flex-col gap-1">
                <Link href="/res/faq" className="text-sm hover:text-white transition-colors">
                  {t("footer.faq")}
                </Link>
                <Link href="/res/contact" className="text-sm hover:text-white transition-colors">
                  {t("footer.contact")}
                </Link>
              </div>
            </nav>
            <nav className="text-center">
              <h6 className="font-semibold text-base mb-2">{t("footer.legal")}</h6>
              <div className="flex flex-col gap-1">
                <Link href="/res/tos" className="text-sm hover:text-white transition-colors">
                  {t("footer.terms")}
                </Link>
                <Link href="/res/privacy" className="text-sm hover:text-white transition-colors">
                  {t("footer.privacy")}
                </Link>
              </div>
            </nav>
          </div>


        </div>
      </Container>
    </div>
  );
}
