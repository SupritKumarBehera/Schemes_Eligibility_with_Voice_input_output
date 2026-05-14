import { useEffect, useRef, useState } from "react";

function PlayButton({ text }) {
  const [playing, setPlaying] = useState(false);
  const utteranceRef = useRef(null);

  const handleClick = () => {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Use a Hindi voice if the browser has one
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN" || v.lang.startsWith("hi"));
    if (hindiVoice) utterance.voice = hindiVoice;

    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Cancel speech if the bubble unmounts mid-playback
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <button
      onClick={handleClick}
      title={playing ? "रोकें" : "सुनें"}
      aria-label={playing ? "रोकें" : "सुनें"}
      className="ml-2 mt-1 flex-shrink-0 self-end rounded-full p-1.5 text-[#153a64] transition-colors hover:bg-[#dde6f0]"
    >
      {playing ? (
        // Stop icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <rect x="4" y="4" width="12" height="12" rx="2" />
        </svg>
      ) : (
        // Play icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M6.3 3.8a1 1 0 0 0-1.3.96v10.48a1 1 0 0 0 1.3.96l10-5.24a1 1 0 0 0 0-1.92l-10-5.24z" />
        </svg>
      )}
    </button>
  );
}

export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`mb-4 flex items-end ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[84%] items-end rounded-[24px] px-5 py-4 text-base leading-8 shadow-sm ${
          isUser
            ? "bg-[#153a64] text-white"
            : "border border-[#dde6f0] bg-[#f8fbff] text-[#153a64]"
        }`}
        style={{ whiteSpace: "pre-line" }}
      >
        <span className="flex-1">{text}</span>
        {!isUser && <PlayButton text={text} />}
      </div>
    </div>
  );
}