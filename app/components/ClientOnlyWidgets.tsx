"use client";
import { usePathname } from "next/navigation";
import { WhatsAppFAB, ChatbotFAB, ScrollReveal } from "./FloatingWidgets";

export default function ClientOnlyWidgets() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;
  return (
    <>
      <WhatsAppFAB />
      <ChatbotFAB />
      <ScrollReveal />
    </>
  );
}
