import cx from 'classnames';
import { useRef, useState } from 'react';
import { ModeSelect } from './ModeSelect';
import { ModeKey, alphabet, modes } from './constants';

const playSound = ({
  letter,
  audioRefs,
  currentlyPlayingRef,
  mode,
}: {
  letter: string;
  audioRefs: React.MutableRefObject<Record<string, Record<ModeKey, HTMLAudioElement>>>;
  currentlyPlayingRef: React.MutableRefObject<HTMLAudioElement | null>;
  mode: ModeKey;
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
  }
};

const missingModes: Record<keyof typeof alphabet, ModeKey[]> = {
  ya: ['saakin_u'],
  waw: ['saakin_i'],
};

function App() {
  const audioRefs = useRef({});
  const currentlyPlayingRef = useRef(null);

  const defaultMode = 'a';
  const [selectedMode, setSelectedMode] = useState<ModeKey>(defaultMode);
  console.log('💩 ~ selectedMode:', selectedMode);

  return (
    <div className={cx('grid place-items-center p-8 bg-stone-200 h-full', "bg-[url('/moroccan.svg')]")}>
      <h1 className='text-4xl font-bold text-stone-600 py-8'>{'\ufdfd'}</h1>
      <div className='grid place-items-center p-8 text-2xl'>
        <ModeSelect modes={modes} defaultMode={defaultMode} changeMode={setSelectedMode} />
      </div>
      <div className='border-4 border-stone-100 rounded-md p-8'>
        <div dir='rtl' className='grid place-items-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8'>
          {Object.keys(alphabet).map((letter, index) => {
            const modeIsMissing = missingModes[letter]?.includes(selectedMode);

            if (modeIsMissing) {
              return null;
            }

            return (
              <button
                key={index}
                className={cx('pushable', 'bg-stone-400', 'rounded-2xl border-none p-0 outline-offset-4')}
                onClick={() => playSound({ letter, audioRefs, currentlyPlayingRef, mode: selectedMode })}
                disabled={modeIsMissing}
              >
                <span
                  className={cx(
                    'front',
                    'block p-2 py-[12px] px-[42px] rounded-2xl text-[32px] font-semibold bg-stone-300 text-stone-600 -translate-y-[6px]'
                  )}
                >
                  {alphabet[letter][selectedMode]}
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
