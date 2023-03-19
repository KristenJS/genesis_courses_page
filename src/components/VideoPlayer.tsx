import React, { FC, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Button, CardActions, CircularProgress } from "@mui/material";

interface VideoItemProps {
  link: string;
}

const VideoPlayer: FC<VideoItemProps> = ({ link }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const hls = new Hls();
    hls.loadSource(link);
    hls.attachMedia(video);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      hls.destroy();
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [link]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setIsLoading(false);
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const handlePictureInPicture = () => {
    if (!videoRef.current) return;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      videoRef.current.requestPictureInPicture();
    }
  };

  const handleSaveProgress = () => {
    if (!videoRef.current) return;
    localStorage.setItem(link, JSON.stringify(videoRef.current.currentTime));
  };

  const handleResumePlayback = () => {
    if (!videoRef.current) return;
    const progress = localStorage.getItem(link);
    if (progress) {
      videoRef.current.currentTime = JSON.parse(progress);
    }
  };

  return (
    <div>
      {isLoading && (
        <div>
          <CircularProgress />
        </div>
      )}
      <video
        ref={videoRef}
        className="videoBlock"
        height="auto"
        controls
      ></video>

      <CardActions className="videoButtons">
        <div>
          <button onClick={() => handlePlaybackRateChange(1)}>1x</button>
          <button onClick={() => handlePlaybackRateChange(1.5)}>1.5x</button>
          <button onClick={() => handlePlaybackRateChange(2)}>2x</button>
        </div>
        <Button variant="contained" onClick={handlePictureInPicture}>
          Pic-in-pic
        </Button>
        <Button variant="outlined" color="error" onClick={handleSaveProgress}>
          Save Progress
        </Button>
        <Button variant="outlined" color="error" onClick={handleResumePlayback}>
          Playback
        </Button>
      </CardActions>
      <div className="time">Time: {currentTime.toFixed(1)}</div>
    </div>
  );
};

export default VideoPlayer;
