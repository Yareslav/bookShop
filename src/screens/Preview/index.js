import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../globalComponents/bookComponents/Button";
import Stars from "../../globalComponents/bookComponents/Stars";
import Hearth from "../../globalComponents/bookComponents/Hearth";
import data from "../../info0";
import Ok from "../../assets/images/ok.png";
import NotOk from "../../assets/images/close.png";
import "../../assets/styles/preview.css";
import ArrowDownward from "../../assets/images/arrowDownward.png";
import ArrowUpward from "../../assets/images/arrowUpward.png";
const CreatePreviewScreen = () => {
  const {state} = useLocation();
  const description = useRef();
  const titles = useMemo(() => {
    return [
      { data: state.country, title: "Country" },
      { data: state.type, title: "Type" },
      { data: state.language, title: "Language" },
      { data: state.pageCount, title: "Pages Number" },
      { data: state.categories, title: "Category" },
      { data: state.publishedDate, title: "Publish date" },
      { data: state.listPrice, title: "List price" },
      { data: state.retailPrice, title: "Retail Price" },
      { data: state.subtitle, title: "Subtitle" },
    ]
      .filter(({ data }) => data != "Unknown" && data)
      .map(({ data, title }) => (
        <p className="preview__row">
          {title} : <span>{data}</span>
        </p>
      ));
  }, []);
  const [viewAllText, setViewAllText] = useState(false);
  return (
    <div className="screen">
      <div className="preview screen__container beet2">
        <div className="preview__container width beet">
          <div className="preview__block">
            <img src={state.image} className="preview__mainImg"/>
            <Button data={state} style="preview__button" />
          </div>
          <div className="preview__mainInfo">
            <p className="blackTitle">{state.title}</p>
            <div className="stretch beet">
              <Stars amount={state.rating} style="screen-top preview__stars" />
              <Hearth data={state} style="preview__hearth"/>
            </div>
            <p className="screen-top preview__author">{state.authors}</p>
            <div className="screen-top preview__availability beet">
              <div className="beet">
                <img src={state.epub ? Ok : NotOk} />
                <p>Is available in epub</p>
              </div>
              <div className="beet">
                <img src={state.pdf ? Ok : NotOk} />
                <p>Is available in pdf</p>
              </div>
            </div>
            <div className="screen-top preview__titles">{titles}</div>
          </div>
        </div>
        <div className="preview__description beet2">
          <p ref={description} className={!viewAllText && "preview__hidden"}>
            {state.description}
          </p>
          <div
            className={"preview__textButton button "+(viewAllText ? "yellow" : "green")}
            onClick={() => setViewAllText((curr) => !curr)}
          >
            <div className="beet">
              <img src={viewAllText ? ArrowUpward : ArrowDownward} />
              <p>Show {viewAllText ? "less" : "more"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePreviewScreen;