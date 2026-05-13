export default function InfoCard({ title, desc, year, category, highlight }) {
  return (
    <article className="rounded-[24px] border border-[#d7dee8] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {category ? (
        <p className="text-xs font-semibold tracking-[0.22em] text-[#6c7a89]">
          {category}
        </p>
      ) : null}

      <h3 className="mt-2 text-xl font-bold text-[#153a64]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#5b6878]">{desc}</p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-xs font-semibold text-[#153a64]">
          आरंभ: {year}
        </span>
        {highlight ? (
          <span className="text-xs font-medium text-[#d97706]">{highlight}</span>
        ) : null}
      </div>
    </article>
  );
}
