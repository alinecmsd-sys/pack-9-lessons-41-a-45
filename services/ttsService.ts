
import { GoogleGenAI, Modality } from "@google/genai";

class TTSService {
  private writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  /**
   * Encodes raw PCM 16-bit Mono (24000Hz) to a WAV Blob.
   * This avoids using AudioContext completely, which can be restricted on some environments.
   */
  private encodeWAV(samples: Int16Array): Blob {
    const sampleRate = 24000;
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    // RIFF identifier
    this.writeString(view, 0, 'RIFF');
    // File length
    view.setUint32(4, 32 + samples.length * 2, true);
    // RIFF type
    this.writeString(view, 8, 'WAVE');
    // Format chunk identifier
    this.writeString(view, 12, 'fmt ');
    // Format chunk length
    view.setUint32(16, 16, true);
    // Sample format (raw)
    view.setUint16(20, 1, true);
    // Channel count
    view.setUint16(22, 1, true);
    // Sample rate
    view.setUint32(24, sampleRate, true);
    // Byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * 2, true);
    // Block align (channel count * bytes per sample)
    view.setUint16(32, 2, true);
    // Bits per sample
    view.setUint16(34, 16, true);
    // Data chunk identifier
    this.writeString(view, 36, 'data');
    // Data chunk length
    view.setUint32(40, samples.length * 2, true);

    // Write the actual samples
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
      // Create fresh instance per request to ensure latest API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
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
      const int16 = new Int16Array(uint8.buffer);
      const wavBlob = this.encodeWAV(int16);
      
      return URL.createObjectURL(wavBlob);
    } catch (error) {
      console.error("TTS Fetch Error:", error);
      return null;
    }
  }
}

export const ttsService = new TTSService();
