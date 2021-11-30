// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  filesystem: {}
};

// Reducer
export default function FilesystemEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_FILESYSTEM_SUCCESS:
      return { ...state, filesystem: action.payload };
    case types.UPDATE_FILESYSTEM_SUCCESS:
      return { ...state, filesystem: action.payload };
    case types.GET_FILESYSTEM_SUCCESS:
      return { ...state, filesystem: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    case types.FINDBYS_LASTCHILD_TREEDATA_SUCCESS:
      return { ...state, listTreedata: action.payload };
    case types.FINDBYS_PARENT_TREEDATA_SUCCESS:
      return { ...state, listTreedata: action.payload };
    case types.FINDBYR_AVATAR_STAKEHOLDER_SUCCESS:
      return { ...state, listStakeholder: action.payload };
     // END REDUCERS
    
    case types.RESET_FILESYSTEM:
      state = initialState;
      return state;
    default:
      return state;
  }
}