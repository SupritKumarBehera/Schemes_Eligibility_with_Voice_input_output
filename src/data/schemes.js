const schemes = [
  {
    name: "आयुष्मान भारत - PMJAY",
    detail: "यह योजना कम पैसे वाले परिवारों को इलाज में मदद देती है।",
    check: (profile) => Number(profile.income) < 200000,
  },
  {
    name: "प्रधानमंत्री किसान सम्मान निधि",
    detail: "यह योजना किसानों को सीधा पैसा देने में मदद करती है।",
    check: (profile) => profile.farmer === "हाँ",
  },
  {
    name: "सुकन्या समृद्धि योजना",
    detail: "यह योजना बेटी की पढ़ाई और बचत के काम आ सकती है।",
    check: (profile) => profile.girl_child_age !== "" && profile.girl_child_age !== "नहीं",
  },
  {
    name: "प्रधानमंत्री आवास योजना",
    detail: "यह योजना घर से जुड़ी मदद दिलाने में काम आ सकती है।",
    check: () => true,
  },
];

export default schemes;
