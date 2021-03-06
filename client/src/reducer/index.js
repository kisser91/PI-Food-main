import {GET_ALL, GET_ALL_BY_TITLE, GET_SORTED, GET_BY_ID, GET_TYPES,POST_RECIPE} from"../actions/constants.js";

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeById: [],
    dietTypes: [],
};

  function rootReducer(state = initialState, action) {
    switch(action.type) {
      case GET_ALL: return {
        ...state,
        allRecipes: action.payload
      };
      case GET_ALL_BY_TITLE: return {
        ...state,
        allRecipes: action.payload
      };
      case GET_TYPES: return {
        ...state,
        dietTypes: action.payload
      };
      case GET_BY_ID : return {
        ...state,
        recipeById: action.payload
      };
      case POST_RECIPE : return {
        ...state,
      };

      case GET_SORTED: 
      
      function sorter(payload) {
        let sortedRecipes= [];
        //case of diets order ---- show all the recipes as default
        if (payload.diets !== "All") {sortedRecipes = state.allRecipes.filter(e => {
          return e.diets.reduce((a,el) => {
           return !!(a || el.includes(payload.diets.toLowerCase()));
          }, false)
        })}
        else {
          sortedRecipes = state.allRecipes;
        }
         //case of order type Score or Alphabetical with a condicional returning, making two sorts in one (increasing or decreasing)
         if (payload.type === "Score") { 
           sortedRecipes = sortedRecipes.sort((a, b) => {
          if (a.points > b.points) {
           return payload.order === "Increasing" ? 1 : -1
          }
          if (a.points < b.points) {
            return payload.order === "Increasing" ? -1 : 1
           }
        return 0
        })} else {
          sortedRecipes = sortedRecipes.sort((a, b) => {
            if(a.title > b.title) {
              return payload.order === "Increasing" ? 1 : -1
             }
            if(a.title < b.title)  {
              return payload.order === "Increasing" ? -1 : 1
             }
          return 0;
          })
        }
        return sortedRecipes;
    }
          return {
        ...state,
        recipes: sorter(action.payload)
      };

    
       /*  case 'GET_POST': return {
          ...state,
          loading: true
        }  */
        
        default: return state;
    }
  }

  export default rootReducer;