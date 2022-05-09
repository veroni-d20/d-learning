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

const Input = styled("input")({
  display: "none",
});

export default function Upload() {
  const [inputFile, setInputFile] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const { Moralis, authenticate, isAuthenticated } = useMoralis();
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

  const logout = async () => {
    Moralis.User.logOut();
    console.log("logged out");
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
    <section className="vh-100">
      <div className="container my-4">
        <div className="white-box d-flex bg-body flex-column mr-3 p-3 justify-content-between rounded-4">
          <Card
            elevation={2}
            sx={{ textAlign: "center", borderRadius: "30px" }}
          >
            <CardActionArea>
              <CardContent>
                <div className="">
                  <Box
                    component="h1"
                    sx={{ letterSpacing: 5, m: 1, color: "#002984" }}
                  >
                    Upload Course
                  </Box>
                </div>
                <div className="d-flex py-3 justify-content-center">
                  <Typography component="h2" variant="h5">
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
                      <div className="my-2 py-3 ">
                        <TextField
                          id="course-name"
                          label="Course name"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setCourseName(e.target.value)}
                        />
                      </div>
                      <div className="mb-2 my-2">
                        <TextareaAutosize
                          aria-label="minimum height"
                          minRows={3}
                          placeholder="Minimum 3 rows"
                          style={{
                            width: "75vw",
                          }}
                          onChange={(e) => {
                            setCourseDescription(e.target.value);
                            console.log(e.target.value);
                          }}
                        />
                      </div>
                      <div className="my-2 mb-2 py-2">
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
                      </div>
                    </Box>
                  </div>
                  <div className="d-flex justify-content-center align-items-center p-2" sx={{flexDirection:"row"}}>
                    <Box sx={{ "& > :not(style)": { m: 1 } }}>
                        <label htmlFor="contained-button-file">
                          <Input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={(event) =>
                              setInputFile(event.target.files[0])
                            }
                          />
                          <Button
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
                            variant="contained"
                            component="span"
                          >
                            Attach file
                          </Button>
                        </label>
                        <Button
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
                          variant="contained"
                          component="span"
                          onClick={(e) => {
                            upload();
                          }}
                        >
                          Upload
                        </Button>
                    </Box>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center mt-2 p-2"></div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="mt-2 justify-content-end">
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
            onClick={(e) => {
              navigate("/getCourses");
            }}
          >
            GET COURSES
          </Button>
        </div>
        <div className="mt-2 justify-content-start">
          <Button
            variant="contained"
            component="span"
            onClick={logout}
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
          >
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
}
