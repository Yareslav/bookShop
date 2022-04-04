import React, { useState, useContext, useEffect, useRef } from "react";
import Input from "../../../globalComponents/Input";
import ReactSlider from "react-slider";
import fetcher from "../../../functions/fetcher";
import compare from "../../../functions/compare";
import formater from "../../../functions/formater";
import random from "../../../functions/random";
import { SearchContext } from "../../../App";
import BookModeSwitcher from "../../../globalComponents/BookModeSwitcher";
import Sorter from "./Sorter";
import animations from "../../../animations";
import {StyleRoot} from 'radium';
import Radio from "./Radio";
import {SortContext} from "../index";
import deleteDuplicates from "../../../functions/deleteDuplicates";
const Article = ({setFoundItems, foundItems,setBookView,bookView,nothingFound,setNothingFound,setLoading }) => {
  const [bookName, setBookName] = useState("");
  const [maxResults, setMaxResults] = useState(100);
  const [bookType, setBookType] = useState("all");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [publisher, setPublisher] = useState("");
  const { searchActive, setSearchActive } = useContext(SearchContext);
  const {Sort} =useContext(SortContext);
  const requestTimeout = useRef();
  class Request {
    results=[];
    completedRequests=0;
    constructor() {
      clearTimeout(requestTimeout.current);
      if (bookName == "") return;
      requestTimeout.current = setTimeout(() => {
        setFoundItems([]);
        this.results=[];
        //!bag fix
        foundItems=[];
        setLoading(true);
        if (!searchActive) setSearchActive(true);
				this.search();
      }, 1500);
    }
    async search() {
      let totalIterations=0;
      let mass=[];
      try {
        const response=await this.request(0);
        let {items=[],totalItems}=await response.json();
        mass=items;
        if (totalItems==0) throw new Error("nothing was found");
        totalIterations=Math.ceil((maxResults>=totalItems ? totalItems : maxResults)/40);
        if (nothingFound) setNothingFound(false);
        this.addToLocalstorage();
      } catch (error) {
        setNothingFound(true);
        console.error(error);
      }
        mass=this.format(mass.slice(0,maxResults));
        this.results.push(...mass);
        if (totalIterations<2) this.onRequestFinished();
        else this.completedRequests=totalIterations-1;
        for (let i=1;i<totalIterations;i++) this.fastRequest(i);
    }
    async fastRequest(i) {
      let mass=[];
        try {
          const response=await this.request(40*i);
          let {items=[]}=await response.json();
          mass=items;
        } catch(error) {
          console.error(error);
        }
        mass=this.format(mass.slice(0,maxResults-this.results.length));
        mass=deleteDuplicates(mass,this.results);
        this.results.push(...mass);
        this.completedRequests--;
        if (this.completedRequests===0) this.onRequestFinished();
    }
    request(startIndex) {
      let options=[
        { data: author, type: "inauthor" },
        { data: category, type: "subject" },
        { data: publisher, type: "inpublisher" }
      ]
      options=options.filter(({data})=>data!="");
      const strWithDeletedSpaces=bookName.split(" ").join();
      return fetcher(strWithDeletedSpaces,options,bookType,startIndex);
    }
    format(items) {
      return items.map((elem)=>formater(elem));
    }
    onRequestFinished() {
      localStorage.setItem("searchData",JSON.stringify(this.results));
      this.deleteResultsWithSameKeys();
      setFoundItems([...this.results]);
      setLoading(false);
    }
    deleteResultsWithSameKeys() {
      let keys=this.results.map((elem,ind)=>({key:elem.key,id:ind}));
      let obj={};
      keys.forEach((elem)=>{
        if (obj[elem.key]) {
          this.results.splice(elem.id,1,0);
          console.log("copy was found");
        }
        else obj[elem.key]=1;
      })
      this.results=this.results.filter((elem)=>elem!==0);
    }
    addToLocalstorage() {
      const mass=JSON.parse(localStorage.getItem("previousTopics"));
      if (mass.includes(bookName)) return;
      mass.push(bookName);
      localStorage.setItem("previousTopics",JSON.stringify(mass));
    }
  }
  useEffect(() => {
    new Request();
  },[bookName,bookType,maxResults,author,category,publisher]);
  return (
    <StyleRoot className="main__article beet2" style={animations.slideInLeft}>
      <p className="main__title blackTitle">Search for books</p>
      <Input
        placeholder="type the name of the book"
        style="main__mainInput"
        setData={setBookName}
      />
      <div className="width">
        <p className="main__text main-margin">Max Number</p>
        <ReactSlider
          defaultValue={maxResults}
          min={1}
          max={600}
          onChange={(data) => setMaxResults(data)}
          renderThumb={(props) => (
            <div className="thumb-0" {...props}>
              {maxResults}
            </div>
          )}
        />
      </div>
      <div className="main__radioButtons">
        <Radio type="all" setData={setBookType} data={bookType} />
        <Radio type="ebooks" setData={setBookType} data={bookType} />
        <Radio type="free-ebooks" setData={setBookType} data={bookType} />
        <Radio type="paid-ebooks" setData={setBookType} data={bookType} />
      </div>
      <div className="main__container">
        <p>Author</p>
        <Input placeholder="J K Rowling" setData={setAuthor} />
      </div>
      <div className="main__container">
        <p>Category</p>
        <Input placeholder="Fantasy" setData={setCategory} />
      </div>
      <div className="main__container">
        <p>Publisher</p>
        <Input placeholder="RELX" setData={setPublisher} />
      </div>
      {(searchActive && foundItems.length!=0) && <div className="width beet2">
        <p className="main__title blackTitle">Manage Selected</p>
        <BookModeSwitcher setData={setBookView} data={bookView}/>
        <div className="width beet"></div>
        <div className="main__sorters beet">
          <Sorter type="money"/>
          <Sorter type="rating"/>
          <Sorter type="date"/>
        </div>
      </div>}
    </StyleRoot>
  );
};
export default Article;