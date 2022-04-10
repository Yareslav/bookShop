import React, { useState, useContext, useEffect, useRef } from "react";
import SignUp from "../../assets/images/signUp.png";
import Input from "../../globalComponents/Input";
import Container from "../../globalComponents/Container";
import {GenerateMistake,conditions} from "../../globalComponents/Forms";
import "../../assets/styles/signUp.css";
import Show from "../../assets/images/show.png";
import Hide from "../../assets/images/hide.png";
import {NavigateContext} from "../../App";
import {WindowContext} from "../../App";
import {
  useNavigate
} from "react-router-dom";
const CreateSignUpScreen=()=>{
	const [password,setPassword]=useState("");
	const [passwordCopy,setPasswordCopy]=useState("");
	const [email,setEmail]=useState("");
	const [fullName,setFullName]=useState("");
	const [showPassword,setShowPassword]=useState(false);
	const [errors,setErrors]=useState({
		fullName:false,
		password:false,
		email:false,
		passwordCopy:false
	});
	const manageWindow=useContext(WindowContext);
	const navigator=useNavigate();
	const navigate=useContext(NavigateContext);
	const submit=()=>{
		errors.password=conditions["password"](password);
		errors.fullName=conditions["fullName"](fullName);
		errors.email=conditions["email"](email);
		if (!errors.password) errors.passwordCopy=!(passwordCopy==password);
		setErrors({...errors});
		if (!errors.fullName && !errors.password && !errors.passwordCopy && !errors.email) {
			localStorage.setItem("registrationData",JSON.stringify({
				isSignedIn:false,
				password,
				email,
				fullName,
				photo:""
			}));
			manageWindow("Account was succesfully created , just one more step",false);
			navigate(navigator,"/signIn");
		}
	}
	const getRidOfErrors=(setErrors,errors,type,value,data)=>{
		if (!errors[type]) return;
		if (type=="passwordCopy") {
			errors[type]=!(value==data)
		}
		else errors[type]=conditions[type](value);
		setErrors({...errors});
	}
	const errorData=[null,setErrors,errors];
	return (<Container style="big">
		<img className="screen__image" src={SignUp}/>
		<p className="screen-margin title align">Create a user to have an access to library</p>
		<div className="width">
			<p className="blackTitle">Full name</p>
			<Input placeholder="John Doe" setData={setFullName} style={errors.fullName && "screen-formError"} functionality={getRidOfErrors.bind(...errorData,"fullName")}/>
			{errors.fullName && <GenerateMistake text="Full Name must contain at least 5 characters and 2 words"/>}
		</div>
		<div className="screen-top width">
			<p className="blackTitle">Email</p>
			<Input placeholder="yaremapylyp2@gmail.com" setData={setEmail} style={errors.email && "screen-formError"} functionality={getRidOfErrors.bind(...errorData,"email")}/>
			{errors.email && <GenerateMistake text="email must contain @ . and its length must be minimum 8 characters"/>}
		</div>
		<div className="password width">
			<div onClick={()=>setShowPassword(curr=>!curr)} className="beet">
				<img src={showPassword ? Show : Hide}/>
				<p>{showPassword ? "Hide" : "Show"}</p>
			</div>
		</div>
		<div className="screen-top width">
			<p className="blackTitle">Password</p>
			<Input placeholder="34444444AAAaaqqqxxxz" setData={setPassword} style={errors.password && "screen-formError"} hidePassword={!showPassword} functionality={getRidOfErrors.bind(...errorData,"password")}/>
			{errors.password && <GenerateMistake text="Password must contain at least 8 letters , upperCase letters and numbers ."/>}
		</div>
		<div className="screen-top width">
			<p className="blackTitle">Repeat Password</p>
			<Input
				placeholder="34444444AAAaaqqqxxxz"
				setData={setPasswordCopy}
				style={errors.passwordCopy && "screen-formError"}
				hidePassword={!showPassword}
				functionality={getRidOfErrors.bind(...errorData,"passwordCopy")}
				data={password}
			/>
			{errors.passwordCopy && <GenerateMistake text="Passwords doesn`t match" setData={setPasswordCopy} />}
			<p className="text">Don`t know what password to Choose . Use our  <span onClick={()=>navigate("/passwordGenerator")}>Password Generator</span></p>
		</div>
		<div className="button screen__button screen-margin" onClick={submit}>
			<p className="screen__bigTitle">Create account</p>
		</div>
	</Container>);
}
export default CreateSignUpScreen;