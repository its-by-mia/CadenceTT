import actionsFunction from "./generated/GeocodeActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import GeocodeApi from "../../api/GeocodeApi";
 
 actionsFunction.loadGeocodeList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return GeocodeApi
     .getGeocodeList()
     .then(list => {
       dispatch(actionsFunction.loadGeocodeSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
