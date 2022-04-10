import Input from "../../../globalComponents/Input";
import Down from "../../../assets/images/down.png";
import ArrowLeft from "../../../assets/images/arrowLeft.png";
import ArrowRight from "../../../assets/images/arrowRight.png";
import Up from "../../../assets/images/up.png";
import BookCard from "../../../globalComponents/BookCard";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from "react";
import { StyleRoot } from "radium";
import { Droppable } from "react-beautiful-dnd";
import animations from "../../../animations";
const BookDragSlider = ({ setAddingBook, favoriteBooks }) => {
  const [opened, setOpened] = useState(true);
  const [filterText,setFilterText]=useState("");
  const [pageIndex,setPageIndex]=useState(0);
  const [possibleCardNumber,setPossibleCardNumber]=useState(getPossibleCardNumber());
  const [recentlyClicked,setRecentlyClicked]=useState(false);
  const [animationType,setAnimationType]=useState({});
  const favoriteBooksElements = useMemo(() => {
    const displayData=(filterText=="" ? favoriteBooks : filterBooks());
    const pages=[];
    const books=displayData.map((elem, ind) => (
      <BookCard data={elem} mode="small" index={ind} />
    ));
    for (let i=0;i<books.length/possibleCardNumber;i++) {
      pages.push(books.slice(i*possibleCardNumber,(i*possibleCardNumber)+possibleCardNumber))
    }
    return pages;
  }, [filterText,possibleCardNumber]);
  const closeHandler = () => {
    setOpened(false);
    setTimeout(() => {
      setAddingBook((curr) => ({ ...curr, active: false }));
    }, 1000);
  };
  function filterBooks() {
    return favoriteBooks.filter(({title,authors})=>{
      const inputText=filterText.toLowerCase();
      const authorsArray=authors.split(" , ").map(elem=>elem.slice(0,inputText.length).toLowerCase());
      return (inputText==title.slice(0,filterText.length).toLowerCase() || authorsArray.includes(inputText));
    })
  };
  function getPossibleCardNumber() {
    const cardWidth=140;
    const margins=2*10;
    const slideWidth=50*2;
    const cardNumberWithoutGaps=Math.floor((window.innerWidth-(margins+slideWidth))/cardWidth) || 1;
    const gaps=(cardNumberWithoutGaps-1)*15;
    return Math.floor(cardNumberWithoutGaps-(gaps/cardWidth));
  }
  const resize=()=>{
    setPossibleCardNumber(getPossibleCardNumber());
    setPageIndex(0);
  }
  const changePage=(type)=>{
    if (recentlyClicked) return;
    if (type=="left" && pageIndex==0) return;
    if (type=="right" && pageIndex==(favoriteBooksElements.length-1)) return;
    setRecentlyClicked(true);
    setTimeout(()=>setRecentlyClicked(false),1000);
    if (type=="left") {
      setAnimationType(animations.slideOutRight)
      setTimeout(()=>{
        setPageIndex(curr=>curr-1);
        setAnimationType(animations.slideInLeftFast)
      },500)
    }
    else if (type=="right") {
      setAnimationType(animations.slideOutLeft);
      setTimeout(()=>{
        setPageIndex(curr=>curr+1);
        setAnimationType(animations.slideInRightFast)
      },500)

    }
  }
  useEffect(()=>{
    window.addEventListener("resize",resize);
    return ()=>{
      window.removeEventListener("resize",resize);
    }
  });
  useEffect(()=>{
    setPageIndex(0)
  },[filterText])
  return (
    <StyleRoot
      className="library__bookDrag"
      style={opened ? animations.fadeInUp : animations.fadeOutDown}
    >
      <Droppable droppableId="bookContainer" isDropDisabled={true}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="library__controls beet">
              <Input
                placeholder="type the name/author of the book"
                style="library__dropDownInput"
                setData={setFilterText}
              />
              <div className="library__close center" onClick={closeHandler}>
                <img src={opened ? Down : Up} />
              </div>
            </div>
            <div className="library__miniBooks beet">
              <div className={"library__slider center library-slide1 "+((recentlyClicked || pageIndex==0) ? "library-disabled" : "")} onClick={()=>changePage("left")}>
                <img src={ArrowLeft} />
              </div>
              <StyleRoot className="library__mainContainer" style={animationType}>
                {favoriteBooksElements[pageIndex]}
              </StyleRoot>
              <div className={"library__slider center library-slide2 "+((recentlyClicked || pageIndex==(favoriteBooksElements.length-1)) ? "library-disabled" : "")} onClick={()=>changePage("right")}>
                <img src={ArrowRight} />
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </StyleRoot>
  );
};
export default BookDragSlider;