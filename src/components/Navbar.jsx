import { NavLink } from "react-router-dom";
import nationalEmblemBlue from "../assets/national-emblem-blue.png";

const navItems = [
  { to: "/", label: "होम" },
  { to: "/assistant", label: "वॉइस सहायक" },
  { to: "/dashboard", label: "डैशबोर्ड" },
  { to: "/about", label: "हमारे बारे में" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d8e1eb] bg-white/95 shadow-sm backdrop-blur">
      <div className="bg-[#153a64] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs md:px-6">
          <p>सरल हिंदी नागरिक सहायता पोर्टल</p>
          <p className="hidden md:block">योजनाएं, वॉइस सहायता और डैशबोर्ड एक ही जगह</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[#dce7f2] bg-[#f8fbff] p-2">
            <img
              src={nationalEmblemBlue}
              alt="भारत का प्रतीक चिह्न"
              className="h-14 w-14 rounded-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#153a64] md:text-2xl">
              राष्ट्रीय वॉइस वेलफेयर पोर्टल
            </h1>
            <p className="text-sm text-[#5b6878]">
              सरकारी योजनाओं की जानकारी, सहायता और राज्यवार झलक
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#153a64] text-white"
                    : "bg-[#f1f6fb] text-[#153a64] hover:bg-[#dbeafe]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
