import { Header }     from "@/components/Header";
import { LogoIntro }  from "@/components/LogoIntro";
import { WorkLayers } from "@/components/WorkLayers";
import { LogoStrip }  from "@/components/LogoStrip";
import { Services }   from "@/components/Services";
import { Work }       from "@/components/Work";
import { Process }    from "@/components/Process";
import { About }      from "@/components/About";
import { Industries } from "@/components/Industries";
import { FAQ }        from "@/components/FAQ";
import { Contact }    from "@/components/Contact";
import { Footer }     from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <LogoIntro />
        <WorkLayers />
        <LogoStrip />
        <Services />
        <Work />
        <Process />
        <About />
        <Industries />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
