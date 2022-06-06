import { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import data from "../data/courses.json";
import { useNavigate } from "react-router-dom";
import bg from "../images/bg.png";
import { useMoralis } from "react-moralis";

export default function MyCourses() {
  let navigate = useNavigate();
  const { Moralis, logout } = useMoralis();
  const logoutFn = async () => {
    await logout();
    window.localStorage.removeItem("connectorId");
    navigate("/");
  };
  return (
    <section
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: `url("${bg}")no-repeat center/cover`,
      }}
    >
      <div
        className="bg-white align-items-center justify-content-center h-75  p-4"
        style={{
          minHeight: "85vh",
          width: "85%",
          borderRadius: "10px",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
        }}
      >
        <div className="d-flex justify-content-end ">
          <Button
            onClick={(e) => {
              navigate("/getCourses");
            }}
          >
            All Courses
          </Button>
          <Typography component="h2" variant="h5">
            |
          </Typography>
          <Button onClick={() => logoutFn()}>Logout</Button>
        </div>
        <h3 className="text-center">My Courses</h3>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3">
            <Card
              sx={{
                maxWidth: 450,
                bgcolor: "#5cdab3",
              }}
            >
              <CardContent>
                <CardMedia
                  component="img"
                  height="120"
                  image="https://www.invensislearning.com/blog/wp-content/uploads/2015/12/Banner-image-12-Principles-of-Agile-Project-Management-and-How-it-Adds-Value.jpg"
                  alt="Agile Methodology"
                />
                <div className="d-flex justify-content-between pt-3">
                  <Typography
                    sx={{ fontSize: 20, fontWeight: "bold" }}
                    color="text.primary"
                    gutterBottom
                  >
                    Agile Methodologies
                  </Typography>
                  <p className="m-0">
                    <b>4</b> Weeks
                  </p>
                </div>

                <Typography color="text.secondary">
                  Learn how to use agile methods to develop software
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/1");
                  }}
                >
                  Go to course
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
