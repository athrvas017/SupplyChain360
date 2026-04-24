/**
 * SupplyLens 360 Neural Narrator Utility
 */
export const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Premium voice selection if available
  const voices = window.speechSynthesis.getVoices();
  const premiumVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
  if (premiumVoice) utterance.voice = premiumVoice;

  utterance.pitch = 0.95;
  utterance.rate = 1.05;
  utterance.volume = 0.8;

  window.speechSynthesis.speak(utterance);
};
