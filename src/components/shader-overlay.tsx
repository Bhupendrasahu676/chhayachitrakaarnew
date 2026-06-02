export function ShaderOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="atmosphere-haze absolute inset-0 opacity-80" />
      <div className="film-grain absolute inset-0 opacity-[0.12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(219,185,128,0.12),transparent_35%),radial-gradient(circle_at_85%_70%,rgba(84,64,46,0.09),transparent_34%)]" />
    </div>
  );
}
