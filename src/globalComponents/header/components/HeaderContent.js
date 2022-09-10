import YouTube from "../../../assets/images/youTube.png";
import Facebook from "../../../assets/images/facebook.png";
import Instagram from "../../../assets/images/instagram.png";
import User from "../../../assets/images/user.png";
const HeaderContent = ({linkClickHandler,activePage}) => {
  const condition=JSON.parse(localStorage.getItem("registrationData"))?.isSignedIn;
  const getStyles=(data)=>{
    return (data==activePage) ? {opacity:0.5} : {};
  }
  const user=<img src={User} className="header__user" onClick={()=>linkClickHandler("/cabinet")} style={getStyles("/cabinet")}/>
  const element = condition ? user : <>
    <p onClick={()=>linkClickHandler("/signIn")} style={getStyles("/signIn")}>Sign In</p>
    <p onClick={()=>linkClickHandler("/signUp")} style={getStyles("/signUp")}>Sign up</p>
  </>;
  return (<>
  <div className="header__titles beet">
    <p onClick={()=>linkClickHandler("/passwordGenerator")} style={getStyles("/passwordGenerator")}>Password generator</p>
    {condition && <p onClick={()=>linkClickHandler("/library")} style={getStyles("/library")}>Library</p>}
    {element}
  </div>
  <div className="header__media beet">
    <div className="header__ball center">
      <img src={YouTube} />
    </div>
    <div className="header__ball center">
      <img src={Facebook} className="header__imgHeight" />
    </div>
    <div className="header__ball center">
      <img src={Instagram} />
    </div>
  </div>
  </>)
};
export default HeaderContent;