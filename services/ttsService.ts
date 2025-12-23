
import { GoogleGenAI, Modality } from "@google/genai";

class TTSService {
  private writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  private encodeWAV(samples: Int16Array): Blob {
    const sampleRate = 24000;
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 32 + samples.length * 2, true);
    this.writeString(view, 8, 'WAVE');
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    this.writeString(view, 36, 'data');
    view.setUint32(40, samples.length * 2, true);

    for (let i = 0; i < samples.length; i++) {
      view.setInt16(44 + i * 2, samples[i], true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
  }

  private decodeBase64(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async getAudioUrl(text: string): Promise<string | null> {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        console.error("Critical: API_KEY is missing from environment.");
        return null;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Data) return null;

      const uint8 = this.decodeBase64(base64Data);
      const int16 = new Int16Array(uint8.buffer, uint8.byteOffset, uint8.byteLength / 2);
      const wavBlob = this.encodeWAV(int16);
      
      return URL.createObjectURL(wavBlob);
    } catch (error) {
      console.error("TTS Fetch Error:", error);
      return null;
    }
  }
}

export const ttsService = new TTSService();
