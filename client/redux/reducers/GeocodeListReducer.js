// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function GeocodeListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.LIST_GEOCODE_SUCCESS:
      return { ...state, listGeocode: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}