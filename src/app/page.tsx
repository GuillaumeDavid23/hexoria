import { CallBar } from "@/components/site/call-bar";
import { Clarity } from "@/components/site/clarity";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Journey } from "@/components/site/journey";
import { ScrubReveals } from "@/components/site/scrub-reveals";
import { Services } from "@/components/site/services";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { StructuredData } from "@/components/site/structured-data";
import { Zone } from "@/components/site/zone";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Clarity />
        <Services />
        <Journey />
        <Zone />
        <Faq />
      </main>
      <Footer />
      <CallBar />
      <StructuredData />
      <ScrubReveals />
    </SmoothScroll>
  );
}
