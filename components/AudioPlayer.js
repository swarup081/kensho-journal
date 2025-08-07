// components/AudioPlayer.js
'use client';

import { useEffect, useRef } from 'react';

const AudioPlayer = ({ activeSound }) => {
  const rainRef = useRef(null);
  const comfortRef = useRef(null);
  const reflectRef = useRef(null); // --- FIX: Added a ref for the new sound ---

  useEffect(() => {
    const sounds = {
      rain: rainRef.current,
      comfort: comfortRef.current,
      reflect: reflectRef.current, // --- FIX: Added the new sound to the map ---
    };

    // Pause all sounds first
    for (const key in sounds) {
      if (sounds[key]) {
        sounds[key].pause();
      }
    }

    // Play the active sound
    if (activeSound && sounds[activeSound]) {
      sounds[activeSound].loop = true;
      sounds[activeSound].play();
    }
  }, [activeSound]);

  return (
    <>
      <audio ref={rainRef} src="/sounds/rain.mp3" />
      <audio ref={comfortRef} src="/sounds/comfort.mp3" />
      {/* --- FIX: Added the audio element for reflect.mp3 --- */}
      <audio ref={reflectRef} src="/sounds/reflect.mp3" />
    </>
  );
};

export default AudioPlayer;