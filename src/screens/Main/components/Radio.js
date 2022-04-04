import React, { useState, useContext, useEffect, useRef } from "react";
const Radio = ({ type, setData, data }) => {
  const clickHandler = () => {
    if (type == data) return;
    setData(type);
  };
  return (
    <div className="beet stretch">
      <div className="main__radio center" onClick={clickHandler}>
        {data == type && <div />}
      </div>
      <p className="main__text main-left">{type}</p>
    </div>
  );
};
export default Radio;