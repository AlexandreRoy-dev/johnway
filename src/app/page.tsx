import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ProductsSection } from "@/components/products-section";
import { ServicesSection } from "@/components/services-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/",
  description: site.description,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesSection />
      <ProductsSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
