import React, { useState, useContext, useEffect,useMemo } from "react";
import fetcher from "../../../functions/fetcher";
import formater from "../../../functions/formater";
import random from "../../../functions/random";
import topics from "../topics";
import BookCard from "../../../globalComponents/BookCard";
import compare from "../../../functions/compare";
const OfferBooks = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let requestNumber = 6;
    const randomTopics = [...topics];
    randomTopics.sort(() => 0.5 - Math.random());
    let mass = [
      {
        title: "Books from author you liked",
        data: getBookField("authors"),
      },
      {
        title: "Books you were searching for",
        data: JSON.parse(localStorage.getItem("previousTopics")),
      },
      {
        title: "Books from categories you liked",
        data: getBookField("categories"),
      }
    ].forEach(async ({ title, data }) => {
      if (data.length == 0) return;
      requestNumber--;
      let requestData;
      if (random(0, 1) == 0) {
        data.sort(() => 0.5 - Math.random());
        requestData = data[0];
      } else {
        requestData = data[data.length - 1];
      }
      request(requestData, title);
    });
    for (let i = 0; i < requestNumber; i++)
      request(randomTopics[i], randomTopics[i]);
  }, []);
  const sortByRatingOrNot = (items) => {
    if (random(0, 1) == 0) {
      items.sort(() => 0.5 - Math.random());
    } else {
      items.sort((next, curr) => {
        return curr.rating - next.rating;
      });
    }
  };
  const filterBooksThatNotBelongsToFavorites = (items) => {
    let mass = JSON.parse(localStorage.getItem("favoriteBooks"));
    return items.filter((elem) => {
      for (let i = 0; i < mass.length; i++) {
        if (compare(mass[i], elem)) return false;
      }
      return true;
    });
  };
  const request = async (mass, title) => {
    let results = [];
    try {
      let response = await fetcher(mass);
      let { items } = await response.json();
      if (items) results=items;
    } catch (error) {
      console.log(error);
    } finally {
      results = results.map((elem) => formater(elem));
      results = filterBooksThatNotBelongsToFavorites(results);
      sortByRatingOrNot(results);
      setData((curr) => [
        ...curr,
        { title: title, elements: results.slice(0, 6) },
      ]);
    }
  };
  const getBookField = (key) => {
    const mass = JSON.parse(localStorage.getItem("favoriteBooks"));
    const result = [];
    mass.forEach((elem) => {
      if (elem[key] != "Unknown") result.push(elem[key]);
    });
    return result;
  };
  return data.map(({ title, elements }) => (
    <>
      <p className="title">{title}</p>
      <p className="main__line" />
      <div className="grid">
        {elements.map((elem) => (
          <BookCard data={elem} mode="normal" key={elem.key}/>
        ))}
      </div>
    </>
  ));
};
export default OfferBooks;
