export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#090909]">
      <div className="relative text-center">
        <div className="absolute inset-x-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,151,91,0.16),transparent_65%)] blur-3xl" />
        <div className="relative">
          <p className="font-ui text-[0.64rem] uppercase tracking-[0.44em] text-gold/80">
            Blue Lotus Experience
          </p>
          <p className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.3rem)] leading-[0.95] tracking-[-0.025em] text-text">
            Come home to yourself.
          </p>
          <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center">
            <div className="relative h-20 w-20">
              <span className="absolute inset-0 rounded-full border border-white/10" />
              <span className="absolute inset-3 rounded-full border border-[rgba(185,151,91,0.55)]" />
              <span className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(185,151,91,0.8),rgba(185,151,91,0.14)_70%,transparent_72%)] opacity-80 animate-[rise_1800ms_ease-in-out_infinite] [animation-direction:alternate]" />
            </div>
          </div>
          <div className="mx-auto mt-4 h-px w-48 overflow-hidden bg-white/10">
            <div className="h-full w-1/2 animate-[loading_1.8s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(185,151,91,0.85),transparent)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
