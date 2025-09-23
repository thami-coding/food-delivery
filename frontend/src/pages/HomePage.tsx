import Hero from "../components/Hero";
import Products from "../components/Products";

export default function HomePage() {
  return (
    <section className="pt-4 h-screen">
      <Hero />
      <Products  />
    </section>
  );
}
