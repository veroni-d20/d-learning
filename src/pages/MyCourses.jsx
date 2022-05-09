import React from "react";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import data from "../data/courses.json";

export default function MyCourses() {
  return (
    <div
      className="vh-100 px-5"
      style={{
        backgroundColor: "#d0e8f2",
      }}
    >
      <h3 className="py-5">My Courses</h3>
      <div className="row">
        {data.map((course, index) => (
          <div className="col-md-6 col-lg-4 mb-3" key={index}>
            <Card sx={{ maxWidth: 500 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                  color="text.primary"
                  gutterBottom
                >
                  {course.couseName}
                </Typography>
                <Typography color="text.secondary">
                  Duration: {course.duration}
                </Typography>
                <Typography variant="body2">
                  <br />
                  {course.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
