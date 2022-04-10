import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
const Authors = ({ authors }) => {
  const [show, setShow] = useState(false);
  const leaveHandler = () => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  return (
    <div className="book__relative">
      {show && <p className="book__hiddenAuthors">{authors}</p>}
      <p
        className="book__author"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={leaveHandler}
      >
        {authors}
      </p>
    </div>
  );
};
export default Authors;