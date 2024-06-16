import cx from 'classnames';
import { useRef } from 'react';

const alphabet: {
  [key: string]: { letter: string };
} = {
  alef: { letter: 'ا' },
  beh: { letter: 'ب' },
  teh: { letter: 'ت' },
  theh: { letter: 'ث' },
  jeem: { letter: 'ج' },
  hah: { letter: 'ح' },
  khah: { letter: 'خ' },
  dal: { letter: 'د' },
  thal: { letter: 'ذ' },
  ra: { letter: 'ر' },
  zay: { letter: 'ز' },
  seen: { letter: 'س' },
  sheen: { letter: 'ش' },
  sad: { letter: 'ص' },
  dad: { letter: 'ض' },
  tah: { letter: 'ط' },
  zah: { letter: 'ظ' },
  ain: { letter: 'ع' },
  ghain: { letter: 'غ' },
  feh: { letter: 'ف' },
  qaf: { letter: 'ق' },
  kaf: { letter: 'ك' },
  lam: { letter: 'ل' },
  meem: { letter: 'م' },
  noon: { letter: 'ن' },
  ha: { letter: 'ه' },
  waw: { letter: 'و' },
  ya: { letter: 'ي' },
};

const playSound = ({
  letter,
  audioRefs,
}: {
  letter: string;
  audioRefs: React.MutableRefObject<{ [key: string]: HTMLAudioElement }>;
}) => {
  console.log('Playing sound for letter:', letter);
  // check if audio element already exists
  const storedAudio = audioRefs.current[letter];
  if (storedAudio) {
    storedAudio.currentTime = 0; // reset to start
    storedAudio.play();
    return;
  } else {
    // create new audio element
    const audio = new Audio(`/assets/audio/${letter}/${letter}-maftuh.mp3`);
    audio.play();
    // store in ref for future use
    audioRefs.current[letter] = audio;
  }
};

function App() {
  // store each audio element in shared ref
  const audioRefs = useRef({});

  return (
    <div className={cx('grid place-items-center bg-stone-200 h-screen', "bg-[url('/moroccan.svg')]")}>
      <div className='border-4 border-stone-100 rounded-md p-16'>
        <div dir='rtl' className='grid place-items-center grid-cols-4 gap-10'>
          {Object.keys(alphabet).map((letter, index) => (
            <button
              key={index}
              className={cx('pushable', 'bg-stone-400', 'rounded-2xl border-none p-0 outline-offset-4')}
              onClick={() => playSound({ letter, audioRefs })}
            >
              <span
                className={cx(
                  'front',
                  'block p-3 py-[12px] px-[42px] rounded-2xl text-[32px] font-semibold bg-stone-300 text-stone-600 -translate-y-[6px]'
                )}
              >
                {alphabet[letter].letter}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
