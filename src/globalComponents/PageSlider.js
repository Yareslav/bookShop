import React, { useState, useContext, useEffect, useMemo } from "react";
import ArrowLeft from "../assets/images/arrowLeft.png";
import ArrowRight from "../assets/images/arrowRight.png";
const PageSlider = ({ currentPage, setCurrentPage, pagesLength }) => {
  const blocks = useMemo(() => {
    const mass = [];
    if (pagesLength < 7) {
      for (let i = 0; i < pagesLength; i++) {
        mass.push(<Block {...{ currentPage, setCurrentPage, i }} />);
      }
    } else {
      const data = { currentPage, setCurrentPage };
      const addDotsToEnd = pagesLength - 1 - currentPage > 3;
      const addDotsToStart = currentPage > 3;

      mass.push(<Block i={0} {...data} />);
      if (addDotsToEnd && addDotsToStart) {

        mass.push(<Block {...data} specialMode={true} i={currentPage - 2} />);

        const numbers = [-1, 0, 1].forEach((elem) => {
          mass.push(<Block i={currentPage + elem} {...data} />);
        });

        mass.push(<Block {...data} specialMode={true} i={currentPage + 2} />);

      } else if (addDotsToEnd) {

        for (let i = 1; i < 5; i++) {
          mass.push(<Block {...data} i={i} />);
        }

        mass.push(<Block {...data} specialMode={true} i={5} />);

      } else if (addDotsToStart) {
        mass.push(
          <Block {...data} specialMode={true} i={currentPage - 1 - 5} />
        );

        for (let i = pagesLength - 2 - 3; i < pagesLength - 1; i++) {
          mass.push(<Block {...data} i={i} />);
        }
      }
      mass.push(<Block i={pagesLength - 1} {...data} />);
    }
    return mass;
  }, [pagesLength, currentPage]);

  const arrowClickHandler = (type) => {
    if (type == "left") {
      if (currentPage == 0) return;
      setCurrentPage((curr) => curr - 1);
    } else {
      if (currentPage == pagesLength - 1) return;
      setCurrentPage((curr) => curr + 1);
    }
  };

  return (
    pagesLength != 1 && (
      <div className="pageSlider center">
        <div className="pageSlider__container">
          <div
            className={currentPage == 0 && "pageSlider-disabled"}
            onClick={() => arrowClickHandler("left")}
          >
            <img src={ArrowLeft} />
          </div>
          {blocks}
          <div
            className={currentPage == pagesLength - 1 && "pageSlider-disabled"}
            onClick={() => arrowClickHandler("right")}
          >
            <img src={ArrowRight} />
          </div>
        </div>
      </div>
    )
  );
};
export default PageSlider;
const Block = ({ currentPage, setCurrentPage, i, specialMode }) => {
  const clickHandler = () => {
    if (i == currentPage) return;
    setCurrentPage(i);
  };
  return (
    <div
      onClick={clickHandler}
      className={currentPage == i && "pageSlider-active"}
    >
      <p>{specialMode ? "..." : i + 1}</p>
    </div>
  );
};
