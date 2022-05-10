import React from "react";
import ReactPlayer from "react-player";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export default function Video() {
  const { Moralis } = useMoralis();
  let navigate = useNavigate();

  const logout = async () => {
    Moralis.User.logOut();
    console.log("logged out");
    navigate("/");
  };
  return (
    <div className="vh-100 p-4">
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
      <div className="container d-flex flex-column  my-4">
        <h3>Agile Methodology</h3>
        <hr></hr>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=zsjvFFKOm3c"
          muted={false}
          volume={true}
          playing={false}
          controls={true}
          width="100%"
        />
        <div className="d-flex justify-content-between rounded-2-bottom py-4">
          <div>
            <h5>Learn how to use agile methods to develop software</h5>
          </div>
          <div>
            <p>
              <b>4</b> Weeks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
