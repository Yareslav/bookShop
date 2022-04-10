import Search from "../assets/images/search.png";
import Cross from "..//assets/images/cross.png";
import React,{useRef,useState,useContext,useEffect} from "react";
const Input=({setData,placeholder,style="",functionality=()=>{},hidePassword,data,value})=>{
	const [active,setActive]=useState(false);
	const [focused,setFocused]=useState(false);
	const input=useRef();
	const changeHandler=(eve)=>{
		const value=eve.target.value;
		if (value=="") setActive(false);
		else if (!active) {
			setActive(true);
		}
		functionality(value,data);
		setData(value);
	}
	const clearHandler=()=>{
		input.current.value="";
		input.current.blur();
		setActive(false);
		setData("");
	}
	return (<div className={`input ${style} ${focused ? "input-focused" : ""}`}>
		{!active && <img src={Search} className="input__icon"/>}
		<input
		type={hidePassword ? "password" : "text"}
		className={focused ? "input-focused" : ""}
		placeholder={placeholder}
		onChange={changeHandler}
		ref={input}
		value={value}
		onFocus={()=>setFocused(true)}
		onBlur={()=>setFocused(false)}
		/>
		{active && <img src={Cross} className="input__clear" onClick={clearHandler}/>}
	</div>);
}
export default Input;