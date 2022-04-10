import React, { useState, createContext } from "react";
import Error from "../assets/images/error.png";
import Ok from "../assets/images/ok.png";
import animations from "../animations";
import {StyleRoot} from "radium";
const Window=({isError,message,isInShowMode})=>{
	return (<StyleRoot className="window beet" style={isInShowMode ? animations.fadeInRight : animations.fadeOutRight}>
		<img src={isError ? Error : Ok}/>
		<p>{message}</p>
	</StyleRoot>)
}
export default Window;