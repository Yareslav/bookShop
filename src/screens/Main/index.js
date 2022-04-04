import React, { useState, useContext, useEffect, createContext } from "react";
import "../../assets/styles/main.css";
import { SearchContext } from "../../App";
import OfferBooks from "./components/OfferBooks";
import Article from "./components/Article";
import SearchResults from "./components/SearchResults";
import fetcher from "../../functions/fetcher";
import compare from "../../functions/compare";
export const SortContext = createContext();
const CreateMainScreen = ({showArticle}) => {
  const { searchActive } = useContext(SearchContext);
  const [foundItems, setFoundItems] = useState([]);
  const [bookView, setBookView] = useState("normal");
  const [nothingFound, setNothingFound] = useState(false);
  const [sortedItems, setSortedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const sortOptions = {
    disabled: "disabled",
    ascending: "ascending",
    descending: "descending",
  };
  const [sorting, setSorting] = useState({
    money: sortOptions.disabled,
    rating: sortOptions.disabled,
    date: sortOptions.disabled,
  });
  class Sort {
    constructor() {
      let entries = Object.entries(sorting);
      const sortedData = [...foundItems];
      entries = entries.filter((elem) => elem[1] != sortOptions.disabled);
      setSortedItems([]);
      if (entries.length == 0) return;
        const type = entries[0][0] , mode=entries[0][1];
        const getCount = this.count.bind(null, type);
        sortedData.sort((curr, next) => {
          if (type=="date") {
            const comparedDate=this.compareDateInAscendingMode(curr,next);
            if (mode==sortOptions.ascending) return comparedDate;
            return -comparedDate;
          }
          if (mode == sortOptions.ascending) return getCount(curr) - getCount(next);
          else return getCount(next) - getCount(curr);
        });
      setSortedItems([...sortedData]);
    }
    compareDateInAscendingMode(curr, next) {
      let currDate = curr.publishedDate;
      let nextDate = next.publishedDate;
      if (currDate == "Unknown") return -1;
      if (nextDate == "Unknown") return 1;
      currDate = currDate.split("-");
      nextDate = nextDate.split("-");
      const currentYear = +currDate[0],
        nextYear = +nextDate[0];
      if (
        currDate.length == 1 ||
        nextDate.length == 1 ||
        currentYear != nextYear
      )
        return currentYear - nextYear;
      const currentMonth = +currDate[1],
        nextMonth = +nextDate[1];
      if (currentMonth != nextMonth) return currentMonth - nextMonth;
      const currentDay = +currDate[2],
        nextDay = +nextDate[2];
      return currentDay - nextDay;
    }
    count(type, obj) {
      if (type == "money") {
        if (obj.canBeBought) return +obj.listPrice.split(" ")[0];
        return 0;
      }
      if (type == "rating") return obj.rating;
    }
  }
  useEffect(()=>{
    new Sort();
  },[...Object.values(sorting),loading]);
  useEffect(()=>{
    if (!searchActive) return;
    const mass=JSON.parse(localStorage.getItem("searchData"));
    if (mass?.length==0) return;
    setFoundItems([...mass]);
  },[])
  return (
    <div className="main beet">
      <SortContext.Provider value={{ sorting, setSorting, sortOptions}}>
        {showArticle && <Article
          {...{
            setFoundItems,
            foundItems,
            setBookView,
            bookView,
            nothingFound,
            setNothingFound,
            setLoading
          }}
        />}
      <div className="main__body">
        {searchActive ? (
          <SearchResults
            {...{ foundItems, bookView, nothingFound, sortedItems, loading }}
          />
        ) : (
          <OfferBooks />
        )}
      </div>
      </SortContext.Provider>
    </div>
  );
};
export default CreateMainScreen;