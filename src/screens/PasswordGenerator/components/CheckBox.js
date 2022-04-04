import Ok from "../../../assets/images/ok.png";
import {useContext} from "react";
import {CheckBoxesContext} from "../index";
const CheckBox=({text,type})=>{
	const	[booleans,setBooleans]=useContext(CheckBoxesContext);
	const clickHandler=()=>{
		booleans[type]=!booleans[type];
		setBooleans({...booleans});
	}
	return (<div className="checkBox">
		<div className="checkBox__container center" onClick={clickHandler}>
			{booleans[type] && <img src={Ok}/>}
		</div>
		<p className="left">{text}</p>
	</div>)
}
export default CheckBox;