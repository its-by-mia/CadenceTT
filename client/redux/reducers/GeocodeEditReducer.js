// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  geocode: {}
};

// Reducer
export default function GeocodeEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    case types.FINDBYR_MEMBERS_COLLECTIVE_SUCCESS:
      return { ...state, listCollective: action.payload };
    case types.FINDBYR_OWNER_COLLECTIVE_SUCCESS:
      return { ...state, listCollective: action.payload };
    case types.DELETE_USER_SUCCESS:
      return { ...state, user: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    case types.CREATE_GEOCODE_SUCCESS:
      return { ...state, geocode: action.payload };
    case types.GET_GEOCODE_SUCCESS:
      return { ...state, geocode: action.payload };
    case types.UPDATE_GEOCODE_SUCCESS:
      return { ...state, geocode: action.payload };
     // END REDUCERS
    
    case types.RESET_GEOCODE:
      state = initialState;
      return state;
    default:
      return state;
  }
}