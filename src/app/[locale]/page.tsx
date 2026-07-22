import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
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

/** Code-splitting: framer-motion (~15KB) se descarga en un chunk aparte
 * en vez de sumarse al bundle inicial — sigue renderizando en el
 * servidor (ssr:true, por defecto), solo cambia cuándo se descarga/
 * evalúa el JS del cliente. */
const MotionProvider = dynamic(() =>
  import("@/components/motion/MotionProvider").then((m) => m.MotionProvider),
);

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
