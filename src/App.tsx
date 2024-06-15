import cx from "classnames";

const alphabet: {
  [key: string]: { letter: string };
} = {
  alef: { letter: "ا" },
  beh: { letter: "ب" },
  teh: { letter: "ت" },
  theh: { letter: "ث" },
  jeem: { letter: "ج" },
  hah: { letter: "ح" },
  khah: { letter: "خ" },
  dal: { letter: "د" },
  thal: { letter: "ذ" },
  ra: { letter: "ر" },
  zay: { letter: "ز" },
  seen: { letter: "س" },
  sheen: { letter: "ش" },
  sad: { letter: "ص" },
  dad: { letter: "ض" },
  tah: { letter: "ط" },
  zah: { letter: "ظ" },
  ain: { letter: "ع" },
  ghain: { letter: "غ" },
  feh: { letter: "ف" },
  qaf: { letter: "ق" },
  kaf: { letter: "ك" },
  lam: { letter: "ل" },
  meem: { letter: "م" },
  noon: { letter: "ن" },
  ha: { letter: "ه" },
  waw: { letter: "و" },
  ya: { letter: "ي" },
};

const playSound = (letter: string) => {
  const audio = new Audio(`/assets/audio/${letter}/${letter}-maftuh.mp3`);
  audio.play();
};

function App() {
  return (
    <div className="grid place-items-center bg-stone-200 h-screen">
      <div className="border-4 border-stone-400 rounded-md p-16">
        <div dir="rtl" className="grid place-items-center grid-cols-4 gap-10">
          {Object.keys(alphabet).map((letter, index) => (
            <button
              key={index}
              className={cx(
                "pushable",
                "bg-stone-300",
                "rounded-xl border-none p-0 outline-offset-4",
              )}
              onClick={() => playSound(letter)}
            >
              <span
                className={cx(
                  "front",
                  "block p-3 py-[12px] px-[42px] rounded-lg text-[32px] bg-stone-400 text-stone-800 -translate-y-[6px]",
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
