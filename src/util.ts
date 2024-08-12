export const clearCurrentlyPlayingAudio = ({
  currentlyPlayingAudioRef,
}: {
  currentlyPlayingAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
}) => {
  if (!currentlyPlayingAudioRef.current) return;
  currentlyPlayingAudioRef.current.pause();
  currentlyPlayingAudioRef.current.src = '';
  currentlyPlayingAudioRef.current = null;
};
