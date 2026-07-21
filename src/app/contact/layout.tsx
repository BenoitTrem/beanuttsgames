import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Beanutts Games for questions, feedback, or press inquiries.",
  openGraph: {
    title: "Contact — Beanutts Games",
    description:
      "Get in touch with Beanutts Games for questions, feedback, or press inquiries.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Beanutts Games",
    description:
      "Get in touch with Beanutts Games for questions, feedback, or press inquiries.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
