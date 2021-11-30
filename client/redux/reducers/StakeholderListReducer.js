// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function StakeholderListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_STAKEHOLDER_SUCCESS:
      return { ...state, stakeholder: action.payload };
    case types.LIST_STAKEHOLDER_SUCCESS:
      return { ...state, listStakeholder: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}