import React, { useCallback, useEffect, useState, useMemo,useContext } from "react";
import {StyleRoot} from 'radium';
import animations from "../animations";
import compare from "../functions/compare";
import Eye from "../assets/images/eye.png";
import {NavigateContext} from "../App";
import { useNavigate } from "react-router-dom";
import Hearth from "./bookComponents/Hearth";
import Button from "./bookComponents/Button";
import Stars from "./bookComponents/Stars";
const Book = ({ data, mode}) => {

  const returnBook = () => {
    const title = <p className="book__title">{data.title}</p>;
    if (mode == "normal")
      return (
        <StyleRoot className="book beet2 book__align book-max" style={animations.zoomIn}>
          <div className="book__imageBlock">
            <ShowPreview data={data} style="book-eyeLeft"/>
            <Image image={data.image} style="book__imageBig" />
            <Hearth data={data} />
          </div>
          {title}
          <div className="book__container beet">
            <Stars style="book__stars" amount={data.rating}/>
            <Authors authors={data.authors} />
          </div>
          <Button data={data} style="book__normalButton" />
        </StyleRoot>
      );
    else if (mode == "large")
      return (
        <StyleRoot className="book beet" style={animations.zoomIn} >
          <div className="book__largeBlock">
            <ShowPreview data={data}  style="book-eyeRight"/>
            <Image image={data.image} style="book__imageSmall" />
            <Hearth data={data}/>
          </div>
          <div className="book__largeContainer">
            {title}
            <div className="book__mass beet">
              <div className="beet">
                <Stars style="book__stars" amount={data.rating}/>
                <Authors authors={data.authors} />
              </div>
              <Button style="book__largeButton" data={data} />
            </div>
            <p className="book__description">{data.description}</p>
          </div>
        </StyleRoot>
      );
    else
      return (
        <div className="book beet2" >
          <Image image={data.image} style="book__imageSmall" />
          {title}
        </div>
      );
  };
  return returnBook();
};
export default Book;
const Authors = ({ authors }) => {
  const [show, setShow] = useState(false);
  const leaveHandler = () => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  return (
    <div className="book__relative">
      {show && <p className="book__hiddenAuthors">{authors}</p>}
      <p
        className="book__author"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={leaveHandler}
      >
        {authors}
      </p>
    </div>
  );
};
const Image = ({ image, style }) => <img src={image} className={style} />;
const ShowPreview = ({ data,style }) => {
  const navigate=useContext(NavigateContext);
  const navigator = useNavigate();
  const clickHandler = () => {
    navigate(navigator,"/preview", data);
  };
  return <img src={Eye} className={"book__eye "+style} onClick={clickHandler} />;
};