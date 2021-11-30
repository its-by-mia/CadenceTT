// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  stakeholder: {}
};

// Reducer
export default function StakeholderEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_STAKEHOLDER_SUCCESS:
      return { ...state, stakeholder: action.payload };
    case types.UPDATE_STAKEHOLDER_SUCCESS:
      return { ...state, stakeholder: action.payload };
    case types.GET_STAKEHOLDER_SUCCESS:
      return { ...state, stakeholder: action.payload };
    case types.LIST_FILESYSTEM_SUCCESS:
      return { ...state, listFilesystem: action.payload };
    case types.LIST_COLLECTIVE_SUCCESS:
      return { ...state, listCollective: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
     // END REDUCERS
    
    case types.RESET_STAKEHOLDER:
      state = initialState;
      return state;
    default:
      return state;
  }
}