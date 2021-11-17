import axios from "axios";
const {GET_ALL, GET_ALL_BY_NAME, GET_BY_ID, GET_TYPES,POST_RECIPE} = require("./constants");


export function getAll() {
    return async function(dispatch) {
      let apiCall = await axios.get("http://localhost:3001/recipes");
      let apiInfo = apiCall.data.results;
      return dispatch({type: GET_ALL, payload: apiInfo})
    }
  }

  /* export function getMovieDetail(id) {
    return function(dispatch) {
      dispatch(getPost());
     setTimeout(() => {
       return fetch("http://www.omdbapi.com/?apikey=1685eab0&i=" + id)
     .then(response => response.json())
     .then(json => {
       dispatch({ type: "GET_MOVIE_DETAIL", payload: json });
     })}
  , 1000) 
  }}
  export function addMovieFavorite(payload) {
    return { type: "ADD_MOVIE_FAVORITE", payload };
  }

  export function removeMovieFavorite(payload) {
    return { type: "REMOVE_MOVIE_FAVORITE", payload };
  }
  export function getPost() {
    return {
      type: 'GET_POST',
    }
  } */