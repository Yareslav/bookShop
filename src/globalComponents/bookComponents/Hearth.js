import React, { useCallback, useEffect, useState, useMemo,useContext } from "react";
import NotSelected from "../../assets/images/favourite.png";
import Selected from "../../assets/images/favouriteActive.png";
import {FavoriteBooksContext} from "../../screens/Cabinet/index";
import compare from "../../functions/compare";
const Hearth = ({data,style}) => {
  const isInFavorites = useMemo(() => {
    const favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks"));
    for (let i = 0; i < favoriteBooks.length; i++) {
      if (compare(favoriteBooks[i], data)) return true;
    }
    return false;
  },[]);
  const [liked, setLiked] = useState(isInFavorites);
  const setFavoriteBooks=useContext(FavoriteBooksContext);
  const clickHandler = () => {
    const favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks"));
    if (!liked) favoriteBooks.push(data);
    else {
      let index;
      favoriteBooks.forEach((elem, ind) => {
        if (compare(elem, data)) index = ind;
      });
      favoriteBooks.splice(index, 1);
      if (setFavoriteBooks) setFavoriteBooks([...favoriteBooks]);
    }
    setLiked((curr) => !curr);
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
  };
  return (
    <img
      className={"book__hearth "+(style ? style : "")}
      src={liked ? Selected : NotSelected}
      onClick={clickHandler}
    />
  );
};
export default Hearth;