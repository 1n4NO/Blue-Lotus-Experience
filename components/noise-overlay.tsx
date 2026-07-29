export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 opacity-40 mix-blend-soft-light"
      style={{
        backgroundImage:
          'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.06), transparent 22%), radial-gradient(circle at 80% 0%, rgba(185,151,91,0.08), transparent 18%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.04), transparent 24%)'
      }}
    />
  );
}
