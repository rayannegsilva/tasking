import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
};

// export default PlatformLayout;


// const PlatformLayout = ({
//   children
// }: {
//   children: React.ReactNode;
// }) => {
//   return (
//     <ClerkProvider>
//       {children}
//     </ClerkProvider>
//   );
// };

// export default PlatformLayout;
