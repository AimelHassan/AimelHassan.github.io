export default function RotatingStars() {
  return (
    <>
      {/* Top Right Star */}
      <div
        className="fixed z-20 pointer-events-none"
        style={{ top: "11rem", right: "11rem" }}
      >
        <div className="animate-slow-rotate text-aurum opacity-60">
          <svg fill="currentColor" height="32" viewBox="0 0 24 24" width="32">
            <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z"></path>
          </svg>
        </div>
      </div>

      {/* Bottom Left Star */}
      <div
        className="fixed z-20 pointer-events-none"
        style={{ bottom: "11rem", left: "11rem" }}
      >
        <div className="animate-slow-rotate text-aurum opacity-60">
          <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
            <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z"></path>
          </svg>
        </div>
      </div>
    </>
  );
}
