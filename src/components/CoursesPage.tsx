import React, { FC, useEffect, useState } from "react";
import axios, { AxiosInstance } from "axios";
import { ICourse } from "../types/types";
import CoursesList from "./CoursesList";
import Loader from "./Loader";

interface ICoursesList {
  courses: ICourse[];
}

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance: AxiosInstance = axios.create();

  axiosInstance.defaults.baseURL = "https://api.wisey.app/api/v1";

  const fetchData = async () => {
    try {
      let TOKEN;
      if (localStorage.getItem("TOKEN")) {
        TOKEN = localStorage.getItem("TOKEN");
      } else {
        const tokenResponse = await axiosInstance.get(
          "/auth/anonymous?platform=subscriptions"
        );
        TOKEN = tokenResponse.data.token;
        localStorage.setItem("TOKEN", TOKEN);
      }

      const coursesResponse = await axiosInstance.get<ICoursesList>(
        "/core/preview-courses",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setCourses(coursesResponse.data.courses);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CoursesList courses={courses} />
        </>
      )}
    </div>
  );
};

export default CoursesPage;
