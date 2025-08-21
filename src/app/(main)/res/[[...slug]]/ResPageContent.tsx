"use client";

import "@blog/i18n/boot";
import { useTranslation } from "react-i18next";
import { Container } from "@blog/components/container";
import Image from "next/image";

type ResPageType = "about" | "contact" | "faq" | "privacy" | "tos";

interface ResPageContentProps {
  type: ResPageType;
  contentHtml?: string;
}

export function ResPageContent({ type, contentHtml }: ResPageContentProps) {
  const { t } = useTranslation();

  if (type === "about") {
    return (
      <Container>
        <div className="mx-auto mt-8 sm:mt-10 max-w-6xl pb-16 sm:pb-20 px-4 sm:px-6">
          {/* Title */}
          <header className="text-center mb-10 sm:mb-14">
            <div className="inline-block text-left">
              <h1 className="text-3xl sm:text-5xl font-extrabold">
                {t("res.about.title")}
              </h1>
              <div className="mt-3 h-1 w-20 sm:w-28 bg-primary rounded-full" />
            </div>
          </header>

          {/* Our Story */}
          <section className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20 items-center mb-14 sm:mb-20">
            <div className="md:pr-8 lg:pr-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {t("res.about.ourStory")}
              </h2>
              <p className="text-base sm:text-lg md:leading-relaxed opacity-80 mb-3 text-justify">
                {t("res.about.storyP1")}
              </p>
              <p className="text-base sm:text-lg md:leading-relaxed opacity-80 text-justify">
                {t("res.about.storyP2")}
              </p>
            </div>
            <FramedImage src="/ab3.jpeg" alt={t("res.about.imageAlt")} />
          </section>

          {/* Our Mission */}
          <section className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <FramedImage src="/ab4.jpg" alt={t("res.about.imageAlt")} />
            </div>
            <div className="order-1 md:order-2 md:pl-8 lg:pl-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {t("res.about.ourMission")}
              </h2>
              <p className="text-base sm:text-lg md:leading-relaxed opacity-80 mb-3 text-justify">
                {t("res.about.missionP1")}
              </p>
              <p className="text-base sm:text-lg md:leading-relaxed opacity-80 text-justify">
                {t("res.about.missionP2")}
              </p>
            </div>
          </section>

          {contentHtml && (
            <div className="prose prose-neutral mx-auto mt-10">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          )}
        </div>
      </Container>
    );
  }

  if (type === "contact") {
    return (
      <Container>
        <div className="mx-auto mt-8 sm:mt-10 max-w-4xl pb-16 sm:pb-20 px-4 sm:px-6">
          <header className="text-center mb-14 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              {t("res.contact.title")}
            </h1>
            <p className="mt-4 text-lg sm:text-xl opacity-80 max-w-2xl mx-auto">
              {t("res.contact.description")}
            </p>
          </header>

          <div className="bg-base-200/20 rounded-2xl p-8 sm:p-12 border border-base-300/40">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  {t("res.contact.email")}
                </h2>
                <a
                  href="mailto:contact@adorsys-gis.com"
                  className="text-primary text-xl font-medium hover:underline"
                >
                  {t("res.contact.emailAddress")}
                </a>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">
                  {t("res.contact.social")}
                </h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-base-300/40">
                <p className="text-sm opacity-70">
                  {t("res.contact.responseTime")}
                </p>
              </div>
            </div>
          </div>

          {contentHtml && (
            <div className="prose prose-neutral mx-auto mt-10">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          )}
        </div>
      </Container>
    );
  }

  if (type === "faq") {
    return (
      <Container>
        <div className="mx-auto mt-8 sm:mt-10 max-w-4xl pb-16 sm:pb-20 px-4 sm:px-6">
          <header className="text-center mb-14 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              {t("res.faq.title")}
            </h1>
            <p className="mt-4 text-lg sm:text-xl opacity-80 max-w-2xl mx-auto">
              {t("res.faq.description")}
            </p>
          </header>

          <div className="bg-base-200/20 rounded-2xl p-8 sm:p-12 border border-base-300/40 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-2xl font-semibold mb-4">
                {t("res.faq.comingSoon")}
              </h2>
            </div>
          </div>

          {contentHtml && (
            <div className="prose prose-neutral mx-auto mt-10">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          )}
        </div>
      </Container>
    );
  }

  if (type === "privacy") {
    return (
      <Container>
        <div className="mx-auto mt-8 sm:mt-10 max-w-4xl pb-16 sm:pb-20 px-4 sm:px-6">
          <header className="text-center mb-14 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              {t("res.privacy.title")}
            </h1>
            <p className="mt-4 text-lg sm:text-xl opacity-80 max-w-2xl mx-auto">
              {t("res.privacy.description")}
            </p>
          </header>

          <div className="bg-base-200/20 rounded-2xl p-8 sm:p-12 border border-base-300/40 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🔒</div>
              <h2 className="text-2xl font-semibold mb-4">
                {t("res.privacy.comingSoon")}
              </h2>
            </div>
          </div>

          {contentHtml && (
            <div className="prose prose-neutral mx-auto mt-10">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          )}
        </div>
      </Container>
    );
  }

  if (type === "tos") {
    return (
      <Container>
        <div className="mx-auto mt-8 sm:mt-10 max-w-4xl pb-16 sm:pb-20 px-4 sm:px-6">
          <header className="text-center mb-14 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              {t("res.tos.title")}
            </h1>
            <p className="mt-4 text-lg sm:text-xl opacity-80 max-w-2xl mx-auto">
              {t("res.tos.description")}
            </p>
          </header>

          <div className="bg-base-200/20 rounded-2xl p-8 sm:p-12 border border-base-300/40 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">📋</div>
              <h2 className="text-2xl font-semibold mb-4">
                {t("res.tos.comingSoon")}
              </h2>
            </div>
          </div>

          {contentHtml && (
            <div className="prose prose-neutral mx-auto mt-10">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          )}
        </div>
      </Container>
    );
  }

  return null;
}

// Clean image display without colorful frames
function FramedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-56 sm:h-72 lg:h-96 rounded-2xl overflow-hidden border border-base-300/40 bg-base-200/60">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}
