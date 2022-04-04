import React, { useCallback, useEffect, useState, useMemo,useContext } from "react";
import starFilled from "../../assets/images/starFilled.png";
import starHalfFilled from "../../assets/images/starHalfFilled.png";
import starEmpty from "../../assets/images/starEmpty.png";
const Stars=({style,amount})=>{
	const data=useMemo(()=>{
			const mass = [],
				roundNumber = Math.floor(amount);
			for (let i = 0; i < roundNumber; i++) {
				mass.push(starFilled);
			}
			if (amount != roundNumber) mass.push(starHalfFilled);
			const length = mass.length;
			for (let i = 0; i < 5 - length; i++) {
				mass.push(starEmpty);
			}
			return mass.map((elem) => <img src={elem}/>);
	},[]);
	return (<div className={"beet "+style}>{data}</div>)
}
export default Stars;