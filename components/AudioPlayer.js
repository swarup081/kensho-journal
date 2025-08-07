// components/AudioPlayer.js
'use client';

import { useEffect, useRef } from 'react';

const AudioPlayer = ({ activeSound }) => {
  const rainRef = useRef(null);
  const cafeRef = useRef(null);
  const comfortRef = useRef(null);

  useEffect(() => {
    const sounds = {
      rain: rainRef.current,
      cafe: cafeRef.current,
      comfort: comfortRef.current,
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
      <audio ref={cafeRef} src="/sounds/cafe.mp3" />
      <audio ref={comfortRef} src="/sounds/comfort.mp3" />
    </>
  );
};

export default AudioPlayer;