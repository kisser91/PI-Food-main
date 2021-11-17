const {GET_ALL, GET_ALL_BY_NAME, GET_BY_ID, GET_TYPES,POST_RECIPE} = require("../actions/constants.js");

const initialState = {
    Recepies: [],
    DietTypes: [],
    loading: false
  };
  
  function rootReducer(state = initialState, action) {
    switch(action.type) {
      case GET_ALL: return {
        ...state,
        Recepies: action.payload
      };
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