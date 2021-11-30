import actionsFunction from "./generated/CollectiveActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import CollectiveApi from "../../api/CollectiveApi";
 
 actionsFunction.loadCollectiveList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return CollectiveApi
     .getCollectiveList()
     .then(list => {
       dispatch(actionsFunction.loadCollectiveSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
