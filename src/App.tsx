import cx from 'classnames';
import { useRef, useState } from 'react';
import { ModeSelect } from './ModeSelect';
import { Letter, ModeKey, alphabet, modes } from './constants';
import { Pause } from 'lucide-react';

type LetterToAudioElement = Record<Letter, Record<ModeKey, HTMLAudioElement | null>>;

const INITIAL_STORED_AUDIO = {
  a: null,
  u: null,
  i: null,
  combined: null,
  saakin_a: null,
  saakin_u: null,
  saakin_i: null,
} as const;

const playSound = ({
  letter,
  audioRefs,
  mode,
  onEnded,
}: {
  letter: string;
  audioRefs: React.MutableRefObject<LetterToAudioElement>;
  mode: ModeKey;
  onEnded: () => void;
}) => {
  let currentlyPlayingAudio: HTMLAudioElement | null = null;

  // check if audio element already exists
  const storedModeAudio = audioRefs.current[letter]?.[mode];

  if (storedModeAudio) {
    storedModeAudio.currentTime = 0; // reset to start
    currentlyPlayingAudio = storedModeAudio;
  } else {
    // create new audio
    const path = mode === 'combined' ? `/assets/audio/combined/${letter}.mp3` : `/assets/audio/${letter}/${mode}.mp3`;
    const newAudio = new Audio(path);
    if (!audioRefs.current[letter]) {
      audioRefs.current[letter] = { ...INITIAL_STORED_AUDIO };
    }
    // store in ref to avoid re-creating
    audioRefs.current[letter][mode] = newAudio;
    newAudio.onended = onEnded;
    currentlyPlayingAudio = newAudio;
  }

  try {
    currentlyPlayingAudio.play().catch((error) => console.error('Error playing audio:', error));
  } catch (error) {
    console.error('Error playing audio:', error);
  }

  return currentlyPlayingAudio;
};

const letterToUnavailableModesMap: Record<Letter, ModeKey[]> = {
  ya: ['saakin_u'],
  waw: ['saakin_i'],
};

const DEFAULT_MODE = 'a';

const pauseCurrentlyPlayingAudio = (currentlyPlayingRef: React.MutableRefObject<HTMLAudioElement | null>) => {
  if (currentlyPlayingRef.current) {
    currentlyPlayingRef.current.pause();
  }
};

const clearCurrentlyPlayingAudioState = ({
  currentlyPlayingAudioRef,
  setCurrentlyPlayingLetter,
}: {
  currentlyPlayingAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setCurrentlyPlayingLetter: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  if (!currentlyPlayingAudioRef.current) return;
  pauseCurrentlyPlayingAudio(currentlyPlayingAudioRef);
  currentlyPlayingAudioRef.current = null;
  setCurrentlyPlayingLetter(null);
};

function App() {
  const audioRefs = useRef<LetterToAudioElement>({});
  const currentlyPlayingAudioRef = useRef<HTMLAudioElement | null>(null);

  const [selectedMode, setSelectedMode] = useState<ModeKey>(DEFAULT_MODE);
  const [currentlyPlayingLetter, setCurrentlyPlayingLetter] = useState<string | null>(null);

  return (
    <div className={cx('grid place-items-center p-8 bg-stone-200 h-full', "bg-[url('/moroccan.svg')]")}>
      <h1 className='text-4xl font-bold text-stone-600 py-8'>{'\ufdfd'}</h1>
      <div className='grid place-items-center py-4 text-2xl'>
        <ModeSelect
          modes={modes}
          defaultMode={DEFAULT_MODE}
          changeMode={(mode) => {
            setSelectedMode(mode);
            clearCurrentlyPlayingAudioState({
              currentlyPlayingAudioRef,
              setCurrentlyPlayingLetter,
            });
          }}
        />
      </div>
      <div className='border-4 border-stone-100 rounded-md p-8'>
        <div dir='rtl' className='grid place-items-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8'>
          {Object.keys(alphabet).map((letter, index) => {
            const modeIsMissing = letterToUnavailableModesMap[letter]?.includes(selectedMode);

            if (modeIsMissing) {
              return null;
            }

            const buttonLetterIsAlreadyPlaying = currentlyPlayingLetter === letter;

            return (
              <button
                key={index}
                className={cx('pushable', 'bg-stone-400', 'rounded-2xl border-none p-0 outline-offset-4')}
                onClick={() => {
                  clearCurrentlyPlayingAudioState({
                    currentlyPlayingAudioRef,
                    setCurrentlyPlayingLetter,
                  });

                  if (buttonLetterIsAlreadyPlaying) {
                    return;
                  }

                  const currentlyPlayingAudio = playSound({
                    letter,
                    audioRefs,
                    mode: selectedMode,
                    onEnded: () => {
                      clearCurrentlyPlayingAudioState({
                        currentlyPlayingAudioRef,
                        setCurrentlyPlayingLetter,
                      });
                    },
                  });

                  setCurrentlyPlayingLetter(letter);
                  currentlyPlayingAudioRef.current = currentlyPlayingAudio;
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
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
