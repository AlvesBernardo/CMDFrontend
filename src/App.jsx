import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./screens/SignIn/SignIn.jsx";
import SignUp from "./screens/SignUp/SignUp.jsx";
import ProtectedRoute from "./helpers/ProtectedRoute.jsx";
import StudentResults from "./screens/StudentResults/StudentResults.jsx";
import StudentDashboard from "./screens/Dashboard/StudentDashboard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./screens/Dashboard/AdminDashboard.jsx";
import Questionnaire from "./screens/Questionnaire/Questionnaire.jsx";
import ManageStudios from "./screens/ManageStudios/ManageStudios.jsx";
import Results from "./screens/Results/Results.jsx";
import { Result } from "postcss";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/studentDashboard" element={<StudentDashboard />} />
                    <Route path="/adminDashboard" element={<AdminDashboard />} />
                    <Route path="/studentResult" element={<StudentResults />} />
                    <Route path="/questionnaire" element={<Questionnaire />} />
                    <Route path="/manageStudios" element={<ManageStudios />} />
                    <Route path="/results" element={<Results />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
