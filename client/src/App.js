import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
