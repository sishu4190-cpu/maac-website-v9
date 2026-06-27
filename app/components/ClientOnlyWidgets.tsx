"use client";
import { usePathname } from "next/navigation";
import { WhatsAppFAB, ChatbotFAB, ScrollReveal } from "./FloatingWidgets";
import PageTransitionLoader from "./PageTransitionLoader";

export default function ClientOnlyWidgets() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;
  return (
    <>
      <PageTransitionLoader />
      <WhatsAppFAB />
      <ChatbotFAB />
      <ScrollReveal />
    </>
  );
}
