import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-6 right-6 md:bottom-0 md:left-0 md:w-full z-50 md:p-12 flex justify-end items-end pointer-events-none">
      
      <div className="text-right flex flex-col items-end gap-2 pointer-events-auto">
        <Link href="#connect" className="group cursor-pointer flex flex-col items-end">
          <span className="font-grotesk text-[10px] uppercase tracking-[0.4em] text-quicksilver/60 group-hover:text-aurum transition-colors">
            connect.terminal
          </span>
          <div className="h-[1px] w-0 group-hover:w-full bg-aurum transition-all duration-700"></div>
        </Link>
        <p className="hidden md:block font-grotesk text-[8px] uppercase tracking-[0.5em] text-white/20 mt-4">
          © MMXXIV OBSIDIAN STAGE
        </p>
      </div>
    </footer>
  );
}
