
import unknownImage from "../assets/images/unknownImage.png"
import random from "./random";
export default (obj)=>{
	const {accessInfo,volumeInfo,saleInfo}=obj;
	const canBeBought=saleInfo.saleability=="FOR_SALE" && saleInfo.listPrice?.amount!=0;
	const prices=canBeBought ? {
		listPrice:Math.round(saleInfo.listPrice.amount) + " "+ saleInfo.listPrice.currencyCode,
		retailPrice:Math.round(saleInfo.retailPrice.amount)+" "+saleInfo.retailPrice.currencyCode
	} : {};
	function makeString(mass) {
		return mass ?	mass.reduce((curr,next)=>curr+" , "+next) : "Unknown"
	}
	function formatText(textObj) {
		let text=textObj ? textObj.textSnippet : "";
		if (!text) return "Unknown";
		text=text.replaceAll("<b>","");
		text=text.replaceAll("</b>","");
		return text;
	}
	let image=!volumeInfo.imageLinks ? unknownImage : volumeInfo.imageLinks.thumbnail;
	const result= {
		title:volumeInfo.title?.slice(0,60),
		image:image,
		epub:accessInfo.epub.isAvailable,
		pdf:accessInfo.pdf.isAvailable,
		type:saleInfo.isEbook ? "Electronic" : "Non electronic",
		canBeBought:canBeBought,
		...prices,
		country:saleInfo.country,
		authors:makeString(volumeInfo.authors),
		rating:volumeInfo.averageRating || 0,
		categories:makeString(volumeInfo.categories),
		description:volumeInfo.description || formatText(obj.searchInfo),
		language:volumeInfo.language,
		pageCount:volumeInfo.pageCount,
		subtitle:volumeInfo.subtitle,
		publishedDate:volumeInfo.publishedDate,
		link:canBeBought ? saleInfo.buyLink : volumeInfo.previewLink,
		publisher:volumeInfo.publisher,
		libraries:[]
	};
	for (let key in result) {
		if (result[key]===undefined) result[key]="Unknown";
	}
	result.key=result.description.slice(0,40)+result.title+result.authors;
	return result;
}