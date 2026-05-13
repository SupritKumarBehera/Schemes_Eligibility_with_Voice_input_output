export function recordAudio() {
  return new Promise(async (resolve, reject) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      resolve(audioBlob);
    };

    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000); // 5 seconds recording
  });
}
