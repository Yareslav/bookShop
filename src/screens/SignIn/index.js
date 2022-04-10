import React, { useState, useContext, useEffect, useRef } from "react";
import Input from "../../globalComponents/Input";
import Container from "../../globalComponents/Container";
import SignIn from "../../assets/images/signIn.png";
import { GenerateMistake, conditions } from "../../globalComponents/Forms";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/signIn.css";
import Show from "../../assets/images/show.png";
import Hide from "../../assets/images/hide.png";
import {NavigateContext} from "../../App";
import {WindowContext} from "../../App";
const CreateSignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [fullNameOrEmail, setFullNameOrEmail] = useState("");
  const [errors, setErrors] = useState({
    password: false,
    fullNameOrEmail: false,
    general: false,
  });
  const manageWindow=useContext(WindowContext);
  const navigator = useNavigate();
  const navigate=useContext(NavigateContext);

  const errorData = [null, setErrors, errors];
  const isInputDataAnEmail = !conditions["email"](fullNameOrEmail);

  const getRidOfErrors = (setErrors, errors, type, value) => {
		if (!errors[type]) return;
		if (type=="fullNameOrEmail") {
      errors[type]=isInputDataAnEmail ? conditions["email"](value) : conditions["fullName"](value);
    }
    else errors[type] = conditions[type](value);
    setErrors({ ...errors });
  };
  const submit = () => {
    const isInputDataAnFullName = !conditions["fullName"](fullNameOrEmail);

    errors.password = conditions["password"](password);
    if (!isInputDataAnEmail && !isInputDataAnFullName) errors.fullNameOrEmail = true;
    else errors.fullNameOrEmail = false;

    if (!errors.password && !errors.fullNameOrEmail) {
      const type = isInputDataAnEmail ? "email" : "fullName";
      const data = JSON.parse(localStorage.getItem("registrationData"));

      if (
        data.password != password ||
        (type == "email"
          ? fullNameOrEmail != data.email
          : fullNameOrEmail != data.fullName)
      )
        errors.general = true;
      else {
        errors.general = false;
        localStorage.setItem(
          "registrationData",
          JSON.stringify({ ...data, isSignedIn: true })
        );
        manageWindow("Welcome",false);
        navigate(navigator,"/cabinet");
      }
    }
    setErrors({ ...errors });
  };
  return (
    <Container style="content">
      <img className="screen__image" src={SignIn} />
      <p className="screen-margin title align">Just one more step</p>
      <div className="screen-top width">
        <p className="blackTitle">FullName Or Email</p>
        <Input
          placeholder="34444444AAAaaqqqxxxz or John Doe"
          setData={setFullNameOrEmail}
          style={errors.fullNameOrEmail && "screen-formError"}
          functionality={getRidOfErrors.bind(...errorData, "fullNameOrEmail")}
        />
        {errors.fullNameOrEmail && (
          <GenerateMistake text="Full Name or email is wrong . Email must contain @ . and its length must be minimum 8 characters . Full Name must contain at least 5 characters and 2 words" />
        )}
      </div>

      <div className="password width">
        <div onClick={() => setShowPassword((curr) => !curr)} className="beet">
          <img src={showPassword ? Show : Hide} />
          <p>{showPassword ? "Hide" : "Show"}</p>
        </div>
      </div>

      <div className="screen-top width">
        <p className="blackTitle">Password</p>
        <Input
          placeholder="34444444AAAaaqqqxxxz"
          setData={setPassword}
          style={errors.password && "screen-formError"}
          hidePassword={!showPassword}
          functionality={getRidOfErrors.bind(...errorData, "password")}
        />
        {errors.password && (
          <GenerateMistake text="Password must contain at least 8 letters , upperCase letters and numbers ." />
        )}
      </div>
      {errors.general && (
        <GenerateMistake text="Password or full name doesn`t match" />
      )}

      <div className="button screen__button screen-margin" onClick={submit}>
        <p className="screen__bigTitle">Sign In</p>
      </div>
    </Container>
  );
};
export default CreateSignInScreen;