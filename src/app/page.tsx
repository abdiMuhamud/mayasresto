import { About } from "@/components/About";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { MenuSection } from "@/components/MenuSection";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { ReservationModal } from "@/components/ReservationModal";
import { Reservations } from "@/components/Reservations";
import { Toaster } from "@/components/Toaster";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <About />
        <Reservations />
        <Location />
      </main>
      <Footer />

      <CartDrawer />
      <ReservationModal />
      <MobileOrderBar />
      <Toaster />
    </>
  );
}
