import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/register-modal";
import ToasterProvider from "@/providers/toaster-provider";
import LoginModal from "@/components/modals/login-modal";
import getCurrentUser from "./actions/get-current-user";
import RentModal from "@/components/modals/rent-modal";
import SearchModal from "@/components/modals/search/search";

const quicksands = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clones - OdeDev::NextBnB",
  description: "Clones - OdeDev::NextBnB",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={quicksands.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
