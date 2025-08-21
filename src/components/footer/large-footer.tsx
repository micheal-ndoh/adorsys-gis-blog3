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
        <div className="py-8 sm:py-10 text-white/85 sm:flex sm:justify-between sm:items-start">
          <div className="text-center mb-8 sm:mb-0">
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
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-0">
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

          {/* Mobile: COMPANY and LEGAL on same line */}
          <div className="flex flex-row flex-wrap justify-center sm:hidden gap-8 mb-8 sm:mb-0">
            <nav className="text-center">
              <h6 className="footer-title text-base">{t("footer.company")}</h6>
              <div className="flex flex-col gap-1">
                <Link href="/res/faq" className="link link-hover text-sm">
                  {t("footer.faq")}
                </Link>
                <Link href="/res/contact" className="link link-hover text-sm">
                  {t("footer.contact")}
                </Link>
              </div>
            </nav>
            <nav className="text-center">
              <h6 className="footer-title text-base">{t("footer.legal")}</h6>
              <div className="flex flex-col gap-1">
                <Link href="/res/tos" className="link link-hover text-sm">
                  {t("footer.terms")}
                </Link>
                <Link href="/res/privacy" className="link link-hover text-sm">
                  {t("footer.privacy")}
                </Link>
              </div>
            </nav>
          </div>

          {/* Desktop: Original horizontal layout */}
          <nav className="hidden sm:block text-left">
            <h6 className="footer-title text-base sm:text-lg">{t("footer.company")}</h6>
            <div className="flex flex-col gap-1">
              <Link href="/res/faq" className="link link-hover text-sm sm:text-base">
                {t("footer.faq")}
              </Link>
              <Link href="/res/contact" className="link link-hover text-sm sm:text-base">
                {t("footer.contact")}
              </Link>
            </div>
          </nav>
          <nav className="hidden sm:block text-left">
            <h6 className="footer-title text-base sm:text-lg">{t("footer.legal")}</h6>
            <div className="flex flex-col gap-1">
              <Link href="/res/tos" className="link link-hover text-sm sm:text-base">
                {t("footer.terms")}
              </Link>
              <Link href="/res/privacy" className="link link-hover text-sm sm:text-base">
                {t("footer.privacy")}
              </Link>
            </div>
          </nav>


        </div>
      </Container>
    </div>
  );
}
