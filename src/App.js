import React, { useState } from "react";
import About from "./components/About";
import Dropdown from "./components/common/Dropdown";
import GlobalStyle from "./components/common/globalStyles";
import Navbar from "./components/common/Navbar";
import Main from "./components/main/MainHeader";
import { AboutInfo } from "./data/AboutData";
import { SliderData } from "./data/SliderData";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LogIn from "./components/pages/LogIn";
import CreateUserForm from "./components/pages/Register";
import CreateTouristAttractionForm from "./components/admin/CreateTouristAttractionForm";
import TouristAttractionsView from "./components/common/TouristAttractionsView";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Wishlist from "./components/pages/Wishlist";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <GlobalStyle />
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle}></Dropdown>
      <Routes>
        <Route
          path=""
          component={Main}
          element={<Main slides={SliderData} />}
        />
        <Route
          path="/home"
          component={Main}
          element={<Main slides={SliderData} />}
        />
        <Route
          exact
          path="/"
          element={<ProtectedRoute roleRequired="CLIENT" />}
        >
          <Route
            path="/about"
            component={About}
            element={<About {...AboutInfo}></About>}
          />
        </Route>

        <Route
          exact
          path="/"
          element={<ProtectedRoute roleRequired="ROLE_CLIENT" />}
        >
          <Route
            path="/wishlist"
            component={Wishlist}
            element={<Wishlist/>}
          />
        </Route>

        <Route
          path="/login"
          exact
          component={LogIn}
          element={<LogIn></LogIn>}
        />
       
        <Route
          path="/register"
          exact
          component={CreateUserForm}
          element={<CreateUserForm></CreateUserForm>}
        />
        <Route
          path="/attractions"
          exact
          component={TouristAttractionsView}
          element={<TouristAttractionsView></TouristAttractionsView>}
        />
        <Route
          exact
          path="/"
          element={<ProtectedRoute roleRequired="ROLE_ADMIN" />}
        >
        <Route
          path="/admin/attractions-management/add"
          exact
          component={CreateTouristAttractionForm}
          element={<CreateTouristAttractionForm></CreateTouristAttractionForm>}
        />
        </Route>
      </Routes>
    </>
  );
}
export default App;
