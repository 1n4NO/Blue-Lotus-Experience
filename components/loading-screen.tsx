export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#090909]">
      <div className="text-center">
        <p className="font-ui text-[0.64rem] uppercase tracking-[0.44em] text-gold/80">
          Blue Lotus Experience
        </p>
        <p className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.3rem)] leading-[0.95] tracking-[-0.025em] text-text">
          Come home to yourself.
        </p>
        <div className="mx-auto mt-8 h-px w-48 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-[loading_1.8s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(185,151,91,0.85),transparent)]" />
        </div>
      </div>
    </div>
  );
}
