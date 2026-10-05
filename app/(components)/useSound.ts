"use client";

import { useCallback, useEffect, useRef } from "react";

export const SELECT_SOUND = "/select.mp3";
export const CLOSE_SOUND = "/close.mp3";

/** Preloads a sound once and returns a function that plays it from the start. */
export const useSound = (url: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(url);
    audioRef.current.preload = "auto";
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [url]);

  return useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, []);
};
