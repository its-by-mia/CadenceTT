import TreedataApiGenerated from "./generated/TreedataApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class TreedataApi extends TreedataApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Treedata List
  static getTreedataList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/treedatas")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default TreedataApi;