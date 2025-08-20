import { redirect } from "next/navigation";
import { loadRes } from "@blog/converters";
import { Container } from "@blog/components/container";
import { ResPageContent } from "./ResPageContent";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [
    {},
    { slug: ["faq"] },
    { slug: ["tos"] },
    { slug: ["contact"] },
    { slug: ["privacy"] },
    { slug: ["about"] },
  ];
}

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug.join("/") : "";
  if (!slugStr) {
    return null;
  }

  const content = await loadRes(slugStr);
  if (!content) {
    return null;
  }

  return {
    title: `${content.title} | Learn`,
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug[0] : "";
  if (!slugStr) {
    return redirect("/courses");
  }

  if (slugStr === "about") {
    return <ResPageContent type="about" />;
  }

  if (slugStr === "contact") {
    return <ResPageContent type="contact" />;
  }

  if (slugStr === "faq") {
    return <ResPageContent type="faq" />;
  }

  if (slugStr === "privacy") {
    return <ResPageContent type="privacy" />;
  }

  if (slugStr === "tos") {
    return <ResPageContent type="tos" />;
  }

  const content = await loadRes(slugStr);
  return (
    <Container>
      <div className="prose prose-neutral mx-auto mt-6 sm:mt-8">
        {content.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
        )}
      </div>
    </Container>
  );
}
