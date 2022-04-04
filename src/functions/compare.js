export default (objData,objCompare)=>{
	for (let key in objData) {
		if (Array.isArray(objData[key])) {
			for (let i=0;i<objData[key].length;i++) {
				if (objData[key][i]!=objCompare[key][i]) return false;
			}
			continue;
		}
		if (objData[key]!=objCompare[key]) return false;
	}
	return true;
}