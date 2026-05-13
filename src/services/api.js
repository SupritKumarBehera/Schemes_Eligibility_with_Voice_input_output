const BASE_URL = "http://localhost:5000/api/voice";

export async function sendVoice(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData
  });

  return response.json();
}
