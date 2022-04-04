import React, { useState, createContext } from "react";
import fetcher from "./functions/fetcher";
import formater from "./functions/formater";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Main from "./screens/Main/index";
import SignUp from "./screens/SignUp/index";
import Header from "./globalComponents/header/index";
import SignIn from "./screens/SignIn/index";
import Cabinet from "./screens/Cabinet/index";
import Preview from "./screens/Preview/index";
import Library from "./screens/Library/index";
import "./assets/styles/globalStyles.css";
import PasswordGenerator from "./screens/PasswordGenerator/index";
export const NavigateContext = createContext();
export const SearchContext = createContext();
const App = () => {
  const [showArticle, setShowArticle] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage")
  );
  const navigate = (navigator,page, data) => {
    setActivePage(page);
    localStorage.setItem("activePage",page);
    navigator(page, data && { state: data });
  };
  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ searchActive, setSearchActive }}>
        <NavigateContext.Provider value={navigate}>
          <Header
            {...{ showArticle, setShowArticle, activePage, setActivePage }}
          />
          <Routes>
            <Route path="/"
              //element={<Main showArticle={showArticle} />}
              element={<Library/>}
            />
            <Route path="/passwordGenerator" element={<PasswordGenerator />} />
            <Route path="/library" element={<Library />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/cabinet" element={<Cabinet />} />
          </Routes>
        </NavigateContext.Provider>
      </SearchContext.Provider>
    </BrowserRouter>
  );
};
export default App;
