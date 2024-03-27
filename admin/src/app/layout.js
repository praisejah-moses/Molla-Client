import { Inter,Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/componets/nav";

const inter = Poppins({ subsets: ["latin"], weight:['400'] });

export const metadata = {
  title: "Molla - Dashboard",
  description: ".....",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
