import { useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import MicButton from "./MicButton";

export default function VoiceMic({ onSpeech }) {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const lastSubmittedRef = useRef("");

  const startListening = () => {
    resetTranscript();
    lastSubmittedRef.current = "";

    SpeechRecognition.startListening({
      continuous: false,
      language: "hi-IN",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    const cleanedTranscript = transcript.trim();

    if (
      !listening &&
      cleanedTranscript !== "" &&
      cleanedTranscript !== lastSubmittedRef.current
    ) {
      lastSubmittedRef.current = cleanedTranscript;
      onSpeech(cleanedTranscript);
      resetTranscript();
    }
  }, [listening, onSpeech, resetTranscript, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="rounded-2xl border border-[#f5c2c7] bg-[#fff4f4] p-4 text-sm text-[#8b1e2d]">
        इस ब्राउज़र में वॉइस पहचान उपलब्ध नहीं है। कृपया नीचे दिए गए बॉक्स से उत्तर लिखें।
      </div>
    );
  }

  return (
    <div className="text-center">
      <MicButton start={startListening} stop={stopListening} listening={listening} />

      <p className="mt-4 text-base text-[#5b6878]">
        {listening
          ? `आप बोल रहे हैं: ${transcript || "कृपया बोलें"}`
          : "माइक दबाकर हिंदी में उत्तर दीजिए"}
      </p>
    </div>
  );
}
