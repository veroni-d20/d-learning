import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useMoralis } from "react-moralis";

const Input = styled("input")({
  display: "none",
});

export default function Upload() {
  const [inputFile, setInputFile] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const { Moralis, authenticate, isAuthenticated } = useMoralis();

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
    <div className="d-flex justify-content-center flex-column container">
      <h1 className="text-center mt-2">Upload</h1>
      <Button variant="contained" component="span" onClick={login}>
        Login
      </Button>
      <div className="my-2">
        <TextField
          id="course-name"
          label="Course name"
          variant="outlined"
          fullWidth
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div className="mb-2">
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
      <div className="my-2">
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
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(event) => setInputFile(event.target.files[0])}
        />
        <Button variant="contained" component="span">
          Attach file
        </Button>
      </label>
      <div className="mt-2">
        <Button
          variant="contained"
          component="span"
          onClick={(e) => {
            upload();
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
