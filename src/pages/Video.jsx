import React from "react";
import ReactPlayer from "react-player";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

export default function Video() {
  const { Moralis, authenticate, isAuthenticated } = useMoralis();
  let navigate = useNavigate();

  const logout = async () => {
    Moralis.User.logOut();
    console.log("logged out");
    navigate("/");
  };
  return (
    <div className="vh-100 p-4 w-100">
      <div className="d-flex justify-content-end">
        <Button
          onClick={(e) => {
            navigate("/getCourses");
          }}
        >
          Get Courses
        </Button>
        <Typography component="h2" variant="h5">
          |
        </Typography>
        <Button onClick={logout}>Logout</Button>
      </div>
      <div className="m-2">
        <h3>Agile Methodology</h3>
      </div>
      <ReactPlayer url="https://www.youtube.com/watch?v=zsjvFFKOm3c" />

      <div>
        <p>
          <b>Duration:</b> 4 weeks
        </p>
        <h5>Description: Learn how to use agile methods to develop software</h5>
      </div>
    </div>
  );
}
