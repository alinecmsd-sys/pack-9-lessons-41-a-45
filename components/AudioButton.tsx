
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ttsService } from '../services/ttsService';

interface AudioButtonProps {
  text: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup Blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (audioRef.current && audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const handlePlay = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    
    try {
      const url = await ttsService.getAudioUrl(text);
      
      if (url) {
        // Create or reuse audio element following the "useEffect/Interaction" rule
        if (!audioRef.current) {
          audioRef.current = new Audio();
        } else if (audioRef.current.src) {
          URL.revokeObjectURL(audioRef.current.src);
        }

        audioRef.current.src = url;
        
        // standard .play() which must be in a user interaction context
        audioRef.current.play().catch((err) => {
          console.log("Autoplay blocked or playback error:", err);
          // Fallback UI or message could go here
        });

        // Reset state when finished
        audioRef.current.onended = () => setIsProcessing(false);
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isProcessing}
      className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center min-w-[36px] min-h-[36px] ${
        isProcessing 
          ? 'bg-indigo-200 text-indigo-400 cursor-wait' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-90 shadow-md'
      }`}
      aria-label="Ouvir pronúncia"
    >
      {isProcessing ? (
        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
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
