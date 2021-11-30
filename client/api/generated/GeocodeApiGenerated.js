/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  TO CUSTOMIZE APIS IN GeocodeApiGenerated.js PLEASE EDIT ../GeocodeApi.js
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 
// Dependencies
import axios from "axios";
import { properties } from "../../config/properties";

class GeocodeApiGenerated {

  static contextUrl = properties.endpoint + "/my/geocode";

  // CRUD METHODS

  /**
  * GeocodeService.create
  *   @description create point set
  *   @param String class
  *
  */
  static createGeocode(geocode) {
    return axios.post(GeocodeApiGenerated.contextUrl, geocode )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * GeocodeService.delete
  *   @description CRUD ACTION delete
  *   @param String id Id
  *
  */
  static deleteGeocode(id) {
    return axios.delete(GeocodeApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * GeocodeService.findByclass
  *   @description CRUD ACTION findByclass
  *   @param Objectid key Id of the resource class to search
  *
  */
  static findByclass(id) {
    return axios.get(GeocodeApiGenerated.contextUrl + "/findByclass/" + id )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * GeocodeService.findByr_owner
  *   @description Search by findByr_owner
  *   @param String key Id of the resource r_owner to search
  *
  */
  static findByr_owner(id) {
    return axios.get(GeocodeApiGenerated.contextUrl + "/findByr_owner/" + id )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * GeocodeService.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id resource
  *
  */
  static getOneGeocode(id) {
    return axios.get(GeocodeApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * GeocodeService.list
  *   @description CRUD ACTION list
  *   @param String class
  *
  */
  static getGeocodeList() {
    return axios.get(GeocodeApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * GeocodeService.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  static saveGeocode(geocode) {
    return axios.post(GeocodeApiGenerated.contextUrl + "/" + geocode._id, geocode )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }



    // Custom APIs
}

export default GeocodeApiGenerated;
