// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
};

// Reducer
export default function Advanced AdminReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.LIST_COLLECTIVE_SUCCESS:
      return { ...state, listCollective: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}