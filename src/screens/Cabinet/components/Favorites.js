import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  createContext,
} from "react";
import BookModeSwitcher from "../../../globalComponents/BookModeSwitcher";
import Input from "../../../globalComponents/Input";
import BookCard from "../../../globalComponents/BookCard";
import PageSlider from "../../../globalComponents/PageSlider";
import deleteDuplicates from "../../../functions/deleteDuplicates";
import NotFound from "../../../assets/images/notFound.png";
import Star from "../../../assets/images/star.png";
const Favorites = ({ favoriteBooks }) => {
  const [bookMode, setBookMode] = useState("normal");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [nothingFound, setNothingFound] = useState(true);
  const pages = useMemo(() => {
    const books = (isFilterActive ? filteredBooks: favoriteBooks).map((elem) => <BookCard data={elem} mode={bookMode} key={elem.key}/>);
    const pages = [];
    const iterations = Math.ceil(books.length / 16);
    for (let i = 0; i < iterations; i++) {
      pages.push(books.splice(0, 16));
    }
    return pages;
  }, [bookMode, isFilterActive, favoriteBooks.length, filteredBooks.length]);
  useEffect(() => {
    let mass = [];
    if (filterText == "") {
      setIsFilterActive(false);
      setNothingFound(false);
      return;
    }
    if (!isFilterActive) setIsFilterActive(true);
    setCurrentPage(0);
    const slice = (text) => {
      return text.slice(0, filterText.length).toLowerCase();
    };
    const filterBySlices = (title) => {
      let data = favoriteBooks.filter((elem) => {
        let titles = elem[title].split(" , ");
        for (let i = 0; i < titles.length; i++) {
          if (slice(titles[i]) == filterText.toLowerCase()) return true;
        }
      });
      data = deleteDuplicates(data, mass);
      mass.push(...data);
    };
    //!! by title
    mass = favoriteBooks.filter(({ title }) => {
      return slice(title) == filterText.toLowerCase();
    });
    //!! by author
    filterBySlices("authors");
    //!! by category
    filterBySlices("categories");
    setFilteredBooks([...mass]);
    if (mass.length == 0) setNothingFound(true);
    else if (nothingFound) setNothingFound(false);
  }, [filterText, favoriteBooks.length]);
  useEffect(() => {
    if (!pages[currentPage]) setCurrentPage(pages.length - 1);
  }, [pages.length]);
  const returnBlock = () => {
    if (nothingFound)
      return (
        <div className="popup center cabinet__popup">
          <div className="width beet2">
            <img src={NotFound} />
            <p>Unfortunatelly 0 books was found</p>
          </div>
        </div>
      );
    if (pages.length == 0) return (
      <div className="popup center cabinet__popup">
          <div className="width beet2">
            <img src={Star} />
            <p>You don`t have liked books</p>
          </div>
        </div>
    )
    return (
      <div className="cabinet__body width">
        <div className={bookMode == "normal" ? "grid" : "row"}>
          {pages[currentPage]}
        </div>
        {pages.length > 1 && (
          <PageSlider
            {...{ currentPage, setCurrentPage }}
            pagesLength={pages.length}
          />
        )}
      </div>
    );
  };
  return (
    <div className="cabinet__liked">
      <div className="cabinet__header beet width">
        <p className="title">Your liked books</p>
        <div className="cabinet__aligner beet">
          <BookModeSwitcher data={bookMode} setData={setBookMode} />
          <Input
            setData={setFilterText}
            placeholder="type name , category , author of the book"
            style="cabinet-left"
          />
        </div>
      </div>
			{returnBlock()}
    </div>
  );
};
export default Favorites;
