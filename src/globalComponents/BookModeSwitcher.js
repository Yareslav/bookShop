import React, { useState, useContext, useEffect, useRef } from "react";
import Grid from "../assets/images/grid.png";
import List from "../assets/images/list.png";
const BookModeSwitcher=({setData,data})=>{
	return (<div className="switcher beet">
		<div className={"switcher__block switcher-left "+(data=="normal" ? "switcher-active" : "")} onClick={()=>setData("normal")}>
			<img src={Grid}/>
		</div>
		<div className={"switcher__block switcher-right "+(data=="large" ? "switcher-active" : "")} onClick={()=>setData("large")}>
			<img src={List}/>
		</div>
	</div>)
}
export default BookModeSwitcher;