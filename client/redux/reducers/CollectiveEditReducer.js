// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  collective: {}
};

// Reducer
export default function CollectiveEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_COLLECTIVE_SUCCESS:
      return { ...state, collective: action.payload };
    case types.UPDATE_COLLECTIVE_SUCCESS:
      return { ...state, collective: action.payload };
    case types.GET_COLLECTIVE_SUCCESS:
      return { ...state, collective: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    case types.FINDBYR_COLLECTIVE_STAKEHOLDER_SUCCESS:
      return { ...state, listStakeholder: action.payload };
     // END REDUCERS
    
    case types.RESET_COLLECTIVE:
      state = initialState;
      return state;
    default:
      return state;
  }
}