import { setRequestLocale } from "next-intl/server";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Values } from "@/components/sections/Values";
import { Impact } from "@/components/sections/Impact";
import { Programs } from "@/components/sections/Programs";
import { Courses } from "@/components/sections/Courses";
import { Employment } from "@/components/sections/Employment";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { News } from "@/components/sections/News";
import { Partners } from "@/components/sections/Partners";
import { HowToHelp } from "@/components/sections/HowToHelp";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

type Params = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MotionProvider>
      <main id="contenido">
        <Hero />
        <Mission />
        <Values />
        <Impact />
        <Programs />
        <Courses />
        <Employment />
        <SuccessStories />
        <News />
        <Partners />
        <HowToHelp />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
