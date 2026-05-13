import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import dashboardVisualImage from "../assets/dashboard-visual.svg";
import farmerFamilyImage from "../assets/farmer-family.svg";
import womenSupportImage from "../assets/women-support.svg";
import IndiaMapCard from "../components/IndiaMapCard";
import { dashboardVisuals } from "../data/portalContent";
import { getDashboardData } from "../services/dashboardApi";

const chartColors = ["#1d4ed8", "#f97316", "#0f766e", "#9333ea", "#f59e0b", "#dc2626"];

const dashboardNotes = [
  "यहां से पता चलता है कि लोग सबसे ज्यादा किस तरह की योजना देख रहे हैं।",
  "महीने के हिसाब से बदलाव देखने पर यह समझ आता है कि किस योजना में रुचि बढ़ रही है।",
  "राज्य के हिसाब से डेटा देखने पर अलग-अलग जगह की जरूरत साफ दिखती है।",
];

const dashboardFaqs = [
  {
    title: "यह भाग किस काम आता है?",
    text: "यह भाग बताता है कि लोग क्या खोज रहे हैं, किस योजना को ज्यादा देख रहे हैं और किस राज्य में किस तरह की मदद की मांग दिख रही है।",
  },
  {
    title: "राज्य की जानकारी क्यों जरूरी है?",
    text: "हर राज्य में लोगों की हालत और जरूरत अलग हो सकती है, इसलिए यह देखना जरूरी है कि कहां कौन-सी योजना ज्यादा काम की है।",
  },
  {
    title: "ग्राफ क्यों दिखाए गए हैं?",
    text: "ग्राफ से यह जल्दी समझ आता है कि किस योजना में रुचि बढ़ रही है और किसमें कम है।",
  },
];

const dashboardHeroStats = [
  { label: "यह क्या दिखाता है", value: "खोज, योजना और राज्य" },
  { label: "यह क्यों जरूरी है", value: "जरूरत की दिशा समझने के लिए" },
  { label: "इससे क्या मिलता है", value: "जल्दी तुलना और साफ समझ" },
];

const schemeReadingTips = [
  {
    title: "यह गोल चार्ट क्या बताता है",
    text: "लोग सबसे ज्यादा किस तरह की योजनाओं को देख रहे हैं, यह जल्दी समझ आता है।",
  },
  {
    title: "राज्य वाला भाग क्यों रखा है",
    text: "जिस राज्य को चुनेंगे, वहां की सबसे ज्यादा देखी गई योजना और खोज तुरंत सामने आ जाएगी।",
  },
];

const heroSideCards = [
  {
    title: "यह क्या समझाता है",
    text: "यह भाग साफ दिखाता है कि लोग किस तरह की मदद, किस योजना और किस राज्य की तरफ ज्यादा जा रहे हैं।",
    image: dashboardVisualImage,
  },
];

const comparisonCards = [
  {
    title: "तुलना से क्या समझ आता है",
    text: "जब योजनाओं को साथ में देखते हैं, तब यह साफ दिखता है कि लोग किस योजना पर ज्यादा जा रहे हैं।",
  },
  {
    title: "यह भाग क्यों जरूरी है",
    text: "सिर्फ योजना का नाम काफी नहीं होता। तुलना से पता चलता है कि किस योजना की पकड़ मजबूत है।",
  },
];

const comparisonLeftCards = [
  {
    title: "खोज स्कोर क्या बताता है",
    text: "यह दिखाता है कि लोग किस योजना का नाम ज्यादा खोज रहे हैं। इससे लोगों की तुरंत जरूरत समझ आती है।",
  },
  {
    title: "संतुष्टि क्यों देखी गई है",
    text: "अगर किसी योजना को लोग बार-बार देखते हैं और उसे उपयोगी मानते हैं, तो उसकी पकड़ मजबूत मानी जा सकती है।",
  },
  {
    title: "लाभार्थी स्कोर क्यों जरूरी है",
    text: "इससे पता चलता है कि कौन-सी योजना ज्यादा लोगों तक पहुंच रही है और किसकी पहुंच कम है।",
  },
  {
    title: "तुलना से क्या फायदा है",
    text: "तुलना देखने से यह समझना आसान हो जाता है कि किस योजना पर अभी ज्यादा ध्यान है और किस पर कम।",
  },
];

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState("up");

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const data = await getDashboardData();
      if (mounted) {
        setDashboardData(data);
      }
    };

    loadData();
    const timer = setInterval(loadData, 60000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const activeState = useMemo(() => {
    return (
      dashboardData?.stateData?.find((state) => state.id === selectedStateId) ||
      dashboardData?.stateData?.[0]
    );
  }, [dashboardData, selectedStateId]);

  if (!dashboardData) {
    return (
      <div className="px-4 py-10 md:px-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#d7dee8] bg-white p-8 text-center shadow-sm">
          डैशबोर्ड लोड हो रहा है...
        </div>
      </div>
    );
  }

  return (
    <div className="page-fade px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="section-rise hero-shell overflow-hidden rounded-[36px] border border-[#d7dee8] px-6 py-10 shadow-sm md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-[#bfd3ea] bg-white/80 px-5 py-2 text-sm font-semibold text-[#153a64] backdrop-blur">
                योजना, खोज और राज्य की झलक
              </div>
              <h1 className="mt-6 text-4xl font-bold text-[#153a64] md:text-5xl">
                एक नज़र में समझ आए कि लोग किस योजना की तरफ जा रहे हैं
              </h1>
              <p className="mt-5 text-lg leading-9 text-[#516274]">
                यह भाग सिर्फ आंकड़े दिखाने के लिए नहीं है। यह समझाने के लिए है कि लोग क्या खोज रहे हैं,
                किस योजना को ज्यादा देख रहे हैं, और किस राज्य में किस तरह की मदद की मांग ज्यादा दिख रही है।
                इससे योजना की हालत, लोगों की रुचि और जरूरत की दिशा जल्दी समझ आती है।
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {dashboardVisuals.map((item, index) => (
                  <div key={item.title} className={`glass-card rounded-[24px] p-5 shadow-sm stagger-${index + 1}`}>
                    <p className="text-lg font-semibold text-[#153a64]">{item.title}</p>
                    <p className="mt-2 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {dashboardHeroStats.map((item, index) => (
                  <div key={item.label} className={`soft-panel rounded-[22px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <p className="text-sm font-semibold text-[#5b6878]">{item.label}</p>
                    <p className="mt-3 text-lg font-bold text-[#153a64]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid items-stretch gap-4 md:grid-cols-2">
              {dashboardVisuals.map((item, index) => (
                <article
                  key={item.title}
                  className={`image-feature-card flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-lg ${index === 0 ? "md:col-span-2" : ""}`}
                >
                  <div className={`image-wrap ${index === 0 ? "h-56 md:h-64" : "h-52"} bg-[#eef5ff]`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`h-full w-full ${index === 0 ? "object-cover" : "object-contain"}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-2xl font-bold text-[#153a64]">{item.title}</h2>
                    <p className="mt-3 flex-1 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                </article>
              ))}

              {heroSideCards.map((item, index) => (
                <article
                  key={item.title}
                  className={`image-feature-card flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-lg stagger-${(index % 3) + 1}`}
                >
                  <div className="image-wrap h-52 bg-[#eef5ff]">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-2xl font-bold text-[#153a64]">{item.title}</h3>
                    <p className="mt-3 flex-1 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-rise grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardData.stats.map((item, index) => (
            <div key={item.label} className={`shine-panel rounded-[24px] border border-[#d7dee8] p-7 shadow-sm stagger-${(index % 3) + 1}`}>
              <p className="text-base font-semibold text-[#5b6878]">{item.label}</p>
              <h2 className="mt-3 text-4xl font-bold text-[#153a64]">{item.value}</h2>
            </div>
          ))}
        </section>

        <section className="section-rise rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-3">
            {dashboardNotes.map((item, index) => (
              <div key={item} className={`glass-card rounded-[24px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                <p className="text-base leading-8 text-[#5b6878]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-rise grid gap-6 xl:grid-cols-2">
          <div className="rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#153a64]">योजना के प्रकार</h2>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="schemes" fill="#1d4ed8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#153a64]">महीने के हिसाब से लोग</h2>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" name="उपयोगकर्ता" stroke="#0f766e" strokeWidth={3} />
                  <Line type="monotone" dataKey="searches" name="खोज" stroke="#f97316" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="section-rise rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[#153a64]">मुख्य योजनाओं की महीने की चाल</h2>
          <p className="mt-3 text-base leading-8 text-[#5b6878]">
            यहां प्रमुख योजनाओं की महीनेवार पहुंच और उपयोग रुचि को विस्तार से दिखाया गया है।
          </p>
          <div className="mt-6 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.schemeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="पीएम किसान" stroke="#1d4ed8" strokeWidth={3} />
                <Line type="monotone" dataKey="आयुष्मान भारत" stroke="#f97316" strokeWidth={3} />
                <Line type="monotone" dataKey="आवास योजना" stroke="#0f766e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="section-rise">
          <IndiaMapCard
            stateData={dashboardData.stateData}
            selectedStateId={selectedStateId}
            onSelectState={setSelectedStateId}
          />
        </section>

        <section className="section-rise rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="soft-panel rounded-[24px] p-5 shadow-sm">
              <h3 className="text-xl font-bold text-[#153a64]">राज्य की तुलना</h3>
              <p className="mt-3 text-base leading-8 text-[#5b6878]">
                हर राज्य में अलग योजना ज्यादा लोकप्रिय हो सकती है, इसलिए स्थानीय झलक जरूरी है।
              </p>
            </div>
            <div className="soft-panel rounded-[24px] p-5 shadow-sm">
              <h3 className="text-xl font-bold text-[#153a64]">ज्यादा खोजे गए शब्द</h3>
              <p className="mt-3 text-base leading-8 text-[#5b6878]">
                कौन-से शब्द सबसे ज्यादा खोजे जा रहे हैं, इससे नागरिकों की मौजूदा जरूरत समझ आती है।
              </p>
            </div>
            <div className="soft-panel rounded-[24px] p-5 shadow-sm">
              <h3 className="text-xl font-bold text-[#153a64]">मुख्य योजना झलक</h3>
              <p className="mt-3 text-base leading-8 text-[#5b6878]">
                डैशबोर्ड उपयोगकर्ता को यह देखने देता है कि किस योजना में अधिक रुचि बनी हुई है।
              </p>
            </div>
          </div>
        </section>

        <section className="section-rise grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#153a64]">लोकप्रिय खोजें</h2>
            <div className="mt-5 space-y-3">
              {dashboardData.popularSearches.map((item, index) => (
                <div key={item.term} className={`soft-panel flex items-center justify-between rounded-2xl px-5 py-5 stagger-${(index % 3) + 1}`}>
                  <div>
                    <p className="text-lg font-semibold text-[#153a64]">{index + 1}. {item.term}</p>
                    <p className="text-base text-[#5b6878]">कुल खोज</p>
                  </div>
                  <p className="text-lg font-bold text-[#1d4ed8]">{item.count}</p>
                </div>
              ))}
            </div>

            <div className="soft-panel mt-8 rounded-[24px] p-5">
              <h3 className="text-xl font-bold text-[#153a64]">वॉइस सहायक झलक</h3>
              <div className="mt-4 space-y-3">
                {dashboardData.queries.map((item, index) => (
                  <div key={item.label} className={`rounded-2xl bg-white p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <p className="text-base text-[#5b6878]">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-[#153a64]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#153a64]">ज्यादा देखी गई योजनाएं</h2>
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="mt-6 space-y-4">
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardData.categoryData}
                        dataKey="schemes"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={95}
                        paddingAngle={3}
                      >
                        {dashboardData.categoryData.map((entry, index) => (
                          <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid gap-3">
                  {schemeReadingTips.map((item, index) => (
                    <div key={item.title} className={`glass-card rounded-[20px] p-4 shadow-sm stagger-${(index % 3) + 1}`}>
                      <h3 className="text-base font-bold text-[#153a64]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#5b6878]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {dashboardData.topSchemes.map((scheme, index) => (
                  <div key={scheme.name} className={`soft-panel rounded-2xl border border-[#e2e8f0] p-5 stagger-${(index % 3) + 1}`}>
                    <p className="text-lg font-semibold text-[#153a64]">{scheme.name}</p>
                    <p className="mt-2 text-base text-[#5b6878]">श्रेणी: {scheme.category}</p>
                    <p className="mt-1 text-base text-[#5b6878]">दृश्य संख्या: {scheme.views}</p>
                  </div>
                ))}
              </div>
            </div>

            {activeState ? (
              <div className="mt-6 rounded-[24px] bg-[#153a64] p-6 text-white">
                <h3 className="text-2xl font-bold">{activeState.name}</h3>
                <p className="mt-3 text-base leading-8 text-[#dce7f2]">
                  इस राज्य में अभी सबसे लोकप्रिय योजना <strong>{activeState.scheme}</strong> है और
                  सबसे ज्यादा खोज <strong>{activeState.search}</strong> से जुड़ी दिख रही है।
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="section-rise rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#153a64]">योजना की आसान तुलना</h2>
              <div className="mt-6 h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.schemeBreakdown} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fill: "#475569", fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" width={170} tick={{ fill: "#475569", fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="beneficiaries" name="लाभार्थी स्कोर" fill="#1d4ed8" radius={[0, 8, 8, 0]} />
                    <Bar dataKey="searches" name="खोज रुचि" fill="#f97316" radius={[0, 8, 8, 0]} />
                    <Bar dataKey="satisfaction" name="संतुष्टि" fill="#0f766e" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {comparisonLeftCards.map((item, index) => (
                  <div key={item.title} className={`glass-card rounded-[22px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <h3 className="text-lg font-bold text-[#153a64]">{item.title}</h3>
                    <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                ))}
              </div>

              <article className="image-feature-card mt-4 overflow-hidden rounded-[24px] border border-[#d7dee8] bg-white shadow-sm">
                <div className="image-wrap h-40">
                  <img src={farmerFamilyImage} alt="योजना तुलना" className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#153a64]">तुलना देखकर सही दिशा मिलती है</h3>
                  <p className="mt-3 text-base leading-8 text-[#5b6878]">
                    जब योजना, खोज और पहुंच को साथ में देखा जाता है, तब यह समझना आसान हो जाता है कि किस योजना पर लोगों का भरोसा और ध्यान ज्यादा है।
                  </p>
                </div>
              </article>
            </div>

            <div className="grid gap-5">
              <article className="image-feature-card overflow-hidden rounded-[28px] border border-[#d7dee8] bg-white shadow-sm">
                <div className="image-wrap h-64">
                  <img src={dashboardVisualImage} alt="योजना डैशबोर्ड" className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#153a64]">आंकड़े देखकर जल्दी समझ आए</h3>
                  <p className="mt-4 text-base leading-8 text-[#5b6878]">
                    इस भाग से यह समझ आता है कि कौन-सी योजनाएं लोगों का ध्यान खींच रही हैं,
                    किन राज्यों में कौन-सी योजना ज्यादा चल रही है और किस तरह की मदद की मांग बढ़ रही है।
                  </p>
                </div>
              </article>

              <article className="image-feature-card overflow-hidden rounded-[28px] border border-[#d7dee8] bg-white shadow-sm">
                <div className="image-wrap h-56">
                  <img src={womenSupportImage} alt="नागरिक सहायता" className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#153a64]">राज्य, लोग और योजना एक साथ</h3>
                  <p className="mt-4 text-base leading-8 text-[#5b6878]">
                    यहां यह बात साफ होती है कि अलग-अलग जगह पर लोगों की जरूरत एक जैसी नहीं होती।
                    इसी वजह से राज्य के हिसाब से योजना देखना जरूरी है।
                  </p>
                </div>
              </article>

              <div className="grid gap-4">
                {comparisonCards.map((item, index) => (
                  <div key={item.title} className={`soft-panel rounded-[22px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <h3 className="text-lg font-bold text-[#153a64]">{item.title}</h3>
                    <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rise rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-[#153a64]">डैशबोर्ड की आसान बातें</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {dashboardFaqs.map((item, index) => (
              <div key={item.title} className={`glass-card rounded-[24px] p-6 shadow-sm stagger-${(index % 3) + 1}`}>
                <h3 className="text-xl font-bold text-[#153a64]">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

