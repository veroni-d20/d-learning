import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCourses from "./pages/MyCourses";
import Retrieve from "./pages/Retrieve";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Video from "./pages/Video";
import MutipleUpload from "./pages/MutipleUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/getCourses" element={<Retrieve />} />
        <Route path="/myCourses" element={<MyCourses />} />
        <Route path="/addLessons" element={<MutipleUpload />} />
        <Route path="/1" element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
