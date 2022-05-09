import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCourses from "./pages/MyCourses";
import Retrieve from "./pages/Retrieve";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/getCourses" element={<Retrieve />} />
        <Route path="/myCourses" element={<MyCourses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
