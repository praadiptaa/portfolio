"use client";
import React, { useEffect, useRef, useState } from "react";

// If you want a Spotify embed, set SPOTIFY_EMBED to a full embed URL
// e.g. "https://open.spotify.com/embed/track/{id}" or playlist/album/embed URL
// Using user's URL: https://open.spotify.com/intl-id/track/53xXTqz8QfadLsXbs411si?si=...
const SPOTIFY_EMBED = "https://open.spotify.com/embed/track/53xXTqz8QfadLsXbs411si";

export default function MusicFab() {
  const [open, setOpen] = useState(false);

  // Fallback local audio (kept for cases where no embed URL is provided)
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const localSrc = "/music/favorite.mp3";

  useEffect(() => {
    if (SPOTIFY_EMBED) return;
    const audio = new Audio(localSrc);
    audio.preload = "metadata";
    audioRef.current = audio;
    const onCan = () => setLoaded(true);
    const onEnded = () => setPlaying(false);
    audio.addEventListener("canplaythrough", onCan);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCan);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggleLocal = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!playing) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (e) {
        console.error("Playback failed", e);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  // If SPOTIFY_EMBED is configured, FAB toggles a small embed panel
  if (SPOTIFY_EMBED) {
    return (
      <div>
        <div className="fixed bottom-6 right-20 z-50">
          <button
            aria-label="Toggle Spotify player"
            title={open ? "Close player" : "Open Spotify player"}
            onClick={() => setOpen(v => !v)}
            className="w-12 h-12 rounded-full solid-btn text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          >
            <span className="text-sm">♫</span>
          </button>
        </div>

        {open && (
          <div className="fixed bottom-20 right-6 z-50 w-80 md:w-[360px] solid-panel rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-2 border-b border-zinc-800">
              <div className="text-sm text-white font-medium">Spotify Player</div>
              <div className="flex items-center gap-2">
                <a href={SPOTIFY_EMBED.replace('/embed','')} target="_blank" rel="noreferrer" className="text-sm text-gray-300 hover:text-white">Open</a>
                <button aria-label="Close" onClick={() => setOpen(false)} className="text-white/70 hover:text-white px-2">✕</button>
              </div>
            </div>
            <div className="w-full">
              <iframe
                src={SPOTIFY_EMBED}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                onLoad={() => console.log('MusicFab: spotify iframe loaded')}
                ref={(el) => {
                  if (el) console.log('MusicFab: iframe element present (may or may not load due to CSP)');
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Otherwise, fallback to the simple local audio FAB
  return (
    <div className="fixed bottom-6 right-20 z-50">
      <button
        aria-label="Play favorite song"
        title={playing ? "Pause song" : "Play favorite song"}
        onClick={toggleLocal}
        className="w-12 h-12 rounded-full solid-btn text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        {loaded ? (
          <span className="text-lg">{playing ? "⏸" : "▶"}</span>
        ) : (
          <span className="text-sm text-gray-400">♪</span>
        )}
      </button>
    </div>
  );
}
