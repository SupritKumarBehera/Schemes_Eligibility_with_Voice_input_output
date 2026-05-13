import { useMemo, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import VoiceMic from "../components/VoiceMic";
import { assistantVisuals } from "../data/portalContent";
import schemes from "../data/schemes";

function sanitizeVoiceText(value) {
  return value
    .toLowerCase()
    .replace(/[|:;()[\]{}'"`~]/g, " ")
    .replace(/[?.,!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDigits(value) {
  const devanagariMap = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
  };

  return value.replace(/[०-९]/g, (digit) => devanagariMap[digit] || digit);
}

function includesAny(text, values) {
  return values.some((item) => text.includes(item.toLowerCase()));
}

function extractNumber(value) {
  const normalizedValue = normalizeDigits(value);
  const match = normalizedValue.match(/\d+/g);

  if (!match?.length) {
    return "";
  }

  if (match.length === 1) {
    return match[0];
  }

  return match.join("");
}

function normalizeIntent(value) {
  const text = sanitizeVoiceText(value);

  if (includesAny(text, ["पात्र", "eligibility", "eligible", "हक"])) {
    return "मुझे जानना है कि मैं हकदार हूं या नहीं";
  }

  if (includesAny(text, ["योजना", "scheme", "sahayata", "सहायता", "मदद"])) {
    return "मुझे योजना के बारे में जानना है";
  }

  return value.trim();
}

function normalizeNumericAnswer(stepKey, value) {
  const text = sanitizeVoiceText(normalizeDigits(value));
  const directNumber = extractNumber(text);

  if (directNumber) {
    return directNumber;
  }

  const hindiNumbers = {
    "एक": "1",
    "दो": "2",
    "तीन": "3",
    "चार": "4",
    "पांच": "5",
    "पाँच": "5",
    "छह": "6",
    "छः": "6",
    "सात": "7",
    "आठ": "8",
    "नौ": "9",
    "दस": "10",
    "ग्यारह": "11",
    "बारह": "12",
    "तेरह": "13",
    "चौदह": "14",
    "पंद्रह": "15",
    "पन्द्रह": "15",
    "सोलह": "16",
    "सत्रह": "17",
    "अठारह": "18",
    "उन्नीस": "19",
    "बीस": "20",
    "पच्चीस": "25",
    "तीस": "30",
    "पैंतीस": "35",
    "चालीस": "40",
    "पचास": "50",
    "साठ": "60",
    "पैंसठ": "65",
    "सत्तर": "70",
    "अस्सी": "80",
    "नब्बे": "90",
    "सौ": "100",
    "हजार": "1000",
    "लाख": "100000",
  };

  for (const [word, number] of Object.entries(hindiNumbers)) {
    if (text.includes(word)) {
      if (stepKey === "income" && word === "लाख") {
        if (text.includes("एक")) return "100000";
        if (text.includes("दो")) return "200000";
        if (text.includes("तीन")) return "300000";
      }

      return number;
    }
  }

  return "";
}

function normalizeYesNo(value) {
  const text = sanitizeVoiceText(value);

  if (
    includesAny(text, [
      "हाँ",
      "हां",
      "haan",
      "han",
      "ha",
      "yes",
      "ji ha",
      "जी हाँ",
      "जी हां",
    ])
  ) {
    return "हाँ";
  }

  if (includesAny(text, ["नहीं", "nahi", "nahin", "no", "not"])) {
    return "नहीं";
  }

  return "";
}

function normalizeGender(value) {
  const text = sanitizeVoiceText(value);

  if (includesAny(text, ["पुरुष", "male", "मेल", "aadmi", "man"])) {
    return "पुरुष";
  }

  if (includesAny(text, ["महिला", "female", "femail", "औरत", "woman", "lady"])) {
    return "महिला";
  }

  return "";
}

function normalizeCategory(value) {
  const text = sanitizeVoiceText(value).toUpperCase();

  if (text.includes("SC") || text.includes("एस सी")) return "SC";
  if (text.includes("ST") || text.includes("एस टी")) return "ST";
  if (text.includes("OBC") || text.includes("ओबीसी") || text.includes("ओ बी सी")) return "OBC";
  if (text.includes("GENERAL") || text.includes("GEN") || text.includes("जनरल")) return "General";

  return "";
}

function normalizeMaritalStatus(value) {
  const text = sanitizeVoiceText(value);

  if (includesAny(text, ["विवाहित", "married", "shaadi shuda", "शादीशुदा"])) {
    return "विवाहित";
  }

  if (includesAny(text, ["अविवाहित", "unmarried", "single", "कुंवारे"])) {
    return "अविवाहित";
  }

  if (includesAny(text, ["विधवा", "widow"])) {
    return "विधवा";
  }

  return "";
}

function normalizeStepValue(stepKey, value) {
  if (stepKey === "user_intent") {
    return normalizeIntent(value);
  }

  if (stepKey === "age" || stepKey === "income") {
    return normalizeNumericAnswer(stepKey, value);
  }

  if (stepKey === "gender") {
    return normalizeGender(value);
  }

  if (stepKey === "category") {
    return normalizeCategory(value);
  }

  if (stepKey === "marital_status") {
    return normalizeMaritalStatus(value);
  }

  if (stepKey === "farmer" || stepKey === "bank_account") {
    return normalizeYesNo(value);
  }

  if (stepKey === "girl_child_age") {
    const yesNo = normalizeYesNo(value);
    if (yesNo === "नहीं") {
      return "नहीं";
    }

    return normalizeNumericAnswer(stepKey, value);
  }

  return value.trim();
}

const steps = [
  {
    key: "user_intent",
    question: "नमस्ते। आपको क्या जानना है?",
    validate: (value) => value.trim().length > 2,
    error: "आसान शब्दों में बताइए। आपको योजना की जानकारी चाहिए या यह जानना है कि आप हकदार हैं या नहीं।",
  },
  {
    key: "age",
    question: "आपकी उम्र कितनी है?",
    validate: (value) => /^\d+$/.test(value.replace("+", "")),
    error: "उम्र सिर्फ नंबर में बताइए, जैसे 35 या 60।",
  },
  {
    key: "gender",
    question: "आप पुरुष हैं या महिला?",
    validate: (value) => ["पुरुष", "महिला"].includes(value),
    error: "सिर्फ पुरुष या महिला बोलें।",
  },
  {
    key: "income",
    question: "आपकी एक साल की कमाई कितनी है?",
    validate: (value) => /^\d{2,}$/.test(value),
    error: "कमाई सिर्फ नंबर में बताइए, जैसे 100000।",
  },
  {
    key: "category",
    question: "आप किस वर्ग से हैं? SC, ST, OBC या General?",
    validate: (value) => ["SC", "ST", "OBC", "General"].includes(value),
    error: "SC, ST, OBC या General में से एक बोलें।",
  },
  {
    key: "marital_status",
    question: "आप शादीशुदा हैं, कुंवारे हैं या विधवा हैं?",
    validate: (value) => ["विवाहित", "अविवाहित", "विधवा"].includes(value),
    error: "विवाहित, अविवाहित या विधवा में से एक बोलें।",
  },
  {
    key: "farmer",
    question: "क्या आप किसान हैं? हाँ या नहीं?",
    validate: (value) => ["हाँ", "नहीं"].includes(value),
    error: "हाँ या नहीं बोलें।",
  },
  {
    key: "bank_account",
    question: "क्या आपके पास बैंक खाता है? हाँ या नहीं?",
    validate: (value) => ["हाँ", "नहीं"].includes(value),
    error: "हाँ या नहीं बोलें।",
  },
  {
    key: "girl_child_age",
    question: "अगर बेटी है, तो उसकी उम्र क्या है? नहीं है तो 'नहीं' कहें।",
    validate: (value) => value === "नहीं" || /^\d+$/.test(value),
    error: "बेटी की उम्र नंबर में बताइए, नहीं है तो 'नहीं' कहें।",
  },
];

const quickHelp = [
  "एक बार में एक सवाल पूछा जाएगा।",
  "आप बोलकर या लिखकर जवाब दे सकते हैं।",
  "आपके जवाब के बाद अगला सवाल अपने आप आएगा।",
];

const assistantSupport = [
  {
    title: "शुरू करने से पहले",
    text: "उम्र, कमाई, वर्ग, बैंक खाता और घर की थोड़ी जानकारी पास रखें।",
  },
  {
    title: "आवाज साफ न आए तो",
    text: "आप नीचे लिखकर भी वही जवाब भेज सकते हैं।",
  },
  {
    title: "इससे क्या फायदा है",
    text: "एक-एक सवाल होने से सही योजना तक पहुंचना आसान हो जाता है।",
  },
];

const assistantFaqs = [
  {
    title: "क्या मैं बोल सकता हूँ?",
    text: "हाँ। आप माइक से बोल सकते हैं, या नीचे लिख भी सकते हैं।",
  },
  {
    title: "सवाल कैसे पूछे जाते हैं?",
    text: "यह एक-एक करके सवाल पूछता है और आपके जवाब के बाद आगे बढ़ता है।",
  },
  {
    title: "अगर बात समझ न आए तो?",
    text: "सहायक फिर से पूछेगा। जरूरत हो तो लिखकर जवाब दें।",
  },
];

const assistantHeroStats = [
  { label: "क्या पूछा जाएगा", value: "योजना, हक, मदद" },
  { label: "जवाब कैसे दें", value: "बोलकर या लिखकर" },
  { label: "बात करने का तरीका", value: "आसान और सीधा" },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "स्वागत है। मैं आपके जवाब के हिसाब से आपके काम की योजना बताने की कोशिश करूंगा।",
    },
    {
      sender: "bot",
      text: steps[0].question,
    },
  ]);
  const [stepIndex, setStepIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [profile, setProfile] = useState({
    user_intent: "",
    age: "",
    gender: "",
    income: "",
    category: "",
    marital_status: "",
    farmer: "",
    bank_account: "",
    girl_child_age: "",
  });

  const currentStep = steps[stepIndex];

  const progress = useMemo(() => {
    return Math.round((stepIndex / steps.length) * 100);
  }, [stepIndex]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const finishConversation = (data) => {
    const matched = schemes.filter((scheme) => scheme.check(data));

    if (matched.length === 0) {
      addMessage(
        "bot",
        "अभी आपकी बात के हिसाब से कोई साफ योजना नहीं मिली। आप होम पेज या सरकारी लिंक भी देख सकते हैं।"
      );
    } else {
      const result = matched
        .map((scheme) => `✔ ${scheme.name}\n${scheme.detail}`)
        .join("\n\n");

      addMessage(
        "bot",
        `आपकी बात के हिसाब से ये योजनाएं आपके काम आ सकती हैं:\n\n${result}`
      );
    }

    addMessage(
      "bot",
      "चाहें तो आप नई बात शुरू करके किसी और के लिए भी योजना देख सकते हैं।"
    );
    setIsComplete(true);
  };

  const processAnswer = (rawValue) => {
    if (!currentStep || isComplete) {
      return;
    }

    const cleanedValue = normalizeStepValue(currentStep.key, rawValue);

    if (!cleanedValue) {
      const nextRetry = retryCount + 1;
      setRetryCount(nextRetry);

      if (nextRetry >= 3) {
        addMessage("bot", "जवाब साफ नहीं मिल रहा। कृपया नई बात शुरू करें।");
        setIsComplete(true);
        return;
      }

      addMessage("bot", currentStep.error);
      addMessage("bot", currentStep.question);
      return;
    }

    addMessage("user", cleanedValue);

    if (!currentStep.validate(cleanedValue)) {
      const nextRetry = retryCount + 1;
      setRetryCount(nextRetry);

      if (nextRetry >= 3) {
        addMessage("bot", "जवाब साफ नहीं मिल रहा। कृपया नई बात शुरू करें।");
        setIsComplete(true);
        return;
      }

      addMessage("bot", currentStep.error);
      addMessage("bot", currentStep.question);
      return;
    }

    setRetryCount(0);

    const updatedProfile = {
      ...profile,
      [currentStep.key]: cleanedValue,
    };
    setProfile(updatedProfile);

    const nextStepIndex = stepIndex + 1;
    if (nextStepIndex >= steps.length) {
      setStepIndex(nextStepIndex);
      finishConversation(updatedProfile);
      return;
    }

    setStepIndex(nextStepIndex);
    addMessage("bot", steps[nextStepIndex].question);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    processAnswer(inputValue);
    setInputValue("");
  };

  const resetConversation = () => {
    setMessages([
      {
        sender: "bot",
        text: "स्वागत है। मैं आपके जवाब के हिसाब से आपके काम की योजना बताने की कोशिश करूंगा।",
      },
      {
        sender: "bot",
        text: steps[0].question,
      },
    ]);
    setStepIndex(0);
    setInputValue("");
    setRetryCount(0);
    setIsComplete(false);
    setProfile({
      user_intent: "",
      age: "",
      gender: "",
      income: "",
      category: "",
      marital_status: "",
      farmer: "",
      bank_account: "",
      girl_child_age: "",
    });
  };

  return (
    <div className="page-fade px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="section-rise hero-shell overflow-hidden rounded-[36px] border border-[#d7dee8] px-6 py-8 shadow-sm md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#153a64] md:text-5xl">
                हिंदी वॉइस योजना सहायक
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-[#516274]">
                यह पेज बात करने के लिए बना है। यहां सवाल और जवाब साफ दिखेंगे, ताकि आप आराम से बात कर सकें।
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {quickHelp.map((item, index) => (
                  <div key={item} className={`glass-card rounded-2xl p-5 text-base leading-8 text-[#5b6878] shadow-sm stagger-${index + 1}`}>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 inline-block rounded-full bg-[#eaf4ff] px-6 py-3 text-base font-semibold text-[#153a64]">
                बात कितनी हुई: {progress}%
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {assistantHeroStats.map((item, index) => (
                  <div key={item.label} className={`soft-panel rounded-[22px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                    <p className="text-sm font-semibold text-[#5b6878]">{item.label}</p>
                    <p className="mt-3 text-lg font-bold text-[#153a64]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {assistantVisuals.map((item, index) => (
                <article
                  key={item.title}
                  className={`image-feature-card overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-lg ${index === 0 ? "md:col-span-2" : ""}`}
                >
                  <div className="image-wrap h-52 md:h-56">
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

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-4 py-6 shadow-sm md:px-6">
          <ChatWindow messages={messages} />

          <div className="soft-panel mx-auto mt-8 max-w-4xl rounded-[24px] border border-[#dbe4ee] p-6 shadow-sm">
            <VoiceMic onSpeech={processAnswer} />

            {!isComplete ? (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="यहां जवाब लिखें"
                  className="flex-1 rounded-full border border-[#c9d8e7] px-5 py-4 text-lg text-[#153a64] outline-none focus:border-[#1d4ed8]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#153a64] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0f2a45]"
                >
                  जवाब भेजें
                </button>
              </form>
            ) : (
              <div className="mt-6 text-center">
                <button
                  onClick={resetConversation}
                  className="rounded-full bg-[#1d4ed8] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#153a64]"
                >
                  नई बात शुरू करें
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-8 shadow-sm md:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {assistantSupport.map((item, index) => (
              <div key={item.title} className={`glass-card rounded-[24px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
                <h3 className="text-xl font-bold text-[#153a64]">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[#5b6878]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-rise rounded-[32px] border border-[#d7dee8] bg-white px-6 py-8 shadow-sm md:px-8">
          <h2 className="text-3xl font-bold text-[#153a64]">वॉइस सहायक की आसान बातें</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {assistantFaqs.map((item, index) => (
              <div key={item.title} className={`soft-panel rounded-[24px] p-5 shadow-sm stagger-${(index % 3) + 1}`}>
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
