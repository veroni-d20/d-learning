import { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import data from "../data/courses.json";

export default function MyCourses() {
  return (
    <div
      className="vh-100 px-5"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <h3 className="text-center py-5">My Courses</h3>
      <div className="row">
        <div className="col-md-6 col-lg-4 mb-3">
          <Card sx={{ maxWidth: 500 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold" }}
                color="text.primary"
                gutterBottom
              >
                Agile methodology
              </Typography>
              <Typography color="text.secondary">Duration: 4 weeks</Typography>
              <Typography variant="body2">
                <br />
                Learn how to use agile methods to develop software
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
