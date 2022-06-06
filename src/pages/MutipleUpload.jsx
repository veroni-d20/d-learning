import { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { styled } from "@mui/material/styles";
import { CgAdd } from "react-icons/cg";
import { MdOutlineCancel } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import bg from "../images/bg.png";
import Box from "@mui/material/Box";

const Input = styled("input")({
  display: "none",
});

export default function MutipleUpload() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { courseId } = state;
  const [inputField, setInputField] = useState([
    {
      lessonName: "",
      courseDescription: "",
      courseDuration: "",
      inputField: "",
      imageFile: "",
    },
  ]);

  const [inputFile, setInputFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [lessonName, setLessonName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const { Moralis, logout } = useMoralis();

  const logoutFn = async () => {
    await logout();
    window.localStorage.removeItem("connectorId");
    navigate("/");
  };

  //Uploading the course
  const uploadFile = async () => {
    console.log(inputFile);
    console.log(imageFile);
    const file = new Moralis.File(inputFile.name, inputFile);
    const image = new Moralis.File(imageFile.name, imageFile);
    await file.saveIPFS();
    await image.saveIPFS();
    console.log(file.ipfs(), file.hash());
    return { fileUrl: file.ipfs(), imageUrl: image.ipfs() };
  };

  //Uploading the metadata
  const uploadMetadata = async (fileUrl, imageUrl) => {
    const object = {
      name: lessonName,
      description: courseDescription,
      duration: courseDuration,
      file: fileUrl,
      image: imageUrl,
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
    const { fileUrl, imageUrl } = await uploadFile();
    const metaUrl = await uploadMetadata(fileUrl, imageUrl);
    // Save file reference to Moralis
    const jobApplication = new Moralis.Object("LessonDetail");
    jobApplication.set("imageUrl", imageUrl);
    jobApplication.set("fileUrl", fileUrl);
    jobApplication.set("metaUrl", metaUrl);
    jobApplication.set("courseId", courseId);
    await jobApplication.save().then(() => {
      navigate("/getCourses");
    });
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
            <Button onClick={() => logoutFn()}>Logout</Button>
          </div>

          <div className="text-center">
            <b>
              <h3>Add Lessons</h3>
            </b>
            <Typography component="h1" variant="h6">
              Add your lessons & topics here!
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
                    id="lesson-name"
                    label="Lesson Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      setLessonName(e.target.value);
                    }}
                  />
                </div>
                <div className="my-1 py-2">
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    placeholder="description"
                    onChange={(e) => {
                      setCourseDescription(e.target.value);
                    }}
                    style={{
                      width: "75vw",
                    }}
                  />
                </div>

                <TextField
                  id="duration"
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setCourseDuration(e.target.value);
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
                    accept="video/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      setInputFile(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                  />
                  <Button variant="contained" component="span">
                    Attach file
                  </Button>
                </label>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="video/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => {
                      setImageFile(event.target.files[0]);
                      console.log(event.target.files[0]);
                    }}
                  />
                  <Button variant="contained" component="span">
                    Upload Banner Image
                  </Button>
                </label>
                <Button
                  variant="contained"
                  component="span"
                  onClick={(e) => {
                    upload();
                  }}
                >
                  Submit
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section className="d-flex flex-column align-items-center justify-content-center vh-100">
    //   <div
    //     className="bg-white align-items-center justify-content-center h-75  p-4"
    //     style={{
    //       minHeight: "85vh",
    //       width: "85%",
    //       borderRadius: "10px",
    //       boxShadow:
    //         "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
    //     }}
    //   >
    //     <div className="d-flex justify-content-end ">
    //       <Button
    //         onClick={(e) => {
    //           navigate("/getCourses");
    //         }}
    //       >
    //         All Courses
    //       </Button>
    //       <Typography component="h2" variant="h5">
    //         |
    //       </Typography>
    //       <Button onClick={logout}>Logout</Button>
    //     </div>
    //     <div className="mb-2">
    //       <TextField
    //         id="lesson-name"
    //         label="Lesson Name"
    //         variant="outlined"
    //         fullWidth
    //         onChange={(e) => {
    //           setLessonName(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="mb-2">
    //       <TextField
    //         id="duration"
    //         label="Duration"
    //         variant="outlined"
    //         fullWidth
    //         onChange={(e) => {
    //           setCourseDuration(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="mb-2">
    //       <TextField
    //         id="description"
    //         label="Description"
    //         variant="outlined"
    //         fullWidth
    //         onChange={(e) => {
    //           setCourseDescription(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="contained-button-file">
    //         <Input
    //           accept="video/*"
    //           id="contained-button-file"
    //           multiple
    //           type="file"
    //           onChange={(e) => {
    //             setInputFile(e.target.files[0]);
    //             console.log(e.target.files[0]);
    //           }}
    //         />
    //         <Button variant="contained" component="span" sx={{ margin: "2px" }}>
    //           Upload Video
    //         </Button>
    //       </label>
    //       <label htmlFor="contained-button-image">
    //         <Input
    //           accept="image/*"
    //           id="contained-button-image"
    //           multiple
    //           type="file"
    //           onChange={(event) => {
    //             setImageFile(event.target.files[0]);
    //             console.log(event.target.files[0]);
    //           }}
    //         />
    //         <Button variant="contained" component="span">
    //           Upload Banner Image
    //         </Button>
    //       </label>
    //       <Button
    //         onClick={(e) => {
    //           upload();
    //         }}
    //       >
    //         Submit
    //       </Button>
    //     </div>
    //   </div>
    // </section>
  );
}
