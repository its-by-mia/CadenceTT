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
 *  TO CUSTOMIZE FUNCTIONS IN TreedataActionsGenerated.js PLEASE EDIT ../TreedataActions.js
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */

import * as types from "../../actionTypes";
import TreedataApi from "../../../api/TreedataApi";

let actionsFunction = {
  
  // Reset reducer
  reset: function() {
    return { type: types.RESET_TREEDATA };
  },

  //CRUD METHODS

  // Create treedata
  createTreedata: function(treedata) {
    return function(dispatch) {
      return TreedataApi
        .createTreedata(treedata)
        .then(treedata => {
          dispatch(actionsFunction.createTreedataSuccess(treedata));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  createTreedataSuccess: function(treedata) {
    return { type: types.CREATE_TREEDATA_SUCCESS, payload: treedata };
  },


  // Delete treedata
  deleteTreedata: function(id) {
    return function(dispatch) {
      return TreedataApi
        .deleteTreedata(id)
        .then(treedata => {
          dispatch(actionsFunction.deleteTreedataSuccess(treedata));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  deleteTreedataSuccess: function(treedata) {
    return { type: types.DELETE_TREEDATA_SUCCESS, payload: treedata };
  },


  // Find by class
  findByclass: function(key) {
    return function(dispatch) {
      return TreedataApi
        .findByclass(key)
        .then(item => {
          dispatch(actionsFunction.findByclassSuccess(item));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  findByclassSuccess: function(item) {
    return { type: types.FINDBYCLASS_TREEDATA_SUCCESS, payload: item };
  },


  // Find by ref_inlaw
  findByref_inlaw: function(key) {
    return function(dispatch) {
      return TreedataApi
        .findByref_inlaw(key)
        .then(item => {
          dispatch(actionsFunction.findByref_inlawSuccess(item));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  findByref_inlawSuccess: function(item) {
    return { type: types.FINDBYREF_INLAW_TREEDATA_SUCCESS, payload: item };
  },


  // Find by s_lastchild
  findBys_lastchild: function(key) {
    return function(dispatch) {
      return TreedataApi
        .findBys_lastchild(key)
        .then(item => {
          dispatch(actionsFunction.findBys_lastchildSuccess(item));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  findBys_lastchildSuccess: function(item) {
    return { type: types.FINDBYS_LASTCHILD_TREEDATA_SUCCESS, payload: item };
  },


  // Find by s_parent
  findBys_parent: function(key) {
    return function(dispatch) {
      return TreedataApi
        .findBys_parent(key)
        .then(item => {
          dispatch(actionsFunction.findBys_parentSuccess(item));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  findBys_parentSuccess: function(item) {
    return { type: types.FINDBYS_PARENT_TREEDATA_SUCCESS, payload: item };
  },


  // Get treedata
  loadTreedata: function(id) {
    return function(dispatch) {
      return TreedataApi
        .getOneTreedata(id)
        .then(treedata => {
          dispatch(actionsFunction.loadTreedataSuccess(treedata));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  loadTreedataSuccess: function(treedata) {
    return { type: types.GET_TREEDATA_SUCCESS, payload: treedata };
  },

	
	// Get relation s_parent
  gets_parent: function(id) {
    return function(dispatch) {
      return TreedataApi
        .gets_parent(id)
        .then(item => {
          dispatch(actionsFunction.gets_parentSuccess(item));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  gets_parentSuccess: function(item) {
    return { type: types.GETS_PARENT_TREEDATA_SUCCESS, payload: item };
  },

  // Load  list
  loadTreedataList: function() {
    return function(dispatch) {
      return TreedataApi
        .getTreedataList()
        .then(list => {
          dispatch(actionsFunction.loadTreedataListSuccess(list));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  loadTreedataListSuccess: function(list) {
    return { type: types.LIST_TREEDATA_SUCCESS, payload: list };
  },

	
  // Save treedata
  saveTreedata: function(treedata) {
    return function(dispatch) {
      return TreedataApi
        .saveTreedata(treedata)
        .then(treedata => {
          dispatch(actionsFunction.saveTreedataSuccess(treedata));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  saveTreedataSuccess: function(treedata) {
    return { type: types.UPDATE_TREEDATA_SUCCESS, payload: treedata };
  },


  /*
  Name: bindMember_node
  Description: Add a new member to a tree node
  Params: 
    String class - Optional
  */
  bindMember_node: function(...params) {
    return function(dispatch) {
      return TreedataApi
        .bindMember_node(params)
        .then( result => {
          dispatch(actionsFunction.bindMember_nodeSuccess(result));
        })
        .catch(error => {
          throw error;
        });
    };
  },

  bindMember_nodeSuccess: function(result) {
    return { type: types.BINDMEMBER_NODE_TREEDATA_SUCCESS, payload: result };
  },
		
};

export default actionsFunction;
