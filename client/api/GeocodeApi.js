import GeocodeApiGenerated from "./generated/GeocodeApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class GeocodeApi extends GeocodeApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Geocode List
  static getGeocodeList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/geocodes")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default GeocodeApi;