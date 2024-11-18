import { Container, Main, Section } from "@/components/craft";
import Hero from "@/components/core/hero";
import Feature from "@/components/core/features";
import Footer from "@/components/core/footer";
import CTA from "@/components/core/cta";

export default function Home() {
  return (
    <Main>
      <Section>
        <Container>
          <Hero />
          <CTA />
          <Feature />
          <Footer />
        </Container>
      </Section>
    </Main>
  );
}
