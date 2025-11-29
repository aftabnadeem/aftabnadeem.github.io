import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Aftab Nadeem | Full Stack Developer",
  description: "Portfolio of Aftab Nadeem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-white">
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
