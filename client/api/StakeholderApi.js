import StakeholderApiGenerated from "./generated/StakeholderApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class StakeholderApi extends StakeholderApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Stakeholder List
  static getStakeholderList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/stakeholders")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default StakeholderApi;