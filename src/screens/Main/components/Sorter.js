import React, { useState, useContext, useEffect, useRef } from "react";
import {SortContext} from "../index";
import UnactiveSort from "../../../assets/images/unactiveSort.png";
import SortDownwards from "../../../assets/images/sortDownwards.png";
import SortUpwards  from "../../../assets/images/sortUpwards.png";
const Sorter=({type})=>{
	const {sorting,setSorting,sortOptions,Sort}=useContext(SortContext);
	const clickHandler=()=>{
		const option=sorting[type];
		if (option==sortOptions.disabled) sorting[type]=sortOptions.descending;
		else if (option==sortOptions.descending) sorting[type]=sortOptions.ascending;
		else sorting[type]=sortOptions.disabled;
		disableOtherSorters();
		setSorting({...sorting});
	}
	const disableOtherSorters=()=>{
		for (let key in sorting) {
			if (key!=type) sorting[key]=sortOptions.disabled;
		}
	}
	const returnImage=()=>{
		const option=sorting[type];
		if (option==sortOptions.disabled) return UnactiveSort;
		else if (option==sortOptions.ascending) return SortUpwards;
		else return SortDownwards;
	}
  return  (<div className="main__sorter">
    <img className="main__sortImage" onClick={clickHandler} src={returnImage()}/>
    <p className="main__text">{type}</p>
  </div>);
}
export default Sorter;