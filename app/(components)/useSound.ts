"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

export const SELECT_SOUND = "/select.mp3";
export const CLOSE_SOUND = "/close.mp3";

const STORAGE_KEY = "portfolio:sound";

// Sound is off until the visitor turns it on; the choice is remembered.
let soundEnabled = false;
let loaded = false;
const listeners = new Set<() => void>();

const getSoundEnabled = () => {
  if (!loaded) {
    loaded = true;
    try {
      soundEnabled = localStorage.getItem(STORAGE_KEY) === "on";
    } catch {}
  }
  return soundEnabled;
};

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  loaded = true;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {}
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Whether UI sounds are on, kept in sync across every component using it. */
export const useSoundEnabled = () =>
  useSyncExternalStore(subscribe, getSoundEnabled, () => false);

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
    if (!audio || !getSoundEnabled()) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, []);
};
