import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
} from "@mui/material";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import dummyData from "../data/courses.json";
import bg from "../images/bg.png";

export default function Retrieve() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const logout = async () => {
    Moralis.User.logOut();
    console.log("logged out");
    navigate("/");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/Mycourses");
  };
  const { Moralis, isInitialized } = useMoralis();
  const Data = [];

  async function fetchIPFSDoc(ipfsHash) {
    const url = `https://gateway.moralisipfs.com/ipfs/${ipfsHash}`;
    const response = await fetch(url).then((response) => response.json());
    return response;
  }

  if (isInitialized) {
    // Retrieve file
    const query = new Moralis.Query("CourseDetail");
    query.find().then((results) => {
      results.map((result) => {
        query.equalTo("objectId", `${result.id}`);
        query.find().then(function ([application]) {
          const ipfs = application.get("fileUrl");
          const meta = application.get("metaUrl");
          const hash = meta.slice(34);
          fetchIPFSDoc(hash).then((data) => {
            let courseData = {
              objectId: result.id,
              fileUrl: ipfs,
              metaUrl: meta,
              courseName: data.name,
              description: data.description,
              duration: data.duration,
            };
            Data.push(courseData);
            // console.log(Data);
          });
        });
      });
      setLoading(false);
    });
    // console.log(Data);
  }

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
        <h3 className="text-center pb-2">Courses</h3>
        {loading ? (
          <h4>Loading</h4>
        ) : (
          <>
            <div className="row">
              {dummyData.map((e, index) => (
                <div className="col-md-6 col-lg-4 mb-3" key={index}>
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
                        image={e.imageUrl}
                        alt={e.courseName}
                      />
                      <div className="d-flex justify-content-between pt-3">
                        <Typography
                          sx={{ fontSize: 20, fontWeight: "bold" }}
                          color="text.primary"
                          gutterBottom
                        >
                          {e.courseName}
                        </Typography>
                        <p className="m-0">
                          <b>{e.duration}</b> Weeks
                        </p>
                      </div>

                      <Typography color="text.secondary">
                        {e.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleClickOpen();
                        }}
                      >
                        Enroll Course
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
          </>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "#1e293b" }}
            >
              You have enrolled in the course successfully.✅
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
