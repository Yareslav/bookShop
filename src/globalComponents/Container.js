import React from "react";
const Container=({children,style})=>(
	<div className="screen">
		<div className={"screen__container beet2 "+style}>
			{children}
		</div>
	</div>
);
export default Container;