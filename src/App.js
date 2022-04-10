import React, { useState, createContext, useRef } from "react";
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
import Window from "./globalComponents/Window";
import "./assets/styles/globalStyles.css";
import PasswordGenerator from "./screens/PasswordGenerator/index";
export const NavigateContext = createContext();
export const SearchContext = createContext();
export const WindowContext = createContext();
const App = () => {
  const [showArticle, setShowArticle] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage")
  );
  const [windowControls, setWindowControls] = useState({
    shown: false,
    message: "",
    isInShowMode: false,
    isError: false,
  });
  const windowVisibilityTimeout = useRef();
  const manageWindow = (message, isError) => {
    setWindowControls((curr) => ({
      ...curr,
      shown: true,
      isInShowMode: true,
      message,
      isError,
    }));
    clearTimeout(windowVisibilityTimeout.current);
    windowVisibilityTimeout.current = setTimeout(() => {
      setWindowControls((curr) => ({ ...curr, isInShowMode: false }));
      setTimeout(
        () => setWindowControls((curr) => ({ ...curr, shown: false })),
        500
      );
    }, 2500);
  };
  const navigate = (navigator, page, data) => {
    setActivePage(page);
    localStorage.setItem("activePage", page);
    navigator(page, data && { state: data });
  };
  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ searchActive, setSearchActive }}>
        <NavigateContext.Provider value={navigate}>
          <WindowContext.Provider value={manageWindow}>
            <Header
              {...{ showArticle, setShowArticle, activePage, setActivePage }}
            />
            <Routes>
              <Route path="/" element={<Main showArticle={showArticle} />} />
              <Route path="/passwordGenerator" element={<PasswordGenerator />}/>
              <Route path="/library" element={<Library />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/cabinet" element={<Cabinet />} />
            </Routes>
            {windowControls.shown && <Window {...windowControls} />}
          </WindowContext.Provider>
        </NavigateContext.Provider>
      </SearchContext.Provider>
    </BrowserRouter>
  );
};
export default App;
