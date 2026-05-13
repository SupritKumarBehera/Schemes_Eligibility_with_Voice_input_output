export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-24 text-center">

      <h1 className="text-5xl font-bold mb-6 animate-pulse">
        Voice Enabled Welfare Assistant
      </h1>

      <p className="text-lg max-w-2xl mx-auto mb-8">
        Ask questions about government schemes using voice or chat.
        Our assistant simplifies welfare access for everyone.
      </p>

      <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
        Try Voice Assistant
      </button>

    </section>
  );
}