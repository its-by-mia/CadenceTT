// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
};

// Reducer
export default function Show MapReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.FINDBYCLASS_GEOCODE_SUCCESS:
      return { ...state, listGeocode: action.payload };
    case types.FINDBYR_OWNER_GEOCODE_SUCCESS:
      return { ...state, listGeocode: action.payload };
    case types.LIST_GEOCODE_SUCCESS:
      return { ...state, listGeocode: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    case types.FINDBYR_MEMBERS_COLLECTIVE_SUCCESS:
      return { ...state, listCollective: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}