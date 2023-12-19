import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner'

export default function PlatformLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
     <QueryProvider>
        <Toaster richColors />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

