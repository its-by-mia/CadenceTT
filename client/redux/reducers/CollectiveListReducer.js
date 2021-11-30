// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function CollectiveListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_COLLECTIVE_SUCCESS:
      return { ...state, collective: action.payload };
    case types.LIST_COLLECTIVE_SUCCESS:
      return { ...state, listCollective: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}