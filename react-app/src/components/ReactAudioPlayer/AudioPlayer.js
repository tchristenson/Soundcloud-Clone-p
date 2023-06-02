import { useRef, useState} from "react";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";


const AudioPlayer = ({song, sessionUser}) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // console.log("song info",  song)
  // if(!song) {
  //   song =
  // }



  const audioRef = useRef();
  const progressBarRef = useRef()

  const currentTrack = song;
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack   {...{ currentTrack, audioRef, setDuration, progressBarRef, sessionUser }} />
        <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress }} />
        <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
      </div>
    </div>
  );
};
export default AudioPlayer;
