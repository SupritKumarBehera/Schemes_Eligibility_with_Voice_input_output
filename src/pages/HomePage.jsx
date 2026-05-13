import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import farmerFamilyImage from "../assets/farmer-family.svg";
import InfoCard from "../components/InfoCard";
import {
  citizenGroups,
  featuredSchemes,
  homeSections,
  impactHighlights,
} from "../data/portalContent";

const categories = [
  { icon: "🌾", label: "किसान" },
  { icon: "👩", label: "महिला" },
  { icon: "🎓", label: "छात्र" },
  { icon: "🏥", label: "स्वास्थ्य" },
  { icon: "🏠", label: "आवास" },
  { icon: "👧", label: "बालिका" },
];

const timeline = [
  { year: "2015", text: "बेटी बचाओ बेटी पढ़ाओ और प्रधानमंत्री आवास योजना जैसी पहलों ने सामाजिक और आवास सहायता को मजबूत किया।" },
  { year: "2016", text: "छात्रवृत्ति और शिक्षा सहायता योजनाओं ने विद्यार्थियों को पढ़ाई जारी रखने में मदद दी।" },
  { year: "2018", text: "आयुष्मान भारत जैसी स्वास्थ्य योजनाओं ने कमजोर परिवारों को इलाज में सहारा दिया।" },
  { year: "2019", text: "पीएम किसान सम्मान निधि के माध्यम से किसानों को सीधे आर्थिक सहयोग मिला।" },
];

const homePointers = [
  {
    title: "पहले क्या रखें",
    text: "उम्र, कमाई, वर्ग, परिवार की हालत और बैंक खाते की जानकारी पास रखें। इससे सही योजना ढूंढना आसान होगा।",
  },
  {
    title: "किसके काम आता है",
    text: "यह पेज किसान, महिला, छात्र, बुजुर्ग, इलाज चाहने वाले परिवार और घर की मदद ढूंढने वाले लोगों के काम आता है।",
  },
  {
    title: "इससे क्या फायदा है",
    text: "यहां योजना का नाम, काम, किसके लिए है और आगे कहां जाना है, यह बात जल्दी समझ आती है।",
  },
];

const serviceHighlights = [
  "सरकारी योजनाओं की आसान भाषा में जानकारी",
  "अपनी हालत बताकर वॉइस सहायक से मदद",
  "कौन-सी योजना ज्यादा देखी जा रही है, इसकी झलक",
  "सरकारी पोर्टल तक सीधे जाने का रास्ता",
];

const homeFaqs = [
  {
    title: "क्या यह पोर्टल सीधे योजना देता है?",
    text: "नहीं। यह पोर्टल आपको सही योजना तक पहुंचने में मदद करता है। आगे का फॉर्म या काम सरकारी साइट पर होता है।",
  },
  {
    title: "क्या कम पढ़े-लिखे लोग इसे उपयोग कर सकते हैं?",
    text: "हाँ। भाषा आसान रखी गई है और बोलकर जवाब देने का तरीका भी दिया गया है।",
  },
  {
    title: "किसके लिए सबसे अधिक उपयोगी?",
    text: "उन लोगों के लिए जो जल्दी यह जानना चाहते हैं कि कौन-सी योजना उनके घर, इलाज, पढ़ाई या खेती के काम आ सकती है।",
  },
];

const schemeSummary = [
  {
    title: "किसान सहायता",
    text: "खेती, फसल, बीज और सीधे पैसे की मदद वाली योजनाएं किसान परिवारों के लिए सबसे ज्यादा काम की होती हैं।",
  },
  {
    title: "स्वास्थ्य सुरक्षा",
    text: "इलाज, अस्पताल और स्वास्थ्य खर्च में मदद देने वाली योजनाएं कम पैसे वाले परिवारों के लिए राहत देती हैं।",
  },
  {
    title: "आवास और शिक्षा",
    text: "पक्का घर, पढ़ाई और बेटियों की बचत से जुड़ी योजनाएं घर की लंबी जरूरतों में मदद करती हैं।",
  },
];

const assistantPromptPoints = [
  "अगर आपको अपनी उम्र, कमाई और वर्ग पता है, तो सहायक जल्दी ठीक योजना बता सकता है।",
  "सहायक एक-एक करके सवाल पूछता है, इसलिए जवाब देना आसान रहता है।",
];

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredSchemes = useMemo(() => {
    if (!query.trim()) {
      return featuredSchemes;
    }

    return featuredSchemes.filter((scheme) =>
      `${scheme.name} ${scheme.category} ${scheme.desc}`.includes(query)
    );
  }, [query]);

  return (
    <div className="page-fade px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="section-rise hero-shell overflow-hidden rounded-[36px] border border-[#d7dee8] px-6 py-12 shadow-sm md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-[#bfd3ea] bg-white/80 px-5 py-2 text-sm font-semibold text-[#153a64] backdrop-blur">
                सरल हिंदी में सरकारी योजनाओं की जानकारी
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-[#153a64] md:text-5xl">
                सही योजना तक पहुंच अब और आसान
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-[#516274]">
                यह पोर्टल किसानों, महिलाओं, बच्चों, छात्रों और जरूरतमंद परिवारों को सरकारी
                योजनाओं की जानकारी आसान हिंदी में देता है। यहां आप योजनाओं को समझ सकते हैं,
                वॉइस सहायक से बात कर सकते हैं और डैशबोर्ड से राज्यवार झलक देख सकते हैं।
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/assistant"
                  className="rounded-full bg-[#153a64] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0f2a45]"
                >
                  वॉइस सहायक शुरू करें
                </Link>
                <Link
                  to="/dashboard"
                  className="rounded-full border border-[#c8d6e5] bg-white/85 px-7 py-4 text-base font-semibold text-[#153a64] transition hover:bg-[#e8f2ff]"
                >
                  डैशबोर्ड देखें
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {homeSections.map((item, index) => (
                  <div key={item.title} className={`glass-card rounded-[24px] p-5 shadow-sm stagger-${index + 1}`}>
                    <p className="text-lg font-semibold text-[#153a64]">{item.title}</p>
                    <p className="mt-2 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {citizenGroups.map((item, index) => (
                <article
                  key={item.title}
                  className={`image-feature-card overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-lg ${index === 0 ? "md:col-span-2" : ""}`}
                >
                  <div className="image-wrap h-52 md:h-60">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h2 className="text-2xl font-bold text-[#153a64]">{item.title}</h2>
                    <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#153a64]">सरकारी मदद का असर</h2>
              <p className="mt-4 text-lg leading-9 text-[#5b6878]">
                देशभर में कृषि, स्वास्थ्य, शिक्षा, महिला सशक्तिकरण और आवास जैसी योजनाओं ने
                लाखों परिवारों तक पहुंच बनाई है। यह मंच उन्हीं जरूरतों को सरल रूप में सामने लाने का प्रयास करता है।
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {impactHighlights.map((item, index) => (
                <div key={item.title} className={`shine-panel rounded-[24px] p-6 shadow-sm stagger-${index + 1}`}>
                  <p className="text-3xl font-bold text-[#153a64]">{item.value}</p>
                  <p className="mt-3 text-lg font-semibold text-[#153a64]">{item.title}</p>
                  <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <div>
            <h2 className="text-3xl font-bold text-[#153a64]">योजना श्रेणियां</h2>
            <p className="mt-3 text-lg leading-9 text-[#5b6878]">
              नीचे दी गई श्रेणियों से आप जल्दी समझ सकते हैं कि कौन-सी योजना किस प्रकार की जरूरत से जुड़ी है।
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {categories.map((item, index) => (
              <div
                key={item.label}
                className={`soft-panel rounded-[24px] border border-[#dde6f0] p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md stagger-${(index % 3) + 1}`}
              >
                <div className="text-5xl">{item.icon}</div>
                <p className="mt-4 text-lg font-semibold text-[#153a64]">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold text-[#153a64]">यह पोर्टल कैसे मदद करता है</h2>
              <p className="mt-4 text-lg leading-9 text-[#5b6878]">
                बहुत लोगों को यह पता नहीं होता कि कौन-सी योजना उनके लिए है, क्या देखना है और आगे कहां जाना है।
                यह पेज उसी बात को आसान तरीके से समझाता है।
              </p>
              <div className="mt-6 grid gap-4">
                {homePointers.map((item, index) => (
                  <div key={item.title} className={`glass-card rounded-[24px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <h3 className="text-xl font-bold text-[#153a64]">{item.title}</h3>
                    <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-panel rounded-[28px] border border-[#d7dee8] p-6 shadow-sm">
              <h2 className="text-3xl font-bold text-[#153a64]">मुख्य सुविधाएं</h2>
              <div className="mt-6 grid gap-4">
                {serviceHighlights.map((item, index) => (
                  <div key={item} className={`rounded-[22px] bg-white px-5 py-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <p className="text-base leading-8 text-[#5b6878]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#153a64]">योजनाओं की झलक</h2>
              <p className="mt-4 text-lg leading-9 text-[#5b6878]">
                समय के साथ कई योजनाओं ने किसानों, महिलाओं, छात्रों, स्वास्थ्य और आवास जैसे क्षेत्रों में सहायता दी है।
              </p>

              <div className="mt-6 space-y-4">
                {timeline.map((item, index) => (
                  <div key={item.year} className={`soft-panel flex gap-4 rounded-[24px] border border-[#e3ebf3] p-5 stagger-${(index % 3) + 1}`}>
                    <div className="min-w-[68px] rounded-full bg-[#153a64] px-3 py-2 text-center text-sm font-bold text-white">
                      {item.year}
                    </div>
                    <p className="text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {schemeSummary.map((item, index) => (
                  <div key={item.title} className={`glass-card rounded-[22px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <h3 className="text-lg font-bold text-[#153a64]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5b6878]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="soft-panel rounded-[24px] border border-[#d7dee8] p-6 shadow-sm">
                <label className="text-lg font-semibold text-[#153a64]">योजना खोजें</label>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="उदाहरण: किसान, स्वास्थ्य, छात्र"
                  className="mt-4 w-full rounded-full border border-[#c9d8e7] px-5 py-4 text-lg text-[#153a64] outline-none focus:border-[#1d4ed8]"
                />
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {filteredSchemes.map((scheme) => (
                  <InfoCard
                    key={scheme.name}
                    title={scheme.name}
                    desc={scheme.desc}
                    year={scheme.year}
                    category={scheme.category}
                    highlight={scheme.highlight}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <div className="rounded-[28px] bg-[#153a64] p-7 text-white shadow-sm">
                <h2 className="text-3xl font-bold">समझ नहीं आ रहा? सहायक से पूछें</h2>
                <p className="mt-4 max-w-3xl text-lg leading-9 text-[#d7e4ef]">
                  अगर आपको समझ नहीं आ रहा कि कौन-सी योजना आपके काम की हो सकती है, तो सहायक से बात करें।
                  वह आपके जवाब लेकर आपके लिए ठीक योजनाएं दिखाएगा।
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {assistantPromptPoints.map((item, index) => (
                  <div key={item} className={`soft-panel rounded-[22px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <p className="text-base leading-8 text-[#5b6878]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="image-feature-card overflow-hidden rounded-[28px] border border-[#d7dee8] bg-white shadow-sm">
              <div className="image-wrap h-64">
                <img src={farmerFamilyImage} alt="सरकारी योजना सहायता" className="h-full w-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <p className="text-base leading-8 text-[#5b6878]">
                  एक साफ, सरल और भरोसेमंद अनुभव जहां उपयोगकर्ता बोलकर भी जानकारी ले सकता है।
                </p>
                <Link
                  to="/assistant"
                  className="mt-5 inline-flex rounded-full bg-[#1d4ed8] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#153a64]"
                >
                  अभी शुरू करें
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <h2 className="text-3xl font-bold text-[#153a64]">आम सवाल</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {homeFaqs.map((item, index) => (
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

