
import { GoogleGenAI, Modality } from "@google/genai";

class TTSService {
  private audioContext: AudioContext | null = null;

  /**
   * Initializes or resumes the AudioContext.
   * MUST be called directly within a user-triggered event handler to work on all browsers.
   */
  async ensureContext(): Promise<AudioContext> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000
      });
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    return this.audioContext;
  }

  private decodeBase64(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  private async decodePCM(
    uint8Array: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    // Ensure we correctly view the buffer as 16-bit integers
    // We use a DataView or specify offset/length to avoid alignment issues with the underlying buffer
    const dataInt16 = new Int16Array(
      uint8Array.buffer,
      uint8Array.byteOffset,
      uint8Array.byteLength / 2
    );
    
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        // Normalize 16-bit signed integer (-32768 to 32767) to float (-1.0 to 1.0)
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  async speak(text: string) {
    // Important: AudioContext must be resumed by a user gesture.
    // The calling component handles this by calling ensureContext() first.
    const ctx = await this.ensureContext();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say clearly at a normal pace: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        console.error("TTS Service: No audio data returned from Gemini.");
        return;
      }

      const audioData = this.decodeBase64(base64Audio);
      const audioBuffer = await this.decodePCM(audioData, ctx, 24000, 1);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start(0);
      
    } catch (error) {
      console.error("TTS Service error during speak():", error);
    }
  }
}

export const ttsService = new TTSService();
