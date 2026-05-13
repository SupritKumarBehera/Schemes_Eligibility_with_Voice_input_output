import PortalLinks from "./PortalLinks";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#12304f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h3 className="text-xl font-bold">उपयोगी सरकारी पोर्टल</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#d9e4ef]">
          नीचे दिए गए आधिकारिक पोर्टल पर क्लिक करके आप योजनाओं, सेवाओं और सरकारी
          जानकारी तक सीधे पहुंच सकते हैं।
        </p>

        <div className="mt-6">
          <PortalLinks />
        </div>

        <div className="mt-8 border-t border-white/20 pt-6 text-sm text-[#d9e4ef]">
          <p>वॉइस वेलफेयर असिस्टेंट परियोजना © 2026</p>
          <p className="mt-1">सरल, हिंदी आधारित और नागरिक अनुकूल योजना सहायता मंच</p>
        </div>
      </div>
    </footer>
  );
}
