import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from "react";
import EmptyLibrary from "../../assets/images/emptyLibrary.png";
import Input from "../../globalComponents/Input";
import Plus from "../../assets/images/plus.png";
import "../../assets/styles/library.css";
import BookShelf from "./components/BookShelf";
import BookDragSlider from "./components/BookDragSlider";
const CreateLibraryScreen = () => {
  const [libraries, setLibraries] = useState(
    JSON.parse(localStorage.getItem("libraries")) || []
  );
  const [addingBook,setAddingBook]=useState({
    active:true,
    bookShelfIndex:null
  })
  const favoriteBooks=JSON.parse(localStorage.getItem("favoriteBooks"));
  const [libraryName,setLibraryName]=useState("");
  const displayLibraries=useMemo(()=>{
    return libraries.map((elem,ind)=><BookShelf {...{favoriteBooks,addingBook,setLibraries,ind,setAddingBook}} title={elem}/>)
  },[libraries.length]);
  const createLibraryHandler=()=>{
    if (libraryName=="") return;
    for (let i=0;i<libraries.length;i++) {
      if (libraries[i]==libraryName) return;
    }
    libraries.push(libraryName);
    localStorage.setItem("libraries",JSON.stringify(libraries));
    setLibraries([...libraries]);
  }
  const disableAddingBooks=(eve)=>{
    if (eve.target.classList.contains("screen") && addingBook.active) {
      setAddingBook(curr=>({...curr,active:false}));
    }
  }
  return (
    <div className="library screen" onClick={disableAddingBooks}>
      <div className="library__form width">
        <div className="library__container">
          <Input
            setData={setLibraryName}
            placeholder="type the name of the library"
            style="library__inputMain"
          />
          <div className="button library__button blue left" onClick={createLibraryHandler}>
            <div className="beet">
              <img src={Plus} />
              <p className="left">Create library</p>
            </div>
          </div>
        </div>
      </div>
      {libraries.length == 0 ? (
        <div className="popup center library__popup">
          <div className="width beet2 stretch">
            <img src={EmptyLibrary} />
            <p>There is bookshelfs in your library , click to create one</p>
          </div>
        </div>
      ) : (
        <div className="library__row row">
          {displayLibraries}
        </div>
      )}
      {addingBook.active && <BookDragSlider {...{setAddingBook,favoriteBooks}}/>}
    </div>
  );
};
export default CreateLibraryScreen;
