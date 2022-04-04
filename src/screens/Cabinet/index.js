import React, { useState, useContext, useEffect, useRef,createContext } from "react";
import "../../assets/styles/cabinet.css";
import Account from "./components/Account";
import Favorites from "./components/Favorites";
export const FavoriteBooksContext=createContext();
const CreateCabinetScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("registrationData"));
  const [favoriteBooks, setFavoriteBooks] = useState(
    JSON.parse(localStorage.getItem("favoriteBooks"))
  );
  return (
    <div className="cabinet screen beet">
      <Account userInfo={userInfo} favoriteBooks={favoriteBooks} />
      <FavoriteBooksContext.Provider value={setFavoriteBooks}>
        <Favorites favoriteBooks={favoriteBooks} setFavoriteBooks={setFavoriteBooks}/>
      </FavoriteBooksContext.Provider>
    </div>
  );
};
export default CreateCabinetScreen;