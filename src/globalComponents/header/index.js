import React, { useState, useEffect, useRef, useMemo ,useContext} from "react";
import Logo from "../../assets/images/logo.png";
import {StyleRoot} from 'radium';
import animations from "../../animations";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/images/close.png";
import Search from "../../assets/images/search.png";
import "../../assets/styles/header.css";
import HeaderContent from "./components/HeaderContent";
import {SearchContext} from "../../App";
const Header = ({showArticle,setShowArticle,activePage,setActivePage}) => {
  const {setSearchActive}=useContext(SearchContext);
  const [mobileMode, setMobileMode] = useState(false);
  const [isMobileMenuOpened,setIsMobileMenuOpened]=useState(false);

  const navigate = useNavigate();
  const activeArticleController=mobileMode && activePage=="/";
  const resize = () => {
    const width = window.innerWidth;
    if (width > 900 && mobileMode) {
      setMobileMode(false);
      if (!showArticle) setShowArticle(true);
      setIsMobileMenuOpened(false);
    }
    else if (width <= 900) {
      if (!mobileMode) setMobileMode(true);
      if (showArticle) setShowArticle(false);
    }
  };
  const popState=(event)=>{
    if (event.state.idx<window.hashes.length-1) {
      window.hashes.pop();
    }
    else {
      window.hashes.push(window.location.pathname);
    }
    const data=window.hashes[window.hashes.length-1];
    localStorage.setItem("activePage",data);
    setActivePage(data);
  }
  const linkClickHandler=data=>{
    if (activePage==data) return;
    setActivePage(data);
    navigate(data);
    window.hashes.push(data);
    localStorage.setItem("activePage",data);
    if (data=="/") setSearchActive(false);
  };
  useEffect(() =>{
    window.hashes=["/"];
    resize();
  } , []);
  useEffect(() => {
    window.addEventListener("resize", resize);
    window.addEventListener("popstate",popState);
    return () =>{
      window.removeEventListener("resize", resize);
      window.removeEventListener("popstate",popState);
    }
  },[mobileMode,isMobileMenuOpened,showArticle]);
  return (<>
    <div className="header beet">
      {activeArticleController && <div className="header__articleActivator header__block center" onClick={()=>setShowArticle(curr=>!curr)}>
        <img src={showArticle ? Close : Search}/>
      </div>}
      <img className="header__logo" src={Logo} onClick={()=>linkClickHandler("/")}/>
      {!mobileMode && <HeaderContent {...{linkClickHandler,activePage}}/>}
      {mobileMode && <Burger {...{setIsMobileMenuOpened,isMobileMenuOpened}}/>}
    </div>
    {isMobileMenuOpened && <StyleRoot style={animations.slideInUp} className="header__popup">
      <HeaderContent {...{linkClickHandler,activePage}}/>
    </StyleRoot>}
  </>);
};
export default Header;
const Burger = ({setIsMobileMenuOpened,isMobileMenuOpened}) => (
  <div className="header__burger header__block beet2" onClick={()=>setIsMobileMenuOpened(curr=>!curr)}>
  {isMobileMenuOpened ? <img src={Close}/> : <>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
  </>}
  </div>
);