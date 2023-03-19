import React, { useState } from "react";
import { ICourse } from "../types/types";
import CourseItem from "./CourseItem";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Pagination } from "@mui/material";

interface CourseListProps {
  courses: ICourse[];
}

const PAGE_SIZE = 10;

const CoursesList: React.FC<CourseListProps> = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalCourses = courses.length;
  const totalPages = Math.ceil(totalCourses / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const coursesRender = courses.slice(startIndex, endIndex);

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }} className="box">
      <Grid className="grid" container rowSpacing={5} columnSpacing={5}>
        {coursesRender.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CourseItem
              course={course}
              onClick={(course) => navigate("/courses/" + course.id)}
            />
          </Grid>
        ))}
      </Grid>
      <br></br>
      <div className="pagination">
        <Pagination
          count={totalPages}
          variant="outlined"
          color="primary"
          page={currentPage}
          onChange={(_, page) => {
            if (page !== null) {
              setCurrentPage(page);
            }
          }}
        />
      </div>
    </Box>
  );
};

export default CoursesList;
