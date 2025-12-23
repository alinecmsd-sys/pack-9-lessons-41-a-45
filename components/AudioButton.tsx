
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ttsService } from '../services/ttsService';

interface AudioButtonProps {
  text: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const audioInstance = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioInstance.current = new Audio();
      // Pré-configuração para garantir que o navegador trate o áudio como prioridade
      audioInstance.current.preload = "auto";
    }
    
    return () => {
      if (audioInstance.current) {
        audioInstance.current.pause();
        if (audioInstance.current.src.startsWith('blob:')) {
          URL.revokeObjectURL(audioInstance.current.src);
        }
        audioInstance.current = null;
      }
    };
  }, []);

  const handlePlay = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing || !audioInstance.current) return;

    // Tática de "Warm-up": Tenta dar play em silêncio ou carregar algo vazio
    // para manter o token de interação do usuário vivo enquanto a API responde.
    try {
      audioInstance.current.play().catch(() => {}); 
      audioInstance.current.pause();
    } catch (e) {}

    setIsProcessing(true);
    
    try {
      const url = await ttsService.getAudioUrl(text);
      
      if (url && audioInstance.current) {
        const audio = audioInstance.current;
        
        // Limpa blob anterior
        if (audio.src && audio.src.startsWith('blob:')) {
          URL.revokeObjectURL(audio.src);
        }

        audio.src = url;
        audio.load();

        // A reprodução deve ser imediata após o carregamento do SRC
        // No Vercel, o atraso da rede pode ser maior, então usamos o evento canplaythrough
        const playAudio = async () => {
          try {
            await audio.play();
          } catch (err) {
            console.error("Playback failed after interaction delay:", err);
            setIsProcessing(false);
          }
        };

        audio.oncanplaythrough = () => {
          playAudio();
          audio.oncanplaythrough = null;
        };

        audio.onended = () => setIsProcessing(false);
        audio.onerror = (err) => {
          console.error("Audio Element Error:", err);
          setIsProcessing(false);
        };
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("TTS Process failed:", error);
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isProcessing}
      className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center min-w-[40px] min-h-[40px] ${
        isProcessing 
          ? 'bg-indigo-100 text-indigo-400 cursor-wait' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-90 shadow-md border-2 border-transparent focus:ring-2 focus:ring-indigo-400 outline-none'
      }`}
      aria-label="Ouvir áudio"
    >
      {isProcessing ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      )}
    </button>
  );
};

export default AudioButton;
