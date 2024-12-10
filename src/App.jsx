import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./screens/SignIn/SignIn.jsx";
import Dashboard from "./screens/Dashboard/Dashboard.jsx";
import SignUp from "./screens/SignUp/SignUp.jsx";
import ProtectedRoute from "./helpers/ProtectedRoute.jsx";
import StudentResults from "./screens/StudentResults/StudentResults.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/studentResult" element={<StudentResults />} />
            </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
