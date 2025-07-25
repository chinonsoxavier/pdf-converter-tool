import { cn } from "@/lib/utils";

const ContainerLayout = ({
  children,
  style,
  id,
  className = "", // Default to empty string if no className is provided
}: Readonly<{
  style?:Object,
  children: React.ReactNode;
  id?:string,
  className?: string; // Optional className prop
}>) => {
  return (

    <section id={id} style={style} className={cn("flex w-full items-center mx-auto justify-center flex-col")}>
      <div className={cn(className,"flex max-width")} >
        {children}
      </div>
    </section>
  );
};

export default ContainerLayout;
