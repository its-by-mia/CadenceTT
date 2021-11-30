// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
};

// Reducer
export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_GEOCODE_SUCCESS:
      return { ...state, geocode: action.payload };
    case types.GET_GEOCODE_SUCCESS:
      return { ...state, geocode: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}