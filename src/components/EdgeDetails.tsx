export default function EdgeDetails() {
  return (
    <>
      <div className="fixed top-1/2 left-6 -translate-y-1/2 flex flex-col gap-24 items-center opacity-20 z-20 pointer-events-none">
        <span className="font-grotesk text-[8px] -rotate-90 origin-center tracking-[0.5em] uppercase whitespace-nowrap">
          latitude.30.15
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-quicksilver to-transparent"></div>
        <span className="font-grotesk text-[8px] -rotate-90 origin-center tracking-[0.5em] uppercase whitespace-nowrap">
          longitude.71.52
        </span>
      </div>

      <div className="fixed top-1/2 right-6 -translate-y-1/2 flex flex-col gap-8 items-center opacity-40 z-20 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-aurum"></div>
        <div className="w-1 h-1 rounded-full bg-quicksilver/20"></div>
        <div className="w-1 h-1 rounded-full bg-quicksilver/20"></div>
      </div>
    </>
  );
}
