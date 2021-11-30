// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function User ClockinsReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_USER_SUCCESS:
      return { ...state, user: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    case types.FINDBYR_OWNER_GEOCODE_SUCCESS:
      return { ...state, listGeocode: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}