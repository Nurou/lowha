import cx from 'classnames';
import { useRef, useState } from 'react';
import { ModeSelect } from './mode-select';
import { ModeKey, modes } from './constants';
import { Keyboard } from './keyboard';
import { clearCurrentlyPlayingAudio } from './util';

const DEFAULT_MODE = 'a'; // maftuuh

const App = () => {
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
            clearCurrentlyPlayingAudio({
              currentlyPlayingAudioRef,
            });
            setCurrentlyPlayingLetter(null);
          }}
        />
      </div>
      <div className='border-4 border-stone-100 rounded-md p-8'>
        <div dir='rtl' className='grid place-items-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8'>
          <Keyboard
            selectedMode={selectedMode}
            currentlyPlayingLetter={currentlyPlayingLetter}
            currentlyPlayingAudioRef={currentlyPlayingAudioRef}
            setCurrentlyPlayingLetter={setCurrentlyPlayingLetter}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
