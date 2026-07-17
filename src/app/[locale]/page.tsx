import { setRequestLocale } from "next-intl/server";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Benefits } from "@/components/sections/Benefits";
import { Courses } from "@/components/sections/Courses";
import { Employment } from "@/components/sections/Employment";
import { Community } from "@/components/sections/Community";
import { Statistics } from "@/components/sections/Statistics";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/layout/Footer";

type Params = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MotionProvider>
      <main id="contenido">
        <Hero />
        <Problem />
        <Solution />
        <Benefits />
        <Courses />
        <Employment />
        <Community />
        <Statistics />
        <About />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </MotionProvider>
  );
}
