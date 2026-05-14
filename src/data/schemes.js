const schemes = [
  {
    name: "आयुष्मान भारत - PMJAY",
    detail: "यह योजना कम आय वाले परिवारों को इलाज में मदद देती है।",
    check: (profile) => Number(profile.income) <= 200000,
  },

  {
    name: "प्रधानमंत्री आवास योजना (PMAY)",
    detail: "यह योजना घर से जुड़ी मदद दिलाने में काम आ सकती है।",
    check: (profile) => Number(profile.income) <= 300000,
  },

  {
    name: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (IGNOAPS)",
    detail: "यह योजना बुजुर्ग लोगों को आर्थिक सहायता देने में मदद करती है।",
    check: (profile) =>
      Number(profile.age) >= 60 &&
      Number(profile.income) <= 200000,
  },

  {
    name: "राष्ट्रीय विधवा पेंशन योजना",
    detail: "यह योजना विधवा महिलाओं को आर्थिक सहायता देने में मदद करती है।",
    check: (profile) =>
      profile.gender === "महिला" &&           // BUG FIX: was "female"
      profile.marital_status === "विधवा",
  },

  {
    name: "शिक्षा छात्रवृत्ति योजना",
    detail: "यह योजना पढ़ाई के लिए आर्थिक सहायता देने में मदद करती है।",
    check: (profile) =>
      ["SC", "ST", "OBC"].includes(profile.category) &&
      Number(profile.income) <= 250000,
  },

  {
    name: "प्रधानमंत्री किसान सम्मान निधि",
    detail: "यह योजना किसानों को सीधी आर्थिक सहायता देती है।",
    check: (profile) => profile.farmer === "हाँ",  // BUG FIX: was === true
  },

  {
    name: "प्रधानमंत्री जन धन योजना (PMJDY)",
    detail: "यह योजना बिना बैंक खाता वाले लोगों को बैंकिंग सुविधा देने में मदद करती है।",
    check: (profile) => profile.bank_account === "नहीं",  // BUG FIX: was === false
  },

  {
    name: "सुकन्या समृद्धि योजना",
    detail: "यह योजना बेटी की पढ़ाई और बचत के काम आ सकती है।",
    check: (profile) =>
      profile.girl_child_age !== "नहीं" &&
      profile.girl_child_age !== "" &&
      Number(profile.girl_child_age) <= 10,  // BUG FIX: was typeof === "number"
  },
];

export default schemes;