export default (book,options=[],filters,startIndex=0)=>{
	const key = "AIzaSyBEIqK7j9rLo7FHM4Fdl41EITEsGLHFx9E",
	url="https://www.googleapis.com/books";
	let option="";
	options.forEach(({type,data})=>{
		option+=` ${type}:${data}`;
	});
	const filter=(filters!=undefined && filters!="all") ? `&filter=${filters}` : ``;
  return fetch(`${url}/v1/volumes/?q=${book}${option}${filter}&key=${key}&maxResults=40&startIndex=${startIndex}`);
}
