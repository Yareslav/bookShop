import compare from "./compare";
export default (results,globalMass)=>{
	return results.filter((elem)=>{
		for (let i=0;i<globalMass.length;i++) {
			if (compare(elem,globalMass[i])) {
				console.log("copy was found");
				return false;
			}
		}
		return true;
	})
}