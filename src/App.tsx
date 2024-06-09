import { useState } from "react";

const arabicKeyCodes = [
  { letter: "ا" },
  { letter: "ب" },
  { letter: "ت" },
  { letter: "ث" },
  { letter: "ج" },
  { letter: "ح" },
  { letter: "خ" },
  { letter: "د" },
  { letter: "ذ" },
  { letter: "ر" },
  { letter: "ز" },
  { letter: "س" },
  { letter: "ش" },
  { letter: "ص" },
  { letter: "ض" },
  { letter: "ط" },
  { letter: "ظ" },
  { letter: "ع" },
  { letter: "غ" },
  { letter: "ف" },
  { letter: "ق" },
  { letter: "ك" },
  { letter: "ل" },
  { letter: "م" },
  { letter: "ن" },
  { letter: "ه" },
  { letter: "و" },
  { letter: "ي" },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
