
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ttsService } from '../services/ttsService';

interface AudioButtonProps {
  text: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  // Rule: Persist audio element via useRef to manage its lifecycle without extra renders
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Rule: Initialize the audio element safely inside the client-only effect
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
          URL.revokeObjectURL(audioRef.current.src);
        }
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = async (e: React.MouseEvent) => {
    // Standard event management
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing || !audioRef.current) return;

    setIsProcessing(true);
    
    try {
      // 1. Fetch dynamic WAV content from service
      const url = await ttsService.getAudioUrl(text);
      
      if (url && audioRef.current) {
        const audio = audioRef.current;
        
        // Clean up previous blob source to manage memory
        if (audio.src && audio.src.startsWith('blob:')) {
          URL.revokeObjectURL(audio.src);
        }

        // 2. Assign source and prepare playback
        audio.src = url;
        audio.load();

        // 3. Initiate playback within the same interaction flow
        // Required for mobile/Safari compliance: handle play() promise and catch blocks
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Successfully started
            })
            .catch((err) => {
              console.log("Autoplay bloqueado, aguardando interação do usuário.", err);
              setIsProcessing(false);
            });
        }

        // 4. Lifecycle listeners
        audio.onended = () => {
          setIsProcessing(false);
        };

        audio.onerror = () => {
          console.error("Audio playback error occurred.");
          setIsProcessing(false);
        };
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error processing text-to-speech:", error);
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isProcessing}
      className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center min-w-[38px] min-h-[38px] ${
        isProcessing 
          ? 'bg-indigo-100 text-indigo-400 cursor-wait' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-90 shadow-md border-2 border-transparent focus:ring-2 focus:ring-indigo-300 outline-none'
      }`}
      aria-label="Listen to pronunciation"
      title="Listen"
    >
      {isProcessing ? (
        <svg className="animate-spin h-5 w-5 text-indigo-500" viewBox="0 0 24 24">
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
