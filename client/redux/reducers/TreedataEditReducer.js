// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  treedata: {}
};

// Reducer
export default function TreedataEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_TREEDATA_SUCCESS:
      return { ...state, treedata: action.payload };
    case types.UPDATE_TREEDATA_SUCCESS:
      return { ...state, treedata: action.payload };
    case types.GET_TREEDATA_SUCCESS:
      return { ...state, treedata: action.payload };
    case types.LIST_FILESYSTEM_SUCCESS:
      return { ...state, listFilesystem: action.payload };
    case types.LIST_FILESYSTEM_SUCCESS:
      return { ...state, listFilesystem: action.payload };
     // END REDUCERS
    
    case types.RESET_TREEDATA:
      state = initialState;
      return state;
    default:
      return state;
  }
}