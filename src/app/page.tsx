import { Header } from "@/components/header";
import BlurFade from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <>
    <BlurFade delay={0.04}>
      <Header />
    </BlurFade>
    <section className="max-w-3xl mx-auto p-4 my-24">
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Hello World 👋
        </h2>
      </BlurFade>
    </section>
    </>
    
  );
}
