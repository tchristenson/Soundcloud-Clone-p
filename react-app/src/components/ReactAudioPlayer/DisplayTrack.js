import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, sessionUser }) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
// console.log("this is the current user ======>", sessionUser)
  return (
    <div>
      <audio src={currentTrack.content} ref={audioRef}  onLoadedMetadata={onLoadedMetadata}/>
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack.coverImage ? (
            <img src={currentTrack.coverImage} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{currentTrack.name}</p>
          <p>{/* currentTrack.ownerId */}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
