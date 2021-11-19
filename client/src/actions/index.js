import axios from 'axios';
import {GET_ALL, GET_ALL_BY_TITLE, GET_TYPES} from"./constants";

export function getAll() {
      return async function(dispatch) {
      let apiCall = await axios.get("http://localhost:3001/recipes");
      let apiInfo = apiCall.data;
      return dispatch({type: GET_ALL, payload: apiInfo})
    }
  }
  export function getAllByTitle(title) {
    return async function(dispatch) {
    let apiCall = await axios.get(`http://localhost:3001/recipes?title=${title}`);
    let apiInfo = apiCall.data;
    return dispatch({type: GET_ALL_BY_TITLE, payload: apiInfo})
  }
}
export function getTypes() {
  return async function(dispatch) {
  let apiCall = await axios.get(`http://localhost:3001/types`);
  let apiInfo = apiCall.data;
  return dispatch({type: GET_TYPES, payload: apiInfo})
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