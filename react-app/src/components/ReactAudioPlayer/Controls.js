import { useState, useEffect, useRef, useCallback } from "react";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";

const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const playAnimationRef = useRef();

  // if(audioRef === null) {
    //   audioRef.current = <audio src="http://vibillow-songs.s3.amazonaws.com/0ae94e4ea5e34441b032038b63dbc95d.wav"></audio>
    // }

    // console.log('audio REFERENCE: ===>', audioRef.current.currentTime)
  const repeat = useCallback(() => {
    if (audioRef.current) {
      // console.log('audioRef', audioRef)
      // console.log('audioRef.current', audioRef.current)
      // console.log('audioRef.current.currentTime', audioRef.current.currentTime)
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty("--range-progress", `${(progressBarRef.current.value / duration) * 100}%`);

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        {/* <button onclick={handlePrevios}>
          <IoPlaySkipBackSharp />
        </button> */}
        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>{isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}</button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>
        {/* <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button> */}
      </div>
      <div className="controls-wrapper">
        <div className="controls">{/* ... */}</div>
        <div className="volume">
          <button onClick={() => setMuteVolume((prev) => !prev)}>
            {muteVolume || volume < 5 ? <IoMdVolumeOff /> : volume < 40 ? <IoMdVolumeLow /> : <IoMdVolumeHigh />}
          </button>
          <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default Controls;
