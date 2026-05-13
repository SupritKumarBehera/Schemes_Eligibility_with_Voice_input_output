export default function MicButton({ start, stop, listening }) {
  const handleClick = () => {
    if (listening) {
      stop();
      return;
    }

    start();
  };

  return (
    <div className="relative inline-block">
      {listening ? <div className="mic-wave" /> : null}

      <button
        onClick={handleClick}
        className={`relative z-10 h-24 w-24 rounded-full text-sm font-bold text-white shadow-lg transition md:h-28 md:w-28 ${
          listening ? "bg-[#dc2626]" : "bg-[#1d4ed8] hover:bg-[#153a64]"
        }`}
      >
        {listening ? "रोकें" : "बोलें"}
      </button>
    </div>
  );
}
