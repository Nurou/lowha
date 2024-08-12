import { Pause } from 'lucide-react';
import cx from 'classnames';

import { alphabet, Letter, ModeKey } from './constants';
import { clearCurrentlyPlayingAudio } from './util';

const letterToUnavailableModesMap: Record<Letter, ModeKey[]> = {
  ya: ['saakin_u'],
  waw: ['saakin_i'],
};

const playSound = ({ letter, mode, onEnded }: { letter: string; mode: ModeKey; onEnded: () => void }) => {
  const path = mode === 'combined' ? `/assets/audio/combined/${letter}.mp3` : `/assets/audio/${letter}/${mode}.mp3`;
  const newAudio = new Audio(path);
  newAudio.onended = onEnded;

  let currentlyPlayingAudio: HTMLAudioElement | null = null;
  currentlyPlayingAudio = newAudio;

  try {
    currentlyPlayingAudio.play().catch((error) => console.error('Error playing audio:', error));
  } catch (error) {
    console.error('Error playing audio:', error);
  }

  return currentlyPlayingAudio;
};

const playSelectedLetterSound = ({
  currentlyPlayingAudioRef,
  setCurrentlyPlayingLetter,
  letter,
  selectedMode,
}: {
  currentlyPlayingAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setCurrentlyPlayingLetter: React.Dispatch<React.SetStateAction<string | null>>;
  letter: string;
  selectedMode: ModeKey;
}) => {
  const currentlyPlayingAudio = playSound({
    letter,
    mode: selectedMode,
    onEnded: () => {
      clearCurrentlyPlayingAudio({
        currentlyPlayingAudioRef,
      });
      setCurrentlyPlayingLetter(null);
    },
  });

  setCurrentlyPlayingLetter(letter);
  currentlyPlayingAudioRef.current = currentlyPlayingAudio;
};

const Key = ({
  letter,
  currentlyPlayingLetter,
  currentlyPlayingAudioRef,
  setCurrentlyPlayingLetter,
  selectedMode,
  modeIsMissing,
}: {
  letter: string;
  currentlyPlayingLetter: string | null;
  currentlyPlayingAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setCurrentlyPlayingLetter: React.Dispatch<React.SetStateAction<string | null>>;
  selectedMode: ModeKey;
  modeIsMissing: boolean;
}) => {
  const buttonLetterIsAlreadyPlaying = currentlyPlayingLetter === letter;

  return (
    <button
      className={cx('pushable', 'bg-stone-400', 'rounded-2xl border-none p-0 outline-offset-4')}
      onClick={() => {
        clearCurrentlyPlayingAudio({
          currentlyPlayingAudioRef,
        });

        setCurrentlyPlayingLetter(null);

        if (buttonLetterIsAlreadyPlaying) {
          return;
        }
        void playSelectedLetterSound({
          currentlyPlayingAudioRef,
          setCurrentlyPlayingLetter,
          letter,
          selectedMode,
        });
      }}
      disabled={modeIsMissing}
    >
      <span
        className={cx(
          'front',
          'grid place-items-center p-2 py-[12px] px-[42px] rounded-2xl text-[32px] font-semibold bg-stone-300 text-stone-600 -translate-y-[6px] min-h-[80px]'
        )}
      >
        {buttonLetterIsAlreadyPlaying ? <Pause /> : alphabet[letter][selectedMode]}
      </span>
    </button>
  );
};

export const Keyboard = ({
  selectedMode,
  currentlyPlayingLetter,
  currentlyPlayingAudioRef,
  setCurrentlyPlayingLetter,
}: {
  selectedMode: ModeKey;
  currentlyPlayingLetter: string | null;
  currentlyPlayingAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setCurrentlyPlayingLetter: React.Dispatch<React.SetStateAction<string | null>>;
}) =>
  Object.keys(alphabet).map((letter, index) => {
    const modeIsMissing = letterToUnavailableModesMap[letter]?.includes(selectedMode);

    if (modeIsMissing) {
      return null;
    }

    return (
      <Key
        key={index.toString() + letter}
        letter={letter}
        selectedMode={selectedMode}
        modeIsMissing={modeIsMissing}
        currentlyPlayingLetter={currentlyPlayingLetter}
        currentlyPlayingAudioRef={currentlyPlayingAudioRef}
        setCurrentlyPlayingLetter={setCurrentlyPlayingLetter}
      />
    );
  });
