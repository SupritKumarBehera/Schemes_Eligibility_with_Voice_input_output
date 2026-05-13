import { useState } from "react";

export default function PopupGuide() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-80 rounded-[24px] border border-[#d7dee8] bg-white p-5 shadow-xl">
      <h3 className="text-lg font-bold text-[#153a64]">सहायता चाहिए?</h3>
      <p className="mt-2 text-sm leading-7 text-[#5b6878]">
        वॉइस सहायक पेज पर जाकर हिंदी में बात कीजिए और अपनी उपयोगी योजना के बारे में जानिए।
      </p>
      <button
        onClick={() => setShow(false)}
        className="mt-4 rounded-full bg-[#153a64] px-4 py-2 text-sm font-semibold text-white"
      >
        ठीक है
      </button>
    </div>
  );
}
