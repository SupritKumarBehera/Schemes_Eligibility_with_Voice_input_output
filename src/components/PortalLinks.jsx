import { govtPortals } from "../data/portalContent";

export default function PortalLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {govtPortals.map((portal) => (
        <a
          key={portal.title}
          href={portal.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-[#d7dee8] bg-white px-4 py-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <img
            src={portal.image}
            alt={portal.title}
            className="h-12 w-12 rounded-full border border-[#e8eef6] bg-[#f8fafc] p-2"
          />
          <div>
            <p className="text-sm font-semibold text-[#153a64]">{portal.title}</p>
            <p className="text-xs text-[#5b6878]">{portal.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
