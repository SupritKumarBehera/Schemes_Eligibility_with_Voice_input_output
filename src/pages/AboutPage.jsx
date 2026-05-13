import {
  aboutGallery,
  aboutMetrics,
  impactHighlights,
} from "../data/portalContent";

const benefits = [
  "लोग बिना कठिन शब्दों के योजना समझ सकते हैं।",
  "बोलकर जवाब देने से कम पढ़े-लिखे लोग भी इसे चला सकते हैं।",
  "डैशबोर्ड से यह समझ आता है कि किस तरह की योजना ज्यादा देखी जा रही है।",
  "सरकारी लिंक होने से आगे का सही रास्ता खोजने में समय कम लगता है।",
];

const usageSteps = [
  "होम पेज पर जाकर योजनाओं की श्रेणियां और मुख्य जानकारी देखें।",
  "वॉइस सहायक पेज पर माइक दबाकर हिंदी में उत्तर दें।",
  "डैशबोर्ड पर लोकप्रिय योजनाएं, खोज और राज्यवार डेटा समझें।",
  "फुटर के सरकारी पोर्टल लिंक पर क्लिक करके आधिकारिक जानकारी तक पहुंचें।",
];

const trustCards = [
  {
    title: "हमारा उद्देश्य",
    text: "सरकारी योजना की कठिन जानकारी को आसान बनाना और लोगों को सही जगह तक पहुंचाना।",
  },
  {
    title: "हमारे स्रोत",
    text: "यहां की जानकारी सरकारी साइटों, सार्वजनिक योजना जानकारी और खुले डेटा से ली गई बातों पर आधारित है।",
  },
  {
    title: "इसकी सीमा",
    text: "यह पेज रास्ता दिखाता है। अंतिम आवेदन, दस्तावेज और मंजूरी सरकारी पोर्टल पर ही होती है।",
  },
];

const projectFocus = [
  "योजना की जानकारी को सीधी और आसान हिंदी में बताना",
  "ऐसे लोगों के लिए मदद देना जिन्हें पढ़ने में दिक्कत होती है",
  "लोग क्या खोज रहे हैं, यह साफ दिखाना",
  "सरकारी पोर्टल तक जाने का आसान रास्ता देना",
];

const citizenNeeds = [
  {
    title: "जानकारी की कमी",
    text: "बहुत लोगों को यह नहीं पता होता कि उनके घर या काम के लिए कौन-सी योजना सही है।",
  },
  {
    title: "भाषा की समस्या",
    text: "सरकारी भाषा कठिन होने पर लोग बात समझ नहीं पाते।",
  },
  {
    title: "सही दिशा की जरूरत",
    text: "लोगों को यह जानना होता है कि आगे किस योजना को देखें और किस साइट पर जाएं।",
  },
];

const aboutFaqs = [
  {
    title: "यह परियोजना किस सोच से बनाई गई?",
    text: "यह इसलिए बनाई गई है ताकि आम लोग भी सरकारी योजना की बात जल्दी समझ सकें।",
  },
  {
    title: "यह किस प्रकार की जानकारी दिखाती है?",
    text: "यह योजना के प्रकार, किसे मदद मिल सकती है, लोग क्या खोज रहे हैं और आगे कहां जाना है, यह सब दिखाती है।",
  },
  {
    title: "इसका सबसे बड़ा लाभ क्या है?",
    text: "सबसे बड़ा फायदा यह है कि योजना की बात आसान भाषा और आसान तरीके से समझ आती है।",
  },
];

export default function AboutPage() {
  return (
    <div className="page-fade px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="section-rise hero-shell overflow-hidden rounded-[36px] border border-[#d7dee8] px-6 py-10 shadow-sm md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-[#bfd3ea] bg-white/80 px-5 py-2 text-sm font-semibold text-[#153a64] backdrop-blur">
                नागरिकों के लिए सरल योजना जानकारी मंच
              </div>
              <h1 className="mt-6 text-4xl font-bold text-[#153a64] md:text-5xl">
                यह परियोजना क्यों बनाई गई?
              </h1>
              <p className="mt-5 text-lg leading-9 text-[#516274]">
                बहुत लोगों को यह पता नहीं होता कि उनके लिए कौन-सी योजना ठीक है, कहां देखनी है और आगे क्या करना है।
                इसी वजह से यह मंच बनाया गया है ताकि योजना की बात आसान हिंदी में समझ आए।
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {aboutMetrics.map((item, index) => (
                  <div key={item.label} className={`glass-card rounded-[24px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <p className="text-base text-[#5b6878]">{item.label}</p>
                    <p className="mt-2 text-xl font-bold text-[#153a64]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {aboutGallery.map((item, index) => (
                <article
                  key={item.title}
                  className={`image-feature-card overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-lg ${index === 0 ? "md:col-span-2" : ""}`}
                >
                  <div className="image-wrap h-56 md:h-60">
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
          <div className="grid gap-6 md:grid-cols-3">
            {impactHighlights.map((item, index) => (
              <div key={item.title} className={`shine-panel rounded-[24px] p-6 shadow-sm stagger-${index + 1}`}>
                <p className="text-3xl font-bold text-[#153a64]">{item.value}</p>
                <p className="mt-3 text-lg font-semibold text-[#153a64]">{item.title}</p>
                <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-3xl font-bold text-[#153a64]">यह परियोजना किस बात पर बनी है</h2>
              <div className="mt-6 grid gap-4">
                {projectFocus.map((item, index) => (
                  <div key={item} className={`soft-panel rounded-[24px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <p className="text-base leading-8 text-[#5b6878]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#153a64]">यह किन मुश्किलों को आसान करती है</h2>
              <div className="mt-6 grid gap-4">
                {citizenNeeds.map((item, index) => (
                  <div key={item.title} className={`glass-card rounded-[24px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <h3 className="text-xl font-bold text-[#153a64]">{item.title}</h3>
                    <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rise grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-[#153a64]">इसे कैसे चलाएं</h2>
            <div className="mt-6 space-y-4">
              {usageSteps.map((step, index) => (
                <div key={step} className={`soft-panel flex gap-4 rounded-[24px] p-5 stagger-${(index % 3) + 1}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#153a64] text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-base leading-8 text-[#5b6878]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#d7dee8] bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-[#153a64]">इससे क्या फायदा है</h2>
            <div className="mt-6 space-y-4">
              {benefits.map((item, index) => (
                <div key={item} className={`glass-card rounded-[24px] p-5 text-base leading-8 text-[#5b6878] shadow-sm stagger-${(index % 3) + 1}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {trustCards.map((item, index) => (
              <div key={item.title} className={`image-note-card rounded-[26px] p-6 shadow-sm stagger-${(index % 3) + 1}`}>
                <h3 className="text-2xl font-bold text-[#153a64]">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-[#5b6878]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-10 shadow-sm md:px-10">
          <h2 className="text-3xl font-bold text-[#153a64]">जरूरी बातें</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {aboutFaqs.map((item, index) => (
              <div key={item.title} className={`soft-panel rounded-[24px] p-6 shadow-sm stagger-${(index % 3) + 1}`}>
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

