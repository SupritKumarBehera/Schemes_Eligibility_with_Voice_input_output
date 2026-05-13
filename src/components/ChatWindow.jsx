import ChatBubble from "./ChatBubble";

export default function ChatWindow({ messages }) {
  return (
    <div className="mx-auto h-[460px] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-[#dbe4ee] bg-white p-5 shadow-[0_18px_40px_rgba(21,58,100,0.08)] md:p-6">
      {messages.map((message, index) => (
        <ChatBubble key={index} sender={message.sender} text={message.text} />
      ))}
    </div>
  );
}
