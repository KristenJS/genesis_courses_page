import React, { FC, useRef, useEffect } from "react";
import { ICourse } from "../types/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Hls from "hls.js";

interface CourseItemProps {
  course: ICourse;
  onClick: (course: ICourse) => void;
}

const CourseItem: FC<CourseItemProps> = ({ course, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const hls = new Hls();
    if (course.meta.courseVideoPreview.link) {
      hls.loadSource(course.meta.courseVideoPreview.link);
      hls.attachMedia(video);
    }

    function handleMouseOver() {
      video.muted = true;
      video.play();
    }

    function handleMouseOut() {
      video.muted = false;
      video.pause();
    }

    video.addEventListener("mouseover", handleMouseOver);
    video.addEventListener("mouseout", handleMouseOut);

    return () => {
      hls.destroy();
      video.removeEventListener("mouseover", handleMouseOver);
      video.removeEventListener("mouseout", handleMouseOut);
    };
  }, [course.meta.courseVideoPreview]);

  return (
    <Card className="card">
      <div>
        <CardMedia className="cardMedia">
          <img src={`${course.previewImageLink}/cover.webp`} alt={""} />
        </CardMedia>
        <CardContent>
          <Typography mb={2} variant="h6">
            {course.title}
          </Typography>
          <Typography variant="button">
            Lessons count: {course.lessonsCount}
          </Typography>
          <div>
            {course.meta.skills &&
              course.meta.skills.map((skill) => (
                <ul key={skill}>
                  <li>
                    <Typography variant="body2">{skill}</Typography>
                  </li>
                </ul>
              ))}
          </div>
          {course.meta.courseVideoPreview && <video className='cardVideo' ref={videoRef} controls />}
          <br></br>
          <Typography variant="button">Rating: {course.rating}</Typography>
        </CardContent>
      </div>
      <div>
        <CardActions className="cardActions">
          <Button onClick={() => onClick(course)}>Open course</Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default CourseItem;
