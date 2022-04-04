import Input from "../../../globalComponents/Input";
import Down from "../../../assets/images/down.png";
import ArrowLeft from "../../../assets/images/arrowLeft.png";
import ArrowRight from "../../../assets/images/arrowRight.png";
import Up from "../../../assets/images/up.png"
import BookCard from "../../../globalComponents/BookCard";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from "react";
import {StyleRoot} from "radium";
import animations from "../../../animations";
const BookDragSlider=({setAddingBook,favoriteBooks})=>{
	const [opened,setOpened]=useState(true);
	const favoriteBooksElements=useMemo(()=>{
		return favoriteBooks.map(elem=><BookCard data={elem} mode="small"/>)
	},[]);
	const closeHandler=()=>{
		setOpened(false);
		setTimeout(()=>{
			setAddingBook(curr=>({...curr,active:false}));
		},1000)
	}
	return (<StyleRoot className="library__bookDrag" style={opened ? animations.fadeInUp : animations.fadeOutDown}>
		<div className="library__controls beet">
			<Input placeholder="type the name/author of the book" style="library__dropDownInput"/>
			<div className="library__close center" onClick={closeHandler}>
				<img src={opened ? Down : Up}/>
			</div>
		</div>
		<div className="library__miniBooks beet">
			<div className="library__slider center">
				<img src={ArrowLeft}/>
			</div>
			{/* <div className="library__mainContainer">{favoriteBooksElements}</div> */}
			<div className="library__slider center">
				<img src={ArrowRight}/>
			</div>
		</div>
	</StyleRoot>);
}
export default BookDragSlider;