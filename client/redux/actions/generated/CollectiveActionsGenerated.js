/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  TO CUSTOMIZE FUNCTIONS IN CollectiveActionsGenerated.js PLEASE EDIT ../CollectiveActions.js
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */

import * as types from "../../actionTypes";
import CollectiveApi from "../../../api/CollectiveApi";

let actionsFunction = {
  
  // Reset reducer
  reset: function() {
    return { type: types.RESET_COLLECTIVE };
  },

  //CRUD METHODS

  // Create collective
  createCollective: function(collective) {
    return function(dispatch) {
      return CollectiveApi
        .createCollective(collective)
        .then(collective => {
          dispatch(actionsFunction.createCollectiveSuccess(collective));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  createCollectiveSuccess: function(collective) {
    return { type: types.CREATE_COLLECTIVE_SUCCESS, payload: collective };
  },


  // Delete collective
  deleteCollective: function(id) {
    return function(dispatch) {
      return CollectiveApi
        .deleteCollective(id)
        .then(collective => {
          dispatch(actionsFunction.deleteCollectiveSuccess(collective));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  deleteCollectiveSuccess: function(collective) {
    return { type: types.DELETE_COLLECTIVE_SUCCESS, payload: collective };
  },


  // Find by r_members
  findByr_members: function(key) {
    return function(dispatch) {
      return CollectiveApi
        .findByr_members(key)
        .then(item => {
          dispatch(actionsFunction.findByr_membersSuccess(item));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  findByr_membersSuccess: function(item) {
    return { type: types.FINDBYR_MEMBERS_COLLECTIVE_SUCCESS, payload: item };
  },


  // Find by r_owner
  findByr_owner: function(key) {
    return function(dispatch) {
      return CollectiveApi
        .findByr_owner(key)
        .then(item => {
          dispatch(actionsFunction.findByr_ownerSuccess(item));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  findByr_ownerSuccess: function(item) {
    return { type: types.FINDBYR_OWNER_COLLECTIVE_SUCCESS, payload: item };
  },


  // Get collective
  loadCollective: function(id) {
    return function(dispatch) {
      return CollectiveApi
        .getOneCollective(id)
        .then(collective => {
          dispatch(actionsFunction.loadCollectiveSuccess(collective));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  loadCollectiveSuccess: function(collective) {
    return { type: types.GET_COLLECTIVE_SUCCESS, payload: collective };
  },

  // Load  list
  loadCollectiveList: function() {
    return function(dispatch) {
      return CollectiveApi
        .getCollectiveList()
        .then(list => {
          dispatch(actionsFunction.loadCollectiveListSuccess(list));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  loadCollectiveListSuccess: function(list) {
    return { type: types.LIST_COLLECTIVE_SUCCESS, payload: list };
  },

	
  // Save collective
  saveCollective: function(collective) {
    return function(dispatch) {
      return CollectiveApi
        .saveCollective(collective)
        .then(collective => {
          dispatch(actionsFunction.saveCollectiveSuccess(collective));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  saveCollectiveSuccess: function(collective) {
    return { type: types.UPDATE_COLLECTIVE_SUCCESS, payload: collective };
  },


};

export default actionsFunction;