import actionsFunction from "./generated/StakeholderActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import StakeholderApi from "../../api/StakeholderApi";
 
 actionsFunction.loadStakeholderList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return StakeholderApi
     .getStakeholderList()
     .then(list => {
       dispatch(actionsFunction.loadStakeholderSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
