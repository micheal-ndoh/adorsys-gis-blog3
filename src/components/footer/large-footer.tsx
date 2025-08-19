"use client";

import icon from "@blog/components/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@blog/components/container";
import { useTranslation } from "react-i18next";

export default function LargeFooter() {
  const { t } = useTranslation();
  return (
    <div className="bg-base-300">
      <Container>
        <footer className="footer sm:footer-horizontal sm:p-10">
          <aside>
            <Image
              src={icon}
              className="fill-current w-24 h-24"
              alt={t("footer.logo") ?? "logo"}
            />

            <p>
              {t("footer.copyright", { year: new Date().getFullYear() })}
              <br />
              {t("footer.rights")}
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">{t("footer.company")}</h6>
            <Link href="/res/faq" className="link link-hover">
              {t("footer.faq")}
            </Link>
            <Link href="/res/contact" className="link link-hover">
              {t("footer.contact")}
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title">{t("footer.legal")}</h6>
            <Link href="/res/tos" className="link link-hover">
              {t("footer.terms")}
            </Link>
            <Link href="/res/privacy" className="link link-hover">
              {t("footer.privacy")}
            </Link>
          </nav>
        </footer>
      </Container>
    </div>
  );
}
