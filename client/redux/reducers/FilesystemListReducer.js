// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function FilesystemListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.LIST_FILESYSTEM_SUCCESS:
      return { ...state, listFilesystem: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}