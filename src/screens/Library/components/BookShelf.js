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
const BookShelf = ({ favoriteBooks,title,setLibraries,ind,setAddingBook,addingBook }) => {
	const [showHiddenBooks,setShowHiddenBooks]=useState(false);
	const deleteHandler=()=>{
    if (window.confirm(`Are you sure you want to delete ${title} library`)) {
      setLibraries(curr=>curr.filter((_,i)=>i!=ind))
    }
	}
	const addHandler=()=>{
    console.log(addingBook);
		setAddingBook(curr=>({...curr,active:true,bookShelfIndex:ind}))
	}
	const bookCards=useMemo(()=>{
		const results=favoriteBooks.filter((elem)=>{
			if (!elem.libraries?.length) return false;
			for (let i=0;i<elem.libraries.length;i++) {
				if (elem.libraries[i]==title) return true;
			}
		});
		return results;
	},[])
  return (
    <div className="library__line">
      <div className="library__top beet">
        <p className="library__title title">{title}</p>
        <div className="button black library__button addBooks" onClick={addHandler}>
          <div className="beet">
            <img src={Plus} />
            <p>Add books</p>
          </div>
        </div>
      </div>
      <div className="library__bookShelf grid">{bookCards}</div>
      <div className="library__buttons beet">
        <div className="button black library__button addBooks screen-top" onClick={deleteHandler}>
          <div className="beet">
            <img src={Delete} />
            <p>Delete library</p>
          </div>
        </div>
				<div className={"button library__button addBooks screen-top "+(showHiddenBooks ? "green" : "blue")} onClick={()=>setShowHiddenBooks(curr=>!curr)}>
          <div className="beet">
            <img src={showHiddenBooks ? ArrowUpward : ArrowDownward} />
            <p>Show {showHiddenBooks ? "less" : "more"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookShelf;