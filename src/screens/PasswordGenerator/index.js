import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
} from "react";
import Container from "../../globalComponents/Container";
import Secure from "../../assets/images/secure.png";
import "../../assets/styles/passwordGenerator.css";
import CheckBox from "./components/CheckBox";
import ReactSlider from "react-slider";
import random from "../../functions/random";
export const CheckBoxesContext = createContext();
const PasswordGenerator = () => {
  const copyHandler = () => {
		navigator.clipboard.writeText(result);
	};
  const [includingData, setIncludingData] = useState({
    lowerCase: true,
    upperCase: false,
    numbers: true,
    symbols: false,
  });
	const [passwordLength, setPasswordLength] = useState(20);
	const [lettersFrequency,setLettersFrequency]=useState(5);
	const [numbersFrequency,setNumbersFrequency]=useState(5);
	const [symbolFrequency,setSymbolFrequency]=useState(5);
	const [result,setResult]=useState("");
	class GeneratePassword{
		results={
			letters:{
				number:0,
        mass:[],
        variants:["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
			},
			symbols:{
				number:0,
				mass:[],
				variants:["!",",","/",".",">","<","@","#","$","%","^","&","*","(",")","{","}","[","]","+","=","-",":",";"," "]
			},
			numbers:{
				number:0,
				mass:[],
				variants:[0,1,2,3,4,5,6,7,8,9]
			}
		}
		constructor() {
      const cannelGeneration=!Object.values(includingData).includes(true);
      if (cannelGeneration) return;
			const mass=[];
			this.setNumbers();
			this.fillResults();
			mass.push(...this.results.letters.mass,...this.results.symbols.mass,...this.results.numbers.mass);
      mass.sort(()=>0.5-Math.random());
			setResult(mass.join(""));
		}
		setNumbers() {
      const includeLetters=(includingData.lowerCase || includingData.upperCase);
      const sum=(includeLetters ? lettersFrequency : 0)+(includingData.numbers ? numbersFrequency : 0)+(includingData.symbols ? symbolFrequency : 0);
      const coefficient=passwordLength/sum;
      const {results}=this;
      if (includeLetters) results.letters.number=this.getMaxValue(lettersFrequency*coefficient);
      if (includingData.numbers) results.numbers.number=this.getMaxValue(numbersFrequency*coefficient);
      if (includingData.symbols) results.symbols.number=this.getMaxValue(symbolFrequency*coefficient);
      const activeArrays=Object.values(results).filter(elem=>elem.number!=0);
      let index=0;
      while ((results.numbers.number+results.letters.number+results.symbols.number)<passwordLength) {
        activeArrays[index].number++;
        index++;
        if (index>activeArrays.length-1) index=0;
      }
		}
		fillResults() {
			const {results}=this;
			for (const key in results) {
				for (let i=0;i<results[key].number;i++) {
          const variants=results[key].variants;
          let variant=variants[random(0,variants.length-1)];
          if (key=="letters") {
            if (includingData.upperCase && includingData.lowerCase && random(0,1)==0) variant=variant.toUpperCase();
            else if (!includingData.lowerCase && includingData.upperCase) variant=variant.toUpperCase();
          }
					results[key].mass.push(variant);
				}
			}
    }
    getMaxValue(value) {
      let data=Math.floor(value);
      if (data<1) return 1;
      return data;
    }
	}
  return (
    <Container style="generator">
      <img src={Secure} className="screen__image" />
      <p className="screen-margin title generator__center">
        Generate a strong password with our generator
      </p>
      <div className="generator__grid screen-margin">
        <CheckBoxesContext.Provider value={[includingData, setIncludingData]}>
          <div>
            <p className="blackTitle">Letters</p>
            <CheckBox
              text="include lowercase : (a,b,c,d,e,f)"
              type="lowerCase"
            />
            <CheckBox
              text="include uppercase : (A,B,C,D,E,F)"
              type="upperCase"
            />
						{(includingData.lowerCase || includingData.upperCase) && <ReactSlider
              defaultValue={lettersFrequency}
              min={1}
              max={10}
              onChange={(data) => setLettersFrequency(data)}
              renderThumb={(props) => (<div className="thumb-0" {...props}>
    						{lettersFrequency}
  						</div>)}
            	/>}
          </div>
          <div>
            <p className="blackTitle">Numbers</p>
            <CheckBox
              text="include numbers : (0,1,2,3,4,5,6,...)"
              type="numbers"
            />
						{includingData.numbers && <ReactSlider
              defaultValue={numbersFrequency}
              min={1}
              max={10}
              onChange={(data) => setNumbersFrequency(data)}
              renderThumb={(props) => (<div className="thumb-0" {...props}>
    						{numbersFrequency}
  						</div>)}
            	/>}
          </div>
          <div>
            <p className="blackTitle">Symbols</p>
            <CheckBox
              text="include symbols : (@,#,&,<,-,+,{,...)"
              type="symbols"
            />
							{includingData.symbols && <ReactSlider
              defaultValue={symbolFrequency}
              min={1}
              max={10}
              onChange={(data) => setSymbolFrequency(data)}
              renderThumb={(props) => (<div className="thumb-0" {...props}>
    						{symbolFrequency}
  						</div>)}
            	/>}
          </div>
          <div>
            <p className="blackTitle">Password length</p>
            <ReactSlider
              defaultValue={passwordLength}
              min={5}
              max={90}
              onChange={(data) => setPasswordLength(data)}
              renderThumb={(props) => (<div className="thumb-0" {...props}>
    						{passwordLength}
  						</div>)}
            	/>
          </div>
        </CheckBoxesContext.Provider>
      </div>
      <div className="screen-margin button screen__button" onClick={()=>new GeneratePassword()}>
        <p className="screen__bigTitle ">Create Password</p>
      </div>
      <div className="generator__menu beet screen-margin">
        <p className="blackTitle generator__title">Your password :</p>
        <input type="text" className="generator__output" value={result} onChange={(eve)=>setResult(eve.target.value)}/>
        <div className="generator__copy button" onClick={copyHandler}>
          <p>Copy</p>
        </div>
      </div>
    </Container>
  );
};
export default PasswordGenerator;