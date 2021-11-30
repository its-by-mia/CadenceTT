import FilesystemApiGenerated from "./generated/FilesystemApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class FilesystemApi extends FilesystemApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Filesystem List
  static getFilesystemList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/filesystems")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default FilesystemApi;