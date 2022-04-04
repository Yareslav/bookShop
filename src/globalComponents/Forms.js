import React from "react";
import Error from "../assets/images/error.png";
export const GenerateMistake=({text})=>{
	return (<div className="width beet screen-stretch screen-top">
		<img src={Error} className="screen__errorImage"/>
		<p className="screen__error">{text}</p>
	</div>)
}
export const conditions={
	password:(data)=>{
		let includeNumbers=false;
		let mass=data.split("");
		mass.forEach(elem => {
			if (+elem) includeNumbers=true;
		});
		return !(data.length>7 && data.toLocaleLowerCase()!=data && data.toUpperCase()!=data && includeNumbers)
	},
	email:(data)=>{
		let mass=data.split("");
		return !(data.length>7 && mass.includes("@") && mass.includes(".") && mass[mass.length-1]!=".")
	},
	fullName:(data)=>{
		let mass=data.trim().split(" ");
		return !(data.length>4 && mass.length==2)
	}
}