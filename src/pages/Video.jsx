import React from "react";
import ReactPlayer from "react-player";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import bg from "../images/bg.png";
import video from "../images/agile.mp4";

export default function Video() {
  const { Moralis, logout } = useMoralis();
  let navigate = useNavigate();

  const logoutFn = async () => {
    await logout();
    window.localStorage.removeItem("connectorId");
    navigate("/");
  };
  return (
    <>
      <section
        className="d-flex flex-column align-items-center justify-content-center vh-100"
        style={{
          background: `url("${bg}")no-repeat center/cover`,
        }}
      >
        <div
          className="bg-white align-items-center justify-content-center h-75"
          style={{
            minHeight: "85vh",
            width: "85%",
            borderRadius: "10px",
            boxShadow:
              "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
          }}
        >
          <div className="container d-flex flex-column p-md-4 p-3">
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
              <Button onClick={() => logout()}>Logout</Button>
            </div>
            <h3 className="m-0">Agile Methodology</h3>
            <hr></hr>
            <ReactPlayer
              url={video}
              muted={false}
              volume={true}
              playing={false}
              controls={true}
              width="100%"
            />
            <div className="d-flex row justify-content-between pt-3">
              <div className="col-md-10">
                <h5 className="m-0">
                  This course will explore the history, approach, and philosophy
                  of Agile project management, including the Scrum framework.
                  You will learn how to differentiate and blend Agile and other
                  project management approaches.
                </h5>
              </div>
              <div className="col-md-2">
                <p className="m-0 text-end">
                  <b>4</b> Weeks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
