import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import { StyleRoot } from "radium";
import animations from "../animations";
import Eye from "../assets/images/eye.png";
import Delete from "../assets/images/delete.png"
import { NavigateContext } from "../App";
import { useNavigate } from "react-router-dom";
import Hearth from "./bookComponents/Hearth";
import Button from "./bookComponents/Button";
import Stars from "./bookComponents/Stars";
import Authors from "./bookComponents/Authors";
import { Draggable } from "react-beautiful-dnd";
import {LibraryContext} from "../screens/Library/components/BookShelf";
import manageLocalStorage from "../functions/manageLocalStorage";
const Book = ({ data, mode, index }) => {

  const returnBook = () => {
    const title = <p className="book__title">{data.title}</p>;
    if (mode == "normal")
      return (
        <StyleRoot
          className="book beet2 book__align book-max"
          style={animations.zoomIn}
        >
          <div className="book__imageBlock">
            <ShowPreview data={data} style="book-eyeLeft" />
            <Image image={data.image} style="book__imageBig" />
            <Hearth data={data} />
          </div>
          {title}
          <div className="book__container beet">
            <Stars style="book__stars" amount={data.rating} />
            <Authors authors={data.authors} />
          </div>
          <Button data={data} style="book__normalButton" />
        </StyleRoot>
      );
    else if (mode == "large")
      return (
        <StyleRoot className="book beet" style={animations.zoomIn}>
          <div className="book__largeBlock">
            <ShowPreview data={data} style="book-eyeRight" />
            <Image image={data.image} style="book__imageSmall" />
            <Hearth data={data} />
          </div>
          <div className="book__largeContainer">
            {title}
            <div className="book__mass beet">
              <div className="beet">
                <Stars style="book__stars" amount={data.rating} />
                <Authors authors={data.authors} />
              </div>
              <Button style="book__largeButton" data={data} />
            </div>
            <p className="book__description">{data.description}</p>
          </div>
        </StyleRoot>
      );
      else if (mode=="inBookShelf") return (
        <StyleRoot
          className="book beet2 book__align book-max"
          style={animations.zoomIn}
        >
          <div className="book__imageBlock">
            <Image image={data.image} style="book__imageBig" />
            <Bin keyName={data.key}/>
          </div>
          {title}
          <div className="book__container beet">
            <Stars style="book__stars" amount={data.rating} />
            <Authors authors={data.authors} />
          </div>
          <Button data={data} style="book__normalButton" />
        </StyleRoot>
      )
    else
      return (
        <Draggable draggableId={data.key} index={index}>
          {(provided) => (
            <div
              className="book beet2 book-small"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Image image={data.image} style="book__imageSmall" />
              {title}
            </div>
          )}
        </Draggable>
      );
  };
  return returnBook();
};
export default Book;
const Image = ({ image, style }) => <img src={image} className={style} />;
const ShowPreview = ({ data, style }) => {
  const navigate = useContext(NavigateContext);
  const navigator = useNavigate();
  const clickHandler = () => {
    navigate(navigator, "/preview", data);
  };
  return (
    <img src={Eye} className={"book__eye " + style} onClick={clickHandler} />
  );
};
const Bin=({keyName})=>{
  const {title,setLibraries}=useContext(LibraryContext);
  const clickHandler=()=>{
    const favoriteBooks=manageLocalStorage.get("favoriteBooks");
    const book=favoriteBooks.find(({key})=>key==keyName);
    book.libraries.splice(book.libraries.indexOf(title),1);
    manageLocalStorage.set("favoriteBooks",favoriteBooks);
    setLibraries((curr)=>[...curr]);
  }
  return <img className="book__hearth" src={Delete} onClick={clickHandler}/>
}