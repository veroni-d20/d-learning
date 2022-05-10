import { useState, useEffect } from "react";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useNavigate } from "react-router-dom";
import data from "../data/courses.json";

export default function Retrieve() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/Mycourses");
  };
  const { Moralis, isInitialized, isAuthenticated, account } = useMoralis();
  const Data = [];

  let navigate = useNavigate();

  async function fetchIPFSDoc(ipfsHash) {
    const url = `https://gateway.moralisipfs.com/ipfs/${ipfsHash}`;
    const response = await fetch(url).then((response) => response.json());
    Data.push(await fetch(url).then((response) => response.json()));
    return await response.json();
  }

  if (isInitialized) {
    console.log("initialized");
    const Comment = Moralis.Object.extend("CourseDetail");
    const query = new Moralis.Query(Comment);
    query
      .find()
      .then((results) => {
        console.log(results);
        // results.forEach((result) => {
        //   console.log(result.id);
        //   query.equalTo("objectId", `${result.id}`);
        //   query
        //     .get("fileUrl")
        //     .then((result) => {
        //       console.log(result);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // });
      })
      .catch((error) => {
        console.log(error);
      });

    // query.find().then(function ([application]) {
    //   const ipfs = application.get("fileUrl");
    //   const meta = application.get("metaUrl");
    //   console.log("IPFS url", ipfs);
    //   console.log("meta url", meta);
    //   fetchIPFSDoc(meta.slice(34));
    // });
    console.log(Data);
    // console.log(data);
  }

  const [myCourses, setMyCourses] = useState();

  // useEffect(() => {
  //   async function fetchMyList() {
  //     //  await Moralis.start({
  //     //     serverUrl: "https://nxnum9lbbe37.usemoralis.com:2053/server",
  //     //     appId: "pI4URxOPkpA9Ob4PuMQS88zBgyISVIVFot9qXxYQ",
  //     //   }); //if getting errors add this
  //     try {
  //       const theList = await Moralis.Cloud.run("getMyCourses", {
  //         addrs: account,
  //       });

  //       const filterdA = data.filter(function (e) {
  //         return theList.indexOf(e.courseName) > -1;
  //       });
  //       setMyCourses(filterdA);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchMyList();
  // }, [account]);
  return (
    <div
      className="vh-100 px-5"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <h3 className="text-center py-5">Courses</h3>
      <div className="row">
        {data.map((course, index) => (
          <div className="col-md-6 col-lg-4 mb-3" key={index}>
            <Card sx={{ maxWidth: 500 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                  color="text.primary"
                  gutterBottom
                >
                  {course.courseName}
                </Typography>
                <Typography color="text.secondary">
                  Duration: {course.duration}
                </Typography>
                <Typography variant="body2">
                  <br />
                  {course.description}
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
                  Enroll
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      {/* <h3 className="py-5">My Courses</h3>
      <div className="row">
        {myCourses && isAuthenticated ? (
          <>
            <div>
              {myCourses.map((e) => {
                return (
                  <div className="col-md-6 col-lg-4 mb-3">
                    <Card sx={{ maxWidth: 500 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 20, fontWeight: "bold" }}
                          color="text.primary"
                          gutterBottom
                        >
                          {e.courseName}
                        </Typography>
                        <Typography color="text.secondary">
                          Duration: {e.duration}
                        </Typography>
                        <Typography variant="body2">
                          <br />
                          {e.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>You need to Authenicate To View Your Own list</div>
        )}
      </div> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have enrolled in the course successfully.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
