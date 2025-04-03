import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Porfile from "./components/Porfile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Porfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
