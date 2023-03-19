import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICourse } from "../types/types";
import Loader from "./Loader";
import VideoPlayer from "./VideoPlayer";
import { Button, CardContent, Typography } from "@mui/material";

type CourseItemPageParams = {
  id: string;
};

const LessonPage = () => {
  const [course, setCourse] = useState<ICourse | null>(null);
  const params = useParams<CourseItemPageParams>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  let TOKEN = localStorage.getItem("TOKEN");
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<ICourse>(
        "https://api.wisey.app/api/v1/core/preview-courses/" + params.id,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((response) => {
        if (response.data?.lessons) {
          setSelectedId(response.data.lessons[0].id || "");
        }
        setCourse(response.data);
      })

      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);

  const handleClick = (id: any) => {
    setSelectedId(id !== selectedId ? id : null);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="lessonContainer">
          <div className="lessonContent">
            <Typography mb={3} variant="h4">
              {course?.title}
            </Typography>
            <Typography mb={3} variant="body1">
              {course?.description}
            </Typography>
            <CardContent className="lessonBlock">
              {course?.lessons?.map((lesson) => (
                <div key={lesson.id}>
                  <Typography mb={2} variant="h6" key={lesson.id}>
                    {lesson.title}
                  </Typography>
                  <img
                    src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
                    alt={"pic"}
                    style={{ width: "200px" }}
                  />
                  <div>
                    {lesson.status === "unlocked" ? (
                      <Button variant="outlined" onClick={() => handleClick(lesson.id)}>
                        {selectedId === lesson.id ? "Close lesson" : "Open lesson"}
                      </Button>
                    ) : (
                      <Button variant="outlined" disabled>Open lesson</Button>
                    )}
                  </div>
                  {selectedId === lesson.id && (
                    <VideoPlayer link={lesson.link} />
                  )}
                </div>
              ))}
            </CardContent>
            <br></br><br></br>
            <Button variant="contained" onClick={() => navigate("/courses")}>
                  {"< "}Back to courses
              </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPage;
