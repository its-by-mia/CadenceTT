import actionsFunction from "./generated/TreedataActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import TreedataApi from "../../api/TreedataApi";
 
 actionsFunction.loadTreedataList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return TreedataApi
     .getTreedataList()
     .then(list => {
       dispatch(actionsFunction.loadTreedataSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
