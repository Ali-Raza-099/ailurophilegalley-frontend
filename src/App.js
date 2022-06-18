import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar/Navbar";
import HomePage from "./Components/Home/home";
import Collection from "./Components/Collection/collection";
import ContactUs from "./Components/ConctactUs/contactUs";
import About from "./Components/About/about";
import NotFound from "./Components/NotFound/notFound";
import AddPicture from "./Components/Collection/addPicture";
import UpdatePicture from "./Components/Collection/updatePicture";
import Login from "./Components/Reg&Login/login";
import Register from "./Components/Reg&Login/Register";
import './App.css';
import Footer from "./Components/Footer/Footer";
import "font-awesome/css/font-awesome.min.css";


function App() {
  return (
    <div >
      <BrowserRouter>
        <div className="container-fluid" id="top">
          <ToastContainer />
          <NavBar />
          <div >
            <Routes>
              <Route path="/PhotoCollection/:page" exact element={<Collection />} />
              <Route
                path="/ailurophile-gallery/login"
                exact
                element={<Login />}
              />
              <Route
                path="/ailurophile-gallery/register"
                exact
                element={<Register />}
              />
              <Route
                path="/PhotoCollection/add"
                exact
                element={<AddPicture />}
              />
              <Route
                path="/PhotoCollection/update/:id"
                exact
                element={<UpdatePicture />}
              />
              <Route path="/contact-us" exact element={<ContactUs />} />
              {/* <Route path="/about" exact element={<About />} /> */}
              <Route path="/*" exact element={<NotFound />} />
              <Route path="/" exact element={<HomePage />} />
            </Routes>
          </div>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
