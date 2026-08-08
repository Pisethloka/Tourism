import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { GlobalCTA } from "../components/GlobalCTA";

export const metadata = {
  metadataBase: new URL("https://angkorlux.com"),
  title: "Angkor Lux | The Kingdom of Wonder Tourism Portal",
  description:
    "Curating the most exclusive journeys through Cambodia. Discover ancient Angkor temples, crystal island waters, rich history, and authentic Khmer cultural heritage.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Angkor Lux | The Kingdom of Wonder Tourism Portal",
    description:
      "Curating the most exclusive journeys through Cambodia. Discover ancient Angkor temples, crystal island waters, and authentic Khmer cultural heritage.",
    images: ["/assets/hero_angkor.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-brand-cream text-brand-dark selection:bg-brand-gold selection:text-brand-dark font-sans antialiased">
        {/* Floating Navbar */}
        <Navbar />

        {/* Dynamic App Router Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Global Call to Action Banner */}
        <GlobalCTA />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
