import Camera from "../../../assets/images/camera.png";
import User from "../../../assets/images/user.png";
import LogOut from "../../../assets/images/logOut.png";
import { useNavigate } from "react-router-dom";
import {NavigateContext} from "../../../App";
import React, { useState, useContext, useEffect, useRef } from "react";
const Account = ({ userInfo, favoriteBooks }) => {
	const [photo, setPhoto] = useState(userInfo.photo ? userInfo.photo : User);
	const navigator = useNavigate();
  const changeHandler = (eve) => {
		const extension=eve.target.value.split(".")[1];
		const extensions=["jpg","jpeg","png","webp","gif"];
		if (!extensions.includes(extension)) return;
		const fileReader=new FileReader();
		fileReader.readAsDataURL(eve.target.files[0]);
		fileReader.onload=(eve)=>{
			const src=eve.target.result;
			setPhoto(src);
			localStorage.setItem("registrationData",JSON.stringify({ ...userInfo, photo: src }));
		}
	};
	const navigate=useContext(NavigateContext);
	const logOutHandler=()=>{
		localStorage.setItem("registrationData",JSON.stringify({...userInfo,isSignedIn: false}));
		navigate(navigator,"/");
	}
	const getArrayByTitle=(type)=>{
		let titles=[];
		const titlesObj={};
		favoriteBooks.forEach((elem)=>{
			let strings=elem[type].split(" , ");
			if (strings.length>1) {
				strings.forEach(text=>titles.push(text));
			}
			else titles.push(strings[0])
		});

		titles=titles.filter(elem=>elem!="Unknown");

		titles.forEach((elem)=>{
			if (titlesObj[elem]) titlesObj[elem]+=1;
			else titlesObj[elem]=1;
		});

		const maxNumber=Math.max(... Object.values(titlesObj));
		let favoriteTitles=[];
		for (let key in titlesObj) {
			if (titlesObj[key]==maxNumber) favoriteTitles.push(key);
		}
		if (favoriteTitles.length>3) return "Mixed";
		if (favoriteTitles.length==0) return "None";
		return favoriteTitles.reduce((curr,next)=>curr+" , "+next);
	}
  return (
    <div className="cabinet__contact beet2">
      <div className="cabinet__circle center">
        <img className="cabinet__photo" src={photo} />
        <div className="cabinet__makePhoto center">
          <input type="file" onChange={changeHandler} />
          <img src={Camera} />
        </div>
      </div>
      <p className="title cabinet__greenTitle margin">{userInfo.fullName}</p>
      <div className="cabinet__miniTable">
        <p className="cabinet__title margin">
          Favourite author : <span>{getArrayByTitle("authors")}</span>
        </p>
        <p className="cabinet__title margin">
          Favourite ganre : <span>{getArrayByTitle("categories")}</span>
        </p>
        <p className="cabinet__title margin">
          Total books : <span>{favoriteBooks.length}</span>
        </p>
      </div>
			<div className="cabinet__logOut margin" onClick={logOutHandler}>
				<img src={LogOut}/>
				<p className="cabinet__title">Log out</p>
			</div>
    </div>
  );
};
export default Account;