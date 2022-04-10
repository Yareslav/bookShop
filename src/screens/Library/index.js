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
import { DragDropContext } from 'react-beautiful-dnd';
import manageLocalStorage from "../../functions/manageLocalStorage";
import {WindowContext} from "../../App";
const CreateLibraryScreen = () => {
  const [libraries, setLibraries] = useState(
    JSON.parse(localStorage.getItem("libraries")) || []
  );
  const [addingBook,setAddingBook]=useState({
    active:false,
    bookShelfIndex:null
  });
  const manageWindow=useContext(WindowContext);
  const favoriteBooks=JSON.parse(localStorage.getItem("favoriteBooks"));
  const [libraryName,setLibraryName]=useState("");
  const displayLibraries=useMemo(()=>{
    return libraries.map((elem,ind)=><BookShelf {...{favoriteBooks,addingBook,libraries,setLibraries,ind,setAddingBook}} title={elem} key={elem}/>)
  });
  const createLibraryHandler=()=>{
    if (libraryName=="") return manageWindow("Missing library name",true);
    for (let i=0;i<libraries.length;i++) {
      if (libraries[i]==libraryName) return manageWindow("Library with such name already exsists",true);
    }
    libraries.push(libraryName);
    localStorage.setItem("libraries",JSON.stringify(libraries));
    setLibraryName("");
    setLibraries([...libraries]);
  }
  const dragEndHandler=(result)=>{
    if (result.source.droppableId!="bookContainer") return;
    const libraryName=result.destination.droppableId;
    let droppedBook;
    favoriteBooks.forEach((elem)=>{
      if (elem.key==result.draggableId) droppedBook=elem;
    })
    if (droppedBook.libraries.includes(libraryName)) return manageWindow("this book already exists in this library",true);
    droppedBook.libraries.push(libraryName);
    manageLocalStorage.set("favoriteBooks",favoriteBooks);
    setLibraries(curr=>[...curr]);
  }
  return (
    <DragDropContext onDragEnd={dragEndHandler}>
    <div className="library screen" >
      <div className="library__form width">
        <div className="library__container">
          <Input
            setData={setLibraryName}
            placeholder="type the name of the library"
            style="library__inputMain"
            value={libraryName}
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
    </DragDropContext>
  );
};
export default CreateLibraryScreen;
