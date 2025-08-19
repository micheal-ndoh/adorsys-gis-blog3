"use client";

import { Container } from "@blog/components/container";
import { useTranslation } from "react-i18next";

export default function AppFooter() {
  const { t } = useTranslation();
  return (
    <div className="bg-base-200">
      <Container>
        <footer className="footer footer-center">
          <aside>
            <p>
              {t("footer.copyrightInline", { year: new Date().getFullYear() })}
            </p>
          </aside>
        </footer>
      </Container>
    </div>
  );
}
