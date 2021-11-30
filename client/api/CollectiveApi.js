import CollectiveApiGenerated from "./generated/CollectiveApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class CollectiveApi extends CollectiveApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Collective List
  static getCollectiveList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/collectives")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default CollectiveApi;