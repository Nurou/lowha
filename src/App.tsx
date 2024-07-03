import cx from 'classnames';
import { useRef, useState } from 'react';

const modes = {
  a: {
    arabicName: 'مفتوح',
    englishName: 'Maftuuh',
    medial: '\ufe77', // https://codepoints.net/U+FE77
  },
  i: {
    arabicName: 'مكسور',
    englishName: 'Maksuur',
    medial: '\ufe7b', // https://codepoints.net/U+FE7B
  },
  u: {
    arabicName: 'مضموم',
    englishName: 'Madhmuum',
    medial: '\ufe79', // https://codepoints.net/U+FE79
  },
  saakin_a: {
    arabicName: 'فتحة ساكنة',
    englishName: 'Saakin preceded by Maftuuh',
    medial: null,
  },
  saakin_u: {
    arabicName: 'ضمة ساكنة',
    englishName: 'Saakin preceded by Madhmuum',
    medial: null,
  },
  saakin_i: {
    arabicName: 'كسرة ساكنة',
    englishName: 'Saakin preceded by Maksuur',
    medial: null,
  },
};

type Mode = keyof typeof modes;

type ExpandUnion<T extends string> = {
  [K in T]: string;
};

type Alphabet = {
  [key: string]: {
    letter: string;
    saakin_a: string;
    saakin_u: string;
    saakin_i: string;
  } & ExpandUnion<Mode>;
};

const alphabet: Alphabet = {
  hamzah: {
    letter: 'أ',
    saakin_a: 'أءْ',
    saakin_u: 'أءْ',
    saakin_i: 'أءْ',
    a: 'أَ',
    u: 'أُ',
    i: 'أِ',
  },
  beh: {
    letter: 'ب',
    saakin_a: 'أَبْ',
    saakin_u: 'أُبْ',
    saakin_i: 'أِبْ',
    a: 'بَ',
    u: 'بُ',
    i: 'بِ',
  },
  teh: {
    letter: 'ت',
    saakin_a: 'أَتْ',
    saakin_u: 'أُتْ',
    saakin_i: 'أِتْ',
    a: 'تَ',
    u: 'تُ',
    i: 'تِ',
  },
  theh: {
    letter: 'ث',
    saakin_a: 'أَثْ',
    saakin_u: 'أُثْ',
    saakin_i: 'أِثْ',
    a: 'ثَ',
    u: 'ثُ',
    i: 'ثِ',
  },
  jeem: {
    letter: 'ج',
    saakin_a: 'أَجْ',
    saakin_u: 'أُجْ',
    saakin_i: 'أِجْ',
    a: 'جَ',
    u: 'جُ',
    i: 'جِ',
  },
  hah: {
    letter: 'ح',
    saakin_a: 'أَحْ',
    saakin_u: 'أُحْ',
    saakin_i: 'أِحْ',
    a: 'حَ',
    u: 'حُ',
    i: 'حِ',
  },
  khah: {
    letter: 'خ',
    saakin_a: 'أَخْ',
    saakin_u: 'أُخْ',
    saakin_i: 'أِخْ',
    a: 'خَ',
    u: 'خُ',
    i: 'خِ',
  },
  dal: {
    letter: 'د',
    saakin_a: 'أَدْ',
    saakin_u: 'أُدْ',
    saakin_i: 'أِدْ',
    a: 'دَ',
    u: 'دُ',
    i: 'دِ',
  },
  thal: {
    letter: 'ذ',
    saakin_a: 'أَذْ',
    saakin_u: 'أُذْ',
    saakin_i: 'أِذْ',
    a: 'ذَ',
    u: 'ذُ',
    i: 'ذِ',
  },
  ra: {
    letter: 'ر',
    saakin_a: 'أَرْ',
    saakin_u: 'أُرْ',
    saakin_i: 'أِرْ',
    a: 'رَ',
    u: 'رُ',
    i: 'رِ',
  },
  zay: {
    letter: 'ز',
    saakin_a: 'أَزْ',
    saakin_u: 'أُزْ',
    saakin_i: 'أِزْ',
    a: 'زَ',
    u: 'زُ',
    i: 'زِ',
  },
  seen: {
    letter: 'س',
    saakin_a: 'أَسْ',
    saakin_u: 'أُسْ',
    saakin_i: 'أِسْ',
    a: 'سَ',
    u: 'سُ',
    i: 'سِ',
  },
  sheen: {
    letter: 'ش',
    saakin_a: 'أَشْ',
    saakin_u: 'أُشْ',
    saakin_i: 'أِشْ',
    a: 'شَ',
    u: 'شُ',
    i: 'شِ',
  },
  sad: {
    letter: 'ص',
    saakin_a: 'أَصْ',
    saakin_u: 'أُصْ',
    saakin_i: 'أِصْ',
    a: 'صَ',
    u: 'صُ',
    i: 'صِ',
  },
  dad: {
    letter: 'ض',
    saakin_a: 'أَضْ',
    saakin_u: 'أُضْ',
    saakin_i: 'أِضْ',
    a: 'ضَ',
    u: 'ضُ',
    i: 'ضِ',
  },
  tah: {
    letter: 'ط',
    saakin_a: 'أَطْ',
    saakin_u: 'أُطْ',
    saakin_i: 'أِطْ',
    a: 'طَ',
    u: 'طُ',
    i: 'طِ',
  },
  zah: {
    letter: 'ظ',
    saakin_a: 'أَظْ',
    saakin_u: 'أُظْ',
    saakin_i: 'أِظْ',
    a: 'ظَ',
    u: 'ظُ',
    i: 'ظِ',
  },
  ain: {
    letter: 'ع',
    saakin_a: 'أَعْ',
    saakin_u: 'أُعْ',
    saakin_i: 'أِعْ',
    a: 'عَ',
    u: 'عُ',
    i: 'عِ',
  },
  ghain: {
    letter: 'غ',
    saakin_a: 'أَغْ',
    saakin_u: 'أُغْ',
    saakin_i: 'أِغْ',
    a: 'غَ',
    u: 'غُ',
    i: 'غِ',
  },
  feh: {
    letter: 'ف',
    saakin_a: 'أَفْ',
    saakin_u: 'أُفْ',
    saakin_i: 'أِفْ',
    a: 'فَ',
    u: 'فُ',
    i: 'فِ',
  },
  qaf: {
    letter: 'ق',
    saakin_a: 'أَقْ',
    saakin_u: 'أُقْ',
    saakin_i: 'أِقْ',
    a: 'قَ',
    u: 'قُ',
    i: 'قِ',
  },
  kaf: {
    letter: 'ك',
    saakin_a: 'أَكْ',
    saakin_u: 'أُكْ',
    saakin_i: 'أِكْ',
    a: 'كَ',
    u: 'كُ',
    i: 'كِ',
  },
  lam: {
    letter: 'ل',
    saakin_a: 'أَلْ',
    saakin_u: 'أُلْ',
    saakin_i: 'أِلْ',
    a: 'لَ',
    u: 'لُ',
    i: 'لِ',
  },
  meem: {
    letter: 'م',
    saakin_a: 'أَمْ',
    saakin_u: 'أُمْ',
    saakin_i: 'أِمْ',
    a: 'مَ',
    u: 'مُ',
    i: 'مِ',
  },
  noon: {
    letter: 'ن',
    saakin_a: 'أَنْ',
    saakin_u: 'أُنْ',
    saakin_i: 'أِنْ',
    a: 'نَ',
    u: 'نُ',
    i: 'نِ',
  },
  ha: {
    letter: 'ه',
    saakin_a: 'أَهْ',
    saakin_u: 'أُهْ',
    saakin_i: 'أِهْ',
    a: 'هَ',
    u: 'هُ',
    i: 'هِ',
  },
  waw: {
    letter: 'و',
    saakin_a: 'أَوْ',
    saakin_u: 'أُوْ',
    saakin_i: 'أِوْ',
    a: 'وَ',
    u: 'وُ',
    i: 'وِ',
  },
  ya: {
    letter: 'ي',
    saakin_a: 'أَيْ',
    saakin_u: 'أُيْ',
    saakin_i: 'أِيْ',
    a: 'يَ',
    u: 'يُ',
    i: 'يِ',
  },
} as const;

const playSound = ({
  letter,
  audioRefs,
  mode,
}: {
  letter: string;
  audioRefs: React.MutableRefObject<Record<string, Record<Mode, HTMLAudioElement>>>;
  mode: Mode;
}) => {
  if (!audioRefs.current[letter]) {
    audioRefs.current[letter] = {} as Record<Mode, HTMLAudioElement>;
  }
  // check if audio element already exists
  const storedAudio = audioRefs.current[letter][mode];

  if (storedAudio) {
    storedAudio.currentTime = 0; // reset to start
    storedAudio.play();
    return;
  } else {
    // create new audio element
    const path = `/assets/audio/${letter}/${mode}.mp3`;
    const audio = new Audio(path);
    audio.play();
    // store in ref for future use
    audioRefs.current[letter][mode] = audio;
  }
};

const missingModes: Record<keyof typeof alphabet, Mode[]> = {
  ya: ['saakin_u'],
  waw: ['saakin_i'],
};

function App() {
  const audioRefs = useRef({});
  const defaultMode = 'a';
  const [selectedMode, setSelectedMode] = useState<Mode>(defaultMode);

  return (
    <div className={cx('grid place-items-center p-8 bg-stone-200 h-full', "bg-[url('/moroccan.svg')]")}>
      <h1 className='text-4xl font-bold text-stone-600 py-8'>{'\ufdfd'}</h1>
      <div className='border-4 border-stone-100 rounded-md p-8'>
        <div className='flex flex-wrap max-w-[800px] flex-col sm:flex-row justify-center align-center text-2xl gap-4 p-8'>
          {Object.keys(modes).map((mode, index) => {
            const displayName = modes[mode as Mode].englishName;
            const medial = modes[mode as Mode].medial;
            return (
              <div key={index} className='flex items-center gap-4'>
                <input
                  type='radio'
                  id={mode}
                  name='mode'
                  value={mode}
                  className='mr-2'
                  defaultChecked={mode === defaultMode}
                  onChange={() => setSelectedMode(mode as Mode)}
                />
                <label htmlFor={mode} className='text-stone-600'>
                  {displayName} {medial && `( ${medial} )`}
                </label>
              </div>
            );
          })}
        </div>
        <div dir='rtl' className='grid place-items-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8'>
          {Object.keys(alphabet).map((letter, index) => {
            const modeIsMissing = missingModes[letter]?.includes(selectedMode);

            return (
              <button
                key={index}
                className={cx(
                  !modeIsMissing && 'pushable',
                  'bg-stone-400',
                  'rounded-2xl border-none p-0 outline-offset-4'
                )}
                onClick={() => playSound({ letter, audioRefs, mode: selectedMode })}
                disabled={modeIsMissing}
              >
                <span
                  className={cx(
                    !modeIsMissing && 'front',
                    'block p-2 py-[12px] px-[42px] rounded-2xl text-[32px] font-semibold bg-stone-300 text-stone-600 -translate-y-[6px]',
                    modeIsMissing && 'opacity-50'
                  )}
                >
                  {modeIsMissing ? '🔇' : alphabet[letter][selectedMode]}
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
