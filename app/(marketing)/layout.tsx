import { Footer } from "./_components/footer";
import { NavBar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}:  {children: React.ReactNode}) {
  return (
    <div className="h-full flex w-full">
      <NavBar />
      <main className="pt-40 pb-20 flex w-full justify-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}
