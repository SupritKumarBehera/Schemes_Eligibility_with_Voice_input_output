import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function IndiaMapCard({
  stateData,
  selectedStateId,
  onSelectState,
}) {
  const activeState =
    stateData.find((state) => state.id === selectedStateId) || stateData[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-[#153a64]">भारत मानचित्र</h3>
        <p className="mt-3 text-base leading-8 text-[#5b6878]">
          किसी राज्य पर क्लिक करें और वहां की लोकप्रिय योजना, खोज और उपयोगकर्ता गतिविधि देखें।
        </p>

        <div className="mt-6 rounded-[24px] border border-[#e4ebf3] bg-[#f8fbff] p-4">
          <svg
            viewBox="0 0 100 100"
            className="mx-auto h-[380px] w-full max-w-[440px]"
            aria-label="भारत का इंटरैक्टिव मानचित्र"
          >
            <path
              d="M28 12 L42 8 L58 10 L67 18 L74 21 L80 30 L76 38 L81 45 L77 54 L71 57 L68 68 L60 80 L56 89 L47 83 L41 71 L34 66 L30 57 L23 53 L22 45 L18 36 L22 28 L24 20 Z"
              fill="#dbeafe"
              stroke="#1d4ed8"
              strokeWidth="1.2"
            />
            {stateData.map((state) => {
              const isActive = activeState.id === state.id;
              return (
                <g
                  key={state.id}
                  onClick={() => onSelectState(state.id)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={state.x}
                    cy={state.y}
                    r={isActive ? "3" : "2.2"}
                    fill={isActive ? "#f97316" : "#153a64"}
                  />
                  <rect
                    x={state.x + 3}
                    y={state.y - 7}
                    width="18"
                    height="8"
                    rx="3"
                    fill={isActive ? "#f97316" : "#ffffff"}
                    stroke={isActive ? "#c2410c" : "#94a3b8"}
                  />
                  <text
                    x={state.x + 12}
                    y={state.y - 1.8}
                    textAnchor="middle"
                    fontSize="3"
                    fontWeight="700"
                    fill={isActive ? "#ffffff" : "#153a64"}
                  >
                    {state.short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-[#153a64]">{activeState.name}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#f8fbff] p-4">
            <p className="text-sm font-semibold text-[#6c7a89]">लोकप्रिय योजना</p>
            <p className="mt-2 text-base font-bold text-[#153a64]">
              {activeState.scheme}
            </p>
          </div>
          <div className="rounded-2xl bg-[#f8fbff] p-4">
            <p className="text-sm font-semibold text-[#6c7a89]">सबसे ज्यादा खोज</p>
            <p className="mt-2 text-base font-bold text-[#153a64]">
              {activeState.search}
            </p>
          </div>
          <div className="rounded-2xl bg-[#f8fbff] p-4 sm:col-span-2">
            <p className="text-sm font-semibold text-[#6c7a89]">अनुमानित उपयोगकर्ता</p>
            <p className="mt-2 text-2xl font-bold text-[#153a64]">
              {activeState.users}
            </p>
          </div>
        </div>

        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeState.chart}>
              <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12 }} />
              <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#1d4ed8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
