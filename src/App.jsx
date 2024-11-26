import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./screens/SignIn/SignIn.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
