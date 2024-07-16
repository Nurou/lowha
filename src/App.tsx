import cx from 'classnames';
import { useRef, useState } from 'react';
import { ModeSelect } from './ModeSelect';
import { Letter, ModeKey, alphabet, modes } from './constants';
import { Pause } from 'lucide-react';

type LetterToAudioElement = Record<Letter, Record<ModeKey, HTMLAudioElement>>;

const playSound = ({
  letter,
  audioRefs,
  currentlyPlayingRef,
  mode,
  onEnded,
}: {
  letter: string;
  audioRefs: React.MutableRefObject<LetterToAudioElement>;
  currentlyPlayingRef: React.MutableRefObject<HTMLAudioElement | null>;
  mode: ModeKey;
  onEnded: () => void;
}) => {
  // stop currently playing audio
  if (currentlyPlayingRef.current) {
    currentlyPlayingRef.current.pause();
  }

  if (!audioRefs.current[letter]) {
    audioRefs.current[letter] = {} as Record<ModeKey, HTMLAudioElement>;
  }
  // check if audio element already exists
  const storedAudio = audioRefs.current[letter][mode];

  if (storedAudio) {
    storedAudio.currentTime = 0; // reset to start
    storedAudio.play();
    currentlyPlayingRef.current = storedAudio;
    return;
  } else {
    const path = mode === 'combined' ? `/assets/audio/combined/${letter}.mp3` : `/assets/audio/${letter}/${mode}.mp3`;
    const audio = new Audio(path);
    audio.play();
    currentlyPlayingRef.current = audio;
    // store in ref for future use
    audioRefs.current[letter][mode] = audio;
    audio.onended = onEnded;
  }

  currentlyPlayingRef.current.id = letter;
};

const pauseSound = (currentlyPlayingRef: React.MutableRefObject<HTMLAudioElement | null>) => {
  if (currentlyPlayingRef.current) {
    currentlyPlayingRef.current.pause();
  }
};

const unavailableModes: Record<Letter, ModeKey[]> = {
  ya: ['saakin_u'],
  waw: ['saakin_i'],
};

const DEFAULT_MODE = 'a';

function App() {
  const audioRefs = useRef<LetterToAudioElement>({});
  const currentlyPlayingRef = useRef<HTMLAudioElement>(null);

  const [selectedMode, setSelectedMode] = useState<ModeKey>(DEFAULT_MODE);
  const [currentlyPlayingLetter, setCurrentlyPlayingLetter] = useState<string | null>(null);

  return (
    <div className={cx('grid place-items-center p-8 bg-stone-200 h-full', "bg-[url('/moroccan.svg')]")}>
      <h1 className='text-4xl font-bold text-stone-600 py-8'>{'\ufdfd'}</h1>
      <div className='grid place-items-center py-4 text-2xl'>
        <ModeSelect modes={modes} defaultMode={DEFAULT_MODE} changeMode={setSelectedMode} />
      </div>
      <div className='border-4 border-stone-100 rounded-md p-8'>
        <div dir='rtl' className='grid place-items-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8'>
          {Object.keys(alphabet).map((letter, index) => {
            const modeIsMissing = unavailableModes[letter]?.includes(selectedMode);

            if (modeIsMissing) {
              return null;
            }

            const letterAudioIsPLaying = currentlyPlayingLetter === letter;

            return (
              <button
                key={index}
                className={cx('pushable', 'bg-stone-400', 'rounded-2xl border-none p-0 outline-offset-4')}
                onClick={() => {
                  if (letterAudioIsPLaying) {
                    pauseSound(currentlyPlayingRef);
                    setCurrentlyPlayingLetter(null);
                    return;
                  }

                  playSound({
                    letter,
                    audioRefs,
                    currentlyPlayingRef,
                    mode: selectedMode,
                    onEnded: () => setCurrentlyPlayingLetter(null),
                  });
                  setCurrentlyPlayingLetter(letter);
                }}
                disabled={modeIsMissing}
              >
                <span
                  className={cx(
                    'front',
                    'grid place-items-center p-2 py-[12px] px-[42px] rounded-2xl text-[32px] font-semibold bg-stone-300 text-stone-600 -translate-y-[6px] min-h-[80px]'
                  )}
                >
                  {letterAudioIsPLaying ? <Pause /> : alphabet[letter][selectedMode]}
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
