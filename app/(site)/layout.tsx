import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { readDb } from "@/lib/db";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await readDb();

  return (
    <>
      <Starfield />
      <Nav name={profile.name} email={profile.email} />
      <main>{children}</main>
      <Footer profile={profile} />
    </>
  );
}
