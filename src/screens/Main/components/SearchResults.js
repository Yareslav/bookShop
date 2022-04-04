import React, { useState, useContext, useEffect, useMemo } from "react";
import NotFound from "../../../assets/images/notFound.png";
import BookCard from "../../../globalComponents/BookCard";
import Loading from "../../../assets/images/loading.png";
import {SortContext} from "../index";
import { SearchContext } from "../../../App";
import PageSlider from "../../../globalComponents/PageSlider";
const SearchResults = ({
  foundItems,
  bookView,
  nothingFound,
  sortedItems,
  loading,
}) => {
  const [currentPage,setCurrentPage]=useState(0);
  const {sorting} =useContext(SortContext);
  const books=useMemo(()=>{
    return (sortedItems.length == 0 ? foundItems : sortedItems).map(
      (elem) => (
        <BookCard data={elem} mode={bookView} key={elem.key}/>
      )
    )
  });
  const pages=useMemo(()=>{
    const mass=[];
    const iterations=Math.ceil(books.length/40);
    for (let i=0;i<iterations;i++) {
      mass.push(books.slice(i*40,(i*40)+40))
    }
    return mass;
  });
  useEffect(()=>{
    if (currentPage!=0) setCurrentPage(0);
  },[loading]);
  return (
    <>
      {nothingFound ? (
        <div className="popup center">
          <div className="width beet2">
            <img src={NotFound} />
            <p>Unfortunatelly 0 books was found</p>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <img src={Loading} className="main__loading" />
          ) : (
            <>
              <p className="title">Found {foundItems.length} results</p>
              <p className="main__line" />
            </>
          )}
          <div className={bookView == "normal" ? "grid" : "row"}>
            {pages[currentPage]}
          </div>
          {books.length>40 && <PageSlider {...{currentPage,setCurrentPage}} pagesLength={pages.length}/>}
        </>
      )}
    </>
  );
};
export default SearchResults;
