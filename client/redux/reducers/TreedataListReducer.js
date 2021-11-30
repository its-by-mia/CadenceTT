// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function TreedataListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_TREEDATA_SUCCESS:
      return { ...state, treedata: action.payload };
    case types.LIST_TREEDATA_SUCCESS:
      return { ...state, listTreedata: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}