import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from "react";
import Delete from "../../../assets/images/delete.png";
import ArrowUpward from "../../../assets/images/arrowUpward.png";
import ArrowDownward from "../../../assets/images/arrowDownward.png";
import Plus from "../../../assets/images/plus.png";
import { Droppable } from "react-beautiful-dnd";
import BookCard from "../../../globalComponents/BookCard";
import manageLocalStorage from "../../../functions/manageLocalStorage";
import { StyleRoot } from "radium";
import animations from "../../../animations";
export const LibraryContext = createContext();
const BookShelf = ({
  favoriteBooks,
  title,
  setLibraries,
  ind,
  setAddingBook,
  addingBook,
  libraries,
}) => {
  const [showHiddenBooks, setShowHiddenBooks] = useState(false);
  const deleteHandler = () => {
    if (window.confirm(`Are you sure you want to delete ${title} library`)) {
      const libraryName = libraries.splice(ind, 1)[0];
      favoriteBooks.forEach(({ libraries }) => {
        let index = libraries.indexOf(libraryName);
        if (index > -1) libraries.splice(index, 1);
      });
      setLibraries((curr) => [...curr]);
      manageLocalStorage.set("libraries", libraries);
      manageLocalStorage.set("favoriteBooks", favoriteBooks);
    }
  };
  const addHandler = () => {
    setAddingBook((curr) => ({ ...curr, active: true, bookShelfIndex: ind }));
  };
  const bookCards = useMemo(() => {
    const results = favoriteBooks.filter((elem) => {
      if (!elem.libraries.length) return false;
      for (let i = 0; i < elem.libraries.length; i++) {
        if (elem.libraries[i] == title) return true;
      }
    });
    return results.map((elem) => (
      <BookCard data={elem} mode="inBookShelf" key={elem.key} />
    ));
  });
  const initialSet = useRef(true);
  useEffect(() => {
    initialSet.current = false;
  }, []);
  return (
    <StyleRoot
      style={
        initialSet.current
          ? ind % 2 == 0
            ? animations.slideInLeft
            : animations.slideInRight
          : {}
      }
    >
      <Droppable
        droppableId={title}
        isDropDisabled={!(addingBook.bookShelfIndex == ind)}
      >
        {(provided, snapshot) => (
          <div
            className={
              "library__line " +
              (snapshot.isDraggingOver ? "library__dropOn" : "")
            }
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="library__top beet">
              <p className="library__title title">{title}</p>
              <div
                className="button black library__button addBooks"
                onClick={addHandler}
              >
                <div className="beet">
                  <img src={Plus} />
                  <p>Add books</p>
                </div>
              </div>
            </div>
            <div className="library__bookShelf grid">
              <LibraryContext.Provider value={{ title, setLibraries }}>
                {showHiddenBooks ? bookCards : bookCards.slice(0, 9)}{" "}
                {provided.placeholder}
              </LibraryContext.Provider>
            </div>
            <div className="library__buttons beet">
              <div
                className="button black library__button addBooks screen-top"
                onClick={deleteHandler}
              >
                <div className="beet">
                  <img src={Delete} />
                  <p>Delete library</p>
                </div>
              </div>
              {bookCards.length > 9 && (
                <div
                  className={
                    "button library__button addBooks screen-top " +
                    (showHiddenBooks ? "green" : "blue")
                  }
                  onClick={() => setShowHiddenBooks((curr) => !curr)}
                >
                  <div className="beet">
                    <img src={showHiddenBooks ? ArrowUpward : ArrowDownward} />
                    <p>Show {showHiddenBooks ? "less" : "more"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </StyleRoot>
  );
};
export default BookShelf;
