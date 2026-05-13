export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-[24px] px-5 py-4 text-base leading-8 shadow-sm ${
          isUser
            ? "bg-[#153a64] text-white"
            : "border border-[#dde6f0] bg-[#f8fbff] text-[#153a64]"
        }`}
        style={{ whiteSpace: "pre-line" }}
      >
        {text}
      </div>
    </div>
  );
}
