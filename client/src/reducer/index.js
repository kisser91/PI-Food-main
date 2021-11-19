import {GET_ALL, GET_ALL_BY_TITLE, GET_BY_ID, GET_TYPES,POST_RECIPE} from"../actions/constants.js";

const initialState = {
    recipes: [],
    dietTypes: [],
};
  
  function rootReducer(state = initialState, action) {
    switch(action.type) {
      case GET_ALL: return {
        ...state,
        recipes: action.payload
      };
      case GET_ALL_BY_TITLE: return {
        ...state,
        recipes: action.payload
      };
      case GET_TYPES: return {
        ...state,
        dietTypes: action.payload
      }
      /* case "ADD_MOVIE_FAVORITE": return {
          ...state,
          moviesFavourites: state.moviesFavourites.concat(action.payload)
        }
        case "GET_MOVIE_DETAIL" : return {
            ...state,
            movieDetail: action.payload,
            loading: false
          };
        case "REMOVE_MOVIE_FAVORITE" : return {
            ...state,
            moviesFavourites: state.moviesFavourites.filter(elemento => elemento.id !== action.payload)
          };
        case 'GET_POST': return {
          ...state,
          loading: true
        } */
        
        default: return state;
    }
  }
  
  export default rootReducer;