import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./screens/SignIn/SignIn.jsx";
import StudentDashboard from "./screens/Dashboard/StudentDashboard.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<SignIn />} />
          <Route index path="/studentDashboard" element={<StudentDashboard />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
