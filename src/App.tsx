import cx from "classnames";
import { useRef, useState } from "react";

type Mode = "maftuuh" | "madmuum" | "maksuur";

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
    letter: "ء",
    saakin_a: "أَءْ",
    saakin_u: "أُءْ",
    saakin_i: "أِءْ",
    maftuuh: "ءَ",
    madmuum: "ءُ",
    maksuur: "ءِ",
  },
  beh: {
    letter: "ب",
    saakin_a: "أَبْ",
    saakin_u: "أُبْ",
    saakin_i: "أِبْ",
    maftuuh: "بَ",
    madmuum: "بُ",
    maksuur: "بِ",
  },
  teh: {
    letter: "ت",
    saakin_a: "أَتْ",
    saakin_u: "أُتْ",
    saakin_i: "أِتْ",
    maftuuh: "تَ",
    madmuum: "تُ",
    maksuur: "تِ",
  },
  theh: {
    letter: "ث",
    saakin_a: "أَثْ",
    saakin_u: "أُثْ",
    saakin_i: "أِثْ",
    maftuuh: "ثَ",
    madmuum: "ثُ",
    maksuur: "ثِ",
  },
  jeem: {
    letter: "ج",
    saakin_a: "أَجْ",
    saakin_u: "أُجْ",
    saakin_i: "أِجْ",
    maftuuh: "جَ",
    madmuum: "جُ",
    maksuur: "جِ",
  },
  hah: {
    letter: "ح",
    saakin_a: "أَحْ",
    saakin_u: "أُحْ",
    saakin_i: "أِحْ",
    maftuuh: "حَ",
    madmuum: "حُ",
    maksuur: "حِ",
  },
  khah: {
    letter: "خ",
    saakin_a: "أَخْ",
    saakin_u: "أُخْ",
    saakin_i: "أِخْ",
    maftuuh: "خَ",
    madmuum: "خُ",
    maksuur: "خِ",
  },
  dal: {
    letter: "د",
    saakin_a: "أَدْ",
    saakin_u: "أُدْ",
    saakin_i: "أِدْ",
    maftuuh: "دَ",
    madmuum: "دُ",
    maksuur: "دِ",
  },
  thal: {
    letter: "ذ",
    saakin_a: "أَذْ",
    saakin_u: "أُذْ",
    saakin_i: "أِذْ",
    maftuuh: "ذَ",
    madmuum: "ذُ",
    maksuur: "ذِ",
  },
  ra: {
    letter: "ر",
    saakin_a: "أَرْ",
    saakin_u: "أُرْ",
    saakin_i: "أِرْ",
    maftuuh: "رَ",
    madmuum: "رُ",
    maksuur: "رِ",
  },
  zay: {
    letter: "ز",
    saakin_a: "أَزْ",
    saakin_u: "أُزْ",
    saakin_i: "أِزْ",
    maftuuh: "زَ",
    madmuum: "زُ",
    maksuur: "زِ",
  },
  seen: {
    letter: "س",
    saakin_a: "أَسْ",
    saakin_u: "أُسْ",
    saakin_i: "أِسْ",
    maftuuh: "سَ",
    madmuum: "سُ",
    maksuur: "سِ",
  },
  sheen: {
    letter: "ش",
    saakin_a: "أَشْ",
    saakin_u: "أُشْ",
    saakin_i: "أِشْ",
    maftuuh: "شَ",
    madmuum: "شُ",
    maksuur: "شِ",
  },
  sad: {
    letter: "ص",
    saakin_a: "أَصْ",
    saakin_u: "أُصْ",
    saakin_i: "أِصْ",
    maftuuh: "صَ",
    madmuum: "صُ",
    maksuur: "صِ",
  },
  dad: {
    letter: "ض",
    saakin_a: "أَضْ",
    saakin_u: "أُضْ",
    saakin_i: "أِضْ",
    maftuuh: "ضَ",
    madmuum: "ضُ",
    maksuur: "ضِ",
  },
  tah: {
    letter: "ط",
    saakin_a: "أَطْ",
    saakin_u: "أُطْ",
    saakin_i: "أِطْ",
    maftuuh: "طَ",
    madmuum: "طُ",
    maksuur: "طِ",
  },
  zah: {
    letter: "ظ",
    saakin_a: "أَظْ",
    saakin_u: "أُظْ",
    saakin_i: "أِظْ",
    maftuuh: "ظَ",
    madmuum: "ظُ",
    maksuur: "ظِ",
  },
  ain: {
    letter: "ع",
    saakin_a: "أَعْ",
    saakin_u: "أُعْ",
    saakin_i: "أِعْ",
    maftuuh: "عَ",
    madmuum: "عُ",
    maksuur: "عِ",
  },
  ghain: {
    letter: "غ",
    saakin_a: "أَغْ",
    saakin_u: "أُغْ",
    saakin_i: "أِغْ",
    maftuuh: "غَ",
    madmuum: "غُ",
    maksuur: "غِ",
  },
  feh: {
    letter: "ف",
    saakin_a: "أَفْ",
    saakin_u: "أُفْ",
    saakin_i: "أِفْ",
    maftuuh: "فَ",
    madmuum: "فُ",
    maksuur: "فِ",
  },
  qaf: {
    letter: "ق",
    saakin_a: "أَقْ",
    saakin_u: "أُقْ",
    saakin_i: "أِقْ",
    maftuuh: "قَ",
    madmuum: "قُ",
    maksuur: "قِ",
  },
  kaf: {
    letter: "ك",
    saakin_a: "أَكْ",
    saakin_u: "أُكْ",
    saakin_i: "أِكْ",
    maftuuh: "كَ",
    madmuum: "كُ",
    maksuur: "كِ",
  },
  lam: {
    letter: "ل",
    saakin_a: "أَلْ",
    saakin_u: "أُلْ",
    saakin_i: "أِلْ",
    maftuuh: "لَ",
    madmuum: "لُ",
    maksuur: "لِ",
  },
  meem: {
    letter: "م",
    saakin_a: "أَمْ",
    saakin_u: "أُمْ",
    saakin_i: "أِمْ",
    maftuuh: "مَ",
    madmuum: "مُ",
    maksuur: "مِ",
  },
  noon: {
    letter: "ن",
    saakin_a: "أَنْ",
    saakin_u: "أُنْ",
    saakin_i: "أِنْ",
    maftuuh: "نَ",
    madmuum: "نُ",
    maksuur: "نِ",
  },
  ha: {
    letter: "ه",
    saakin_a: "أَهْ",
    saakin_u: "أُهْ",
    saakin_i: "أِهْ",
    maftuuh: "هَ",
    madmuum: "هُ",
    maksuur: "هِ",
  },
  waw: {
    letter: "و",
    saakin_a: "أَوْ",
    saakin_u: "أُوْ",
    saakin_i: "أِوْ",
    maftuuh: "وَ",
    madmuum: "وُ",
    maksuur: "وِ",
  },
  ya: {
    letter: "ي",
    saakin_a: "أَيْ",
    saakin_u: "أُيْ",
    saakin_i: "أِيْ",
    maftuuh: "يَ",
    madmuum: "يُ",
    maksuur: "يِ",
  },
};

const modes: {
  [key in Mode]: {
    name: string;
    harakah: string;
    medial: string;
  };
} = {
  maftuuh: {
    // \ufdfd
    // name: 'مفتوح',
    name: "maftuuh", // 'مفتوح
    harakah: "\u0650", // Arabic Small Fatha (U+0618)
    medial: "\ufe77", // https://codepoints.net/U+FE77
  },
  maksuur: {
    // name: 'مكسور',
    name: "maksuur", // 'مكسور
    harakah: "ؚ", // Arabic Small Kasra (U+061A)
    medial: "\ufe7b", // https://codepoints.net/U+FE7B
  },
  madmuum: {
    // name: "مضموم",
    name: "madmuum", // 'مضموم
    harakah: "ؙ", // Arabic Small Damma (U+0619)
    medial: "\ufe79", // https://codepoints.net/U+FE79
  },
};

const playSound = ({
  letter,
  audioRefs,
  mode,
}: {
  letter: string;
  audioRefs: React.MutableRefObject<
    Record<string, Record<Mode, HTMLAudioElement>>
  >;
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
    const audio = new Audio(`/assets/audio/${letter}/${letter}-${mode}.mp3`);
    audio.play();
    // store in ref for future use
    audioRefs.current[letter][mode] = audio;
  }
};

function App() {
  const audioRefs = useRef({});
  const defaultMode = "maftuuh";
  const [selectedMode, setSelectedMode] = useState<Mode>(defaultMode);

  return (
    <div
      className={cx(
        "grid place-items-center p-8 bg-stone-200 h-full",
        "bg-[url('/moroccan.svg')]",
      )}
    >
      <h1 className="text-4xl font-bold text-stone-600 py-8">{"\ufdfd"}</h1>
      <div className="border-4 border-stone-100 rounded-md p-4">
        <div className="flex gap-4 flex-wrap py-4 mb-4 text-4xl ">
          {Object.keys(modes).map((mode, index) => {
            return (
              <div key={index} className="flex items-center gap-4">
                <input
                  type="radio"
                  id={mode}
                  name="mode"
                  value={mode}
                  className="mr-2"
                  defaultChecked={mode === defaultMode}
                  onChange={() => setSelectedMode(mode as Mode)}
                />
                <label dir="rtl" htmlFor={mode} className="text-stone-600">
                  {modes[mode as Mode].name} ( {modes[mode as Mode].medial} )
                </label>
              </div>
            );
          })}
        </div>
        <div
          dir="rtl"
          className="grid place-items-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-10"
        >
          {Object.keys(alphabet).map((letter, index) => (
            <button
              key={index}
              className={cx(
                "pushable",
                "bg-stone-400",
                "rounded-2xl border-none p-0 outline-offset-4",
              )}
              onClick={() =>
                playSound({ letter, audioRefs, mode: selectedMode })
              }
            >
              <span
                className={cx(
                  "front",
                  "block p-2 py-[12px] px-[42px] rounded-2xl text-[32px] font-semibold bg-stone-300 text-stone-600 -translate-y-[6px]",
                )}
              >
                {alphabet[letter][selectedMode]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
