import Benefits from "@/Components/Presentation/Benefits/Benefits";
import Footer from "@/Components/Presentation/Footer/Footer";
import Home from "@/Components/Presentation/Home/Home";
import Navbar from "@/Components/Presentation/Navbar/Navbar";
import Price from "@/Components/Presentation/Price/Price";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedilo",
  description: "Pedilo App",
};

export default function Dashboard() {
  return (
    <main style={{ minWidth: "100%" }}>
      <Navbar />
      <Home id="home" />
      <Price id="prices" />
      <Benefits id="benefits" />
      <Footer />
    </main>
  );
}
