import actionsFunction from "./generated/FilesystemActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import FilesystemApi from "../../api/FilesystemApi";
 
 actionsFunction.loadFilesystemList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return FilesystemApi
     .getFilesystemList()
     .then(list => {
       dispatch(actionsFunction.loadFilesystemSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
