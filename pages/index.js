import Navbar from "../components/Navbar";
import NavigationLinks from "../components/NavLinks";
import Hero from "../components/Hero";
import Services from "../components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <NavigationLinks />
      <Hero />
      <Services />
    </>
  );
}
