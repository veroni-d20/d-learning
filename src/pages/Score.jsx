// import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import bg from "../images/bg.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Score() {
  let navigate = useNavigate();
  const { logout } = useMoralis();

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
        className="bg-white align-items-center justify-content-center h-75"
        style={{
          minHeight: "85vh",
          width: "85%",
          borderRadius: "10px",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
        }}
      >
        <div className="container my-4">
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
            <Button
              onClick={(e) => {
                navigate("/score");
              }}
            >
              Score
            </Button>
            <Typography component="h2" variant="h5">
              |
            </Typography>
            <Button onClick={() => logoutFn}>Logout</Button>
          </div>

          <div className="text-center">
            <b>
              <h2>Score</h2>
            </b>
          </div>
          <Grid container spacing={2} className="h-100">
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              className="d-flex align-items-center justify-content-center"
            >
              <Box
                component="img"
                sx={{
                  height: 400,
                  width: 580,
                  maxHeight: { xs: 233, md: 167, lg: 500 },
                  maxWidth: { xs: 350, md: 250, lg: 500 },
                }}
                alt="The house from the offer."
                src="https://img.freepik.com/free-vector/grades-concept-illustration_114360-628.jpg?w=996&t=st=1654146029~exp=1654146629~hmac=075ffe1c34133142e97c83e31e9d9eb4fa80937baeca5086db1a552e4ffc03fb"
              />
            </Grid>
            <Grid className="d-flex align-items-center justify-content-center flex-column">
              <b>
                <h4>Your Score</h4>
              </b>
              <br />
              <b>
                <h4>Average, Challenger, Topper</h4>
              </b>
            </Grid>
          </Grid>

          <div className="d-flex justify-content-center flex-column container"></div>
        </div>
      </div>
    </section>
  );
}
