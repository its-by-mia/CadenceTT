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
 *  TO CUSTOMIZE APIS IN StakeholderApiGenerated.js PLEASE EDIT ../StakeholderApi.js
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 
// Dependencies
import axios from "axios";
import { properties } from "../../config/properties";

class StakeholderApiGenerated {

  static contextUrl = properties.endpoint + "/my/bidmanagement";

  // CRUD METHODS

  /**
  * StakeholderService.create
  *   @description CRUD ACTION create
  *
  */
  static createStakeholder(stakeholder) {
    return axios.post(StakeholderApiGenerated.contextUrl, stakeholder )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * StakeholderService.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
  static deleteStakeholder(id) {
    return axios.delete(StakeholderApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * StakeholderService.findByr_avatar
  *   @description CRUD ACTION findByr_avatar
  *   @param Objectid key Id of model to search for
  *
  */
  static findByr_avatar(id) {
    return axios.get(StakeholderApiGenerated.contextUrl + "/findByr_avatar/" + id )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * StakeholderService.findByr_collective
  *   @description CRUD ACTION findByr_collective
  *   @param Objectid key Id of model to search for
  *
  */
  static findByr_collective(id) {
    return axios.get(StakeholderApiGenerated.contextUrl + "/findByr_collective/" + id )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * StakeholderService.findByr_owner
  *   @description CRUD ACTION findByr_owner
  *   @param Objectid key Id of model to search for
  *
  */
  static findByr_owner(id) {
    return axios.get(StakeholderApiGenerated.contextUrl + "/findByr_owner/" + id )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * StakeholderService.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id resource
  *
  */
  static getOneStakeholder(id) {
    return axios.get(StakeholderApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * StakeholderService.list
  *   @description CRUD ACTION list
  *
  */
  static getStakeholderList() {
    return axios.get(StakeholderApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * StakeholderService.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  static saveStakeholder(stakeholder) {
    return axios.post(StakeholderApiGenerated.contextUrl + "/" + stakeholder._id, stakeholder )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }



    // Custom APIs
}

export default StakeholderApiGenerated;
