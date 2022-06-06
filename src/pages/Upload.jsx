import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import bg from "../images/bg.png";

const Input = styled("input")({
  display: "none",
});

export default function Upload() {
  const [inputFile, setInputFile] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const { Moralis, authenticate, isAuthenticated, logout } = useMoralis();
  let navigate = useNavigate();

  //Authentication
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate()
        .then(function (user) {
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logoutFn = async () => {
    await logout();
    window.localStorage.removeItem("connectorId");
    navigate("/");
  };

  //Uploading the course
  const uploadFile = async () => {
    const file = new Moralis.File(inputFile.name, inputFile);
    await file.saveIPFS();
    console.log(file.ipfs(), file.hash());
    return file.ipfs();
  };

  //Uploading the metadata
  const uploadMetadata = async (fileUrl) => {
    const object = {
      name: courseName,
      description: courseDescription,
      duration: courseDuration,
      file: fileUrl,
    };

    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(object)),
    });
    await file.saveIPFS();

    console.log(file.ipfs());
    return file.ipfs();
  };

  //Upload function
  const upload = async () => {
    const imageUrl = await uploadFile();
    const metaUrl = await uploadMetadata(imageUrl);
    // Save file reference to Moralis
    const jobApplication = new Moralis.Object("CourseDetail");
    jobApplication.set("fileUrl", imageUrl);
    jobApplication.set("metaUrl", metaUrl);
    await jobApplication.save();
  };

  return (
    <section
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: `url("${bg}")no-repeat center/cover`,
        // minHeight: "200vh",
        // width: "100%",
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
            <Button onClick={() => logoutFn()}>Logout</Button>
          </div>

          <div className="text-center">
            <b>
              <h3>Upload Course</h3>
            </b>
            <Typography component="h1" variant="h6">
              Here's the right way to teach!
            </Typography>
          </div>

          <div className="d-flex justify-content-center flex-column container">
            <div className="d-flex justify-content-center p-2">
              <Box
                sx={{
                  "& > :not(style)": { m: 1 },
                  letterSpacing: 15,
                  m: 1,
                }}
              >
                <div className="my-1 py-2 ">
                  <TextField
                    id="course-name"
                    label="Course name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div className="my-1 py-2">
                  <TextField
                    id="outlined-multiline-static"
                    label="Course Description"
                    multiline
                    rows={4}
                    placeholder="Course description"
                    onChange={(e) => {
                      setCourseDescription(e.target.value);
                      console.log(e.target.value);
                    }}
                    style={{
                      width: "75vw",
                    }}
                  />
                </div>

                <TextField
                  id="course-duration"
                  label="Course duration"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setCourseDuration(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Box>
            </div>
            <div
              className="d-flex justify-content-center align-items-center p-2"
              sx={{ flexDirection: "row" }}
            >
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => setInputFile(event.target.files[0])}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: "#3b82f6",
                      maxHeight: "50px",
                      minHeight: "30px",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#3b82f6",
                      },
                    }}
                    component="span"
                  >
                    Attach file
                  </Button>
                </label>
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    borderRadius: "30px",
                    backgroundColor: "#3b82f6",
                    maxHeight: "50px",
                    minHeight: "30px",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#3b82f6",
                    },
                  }}
                  onClick={(e) => {
                    upload();
                  }}
                >
                  Upload
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
