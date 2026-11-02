import { About } from "@/components/About";
import { CartDrawer } from "@/components/CartDrawer";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Marquee } from "@/components/Marquee";
import { MenuSection } from "@/components/MenuSection";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { Preloader } from "@/components/Preloader";
import { ReservationModal } from "@/components/ReservationModal";
import { Reservations } from "@/components/Reservations";
import { Signatures } from "@/components/Signatures";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Toaster } from "@/components/Toaster";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Signatures />
        <MenuSection />
        <Reservations />
        <Location />
      </main>
      <Footer />

      <CartDrawer />
      <ReservationModal />
      <MobileOrderBar />
      <Toaster />
      <CustomCursor />
    </>
  );
}
