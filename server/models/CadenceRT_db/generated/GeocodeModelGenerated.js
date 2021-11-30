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
 *  TO CUSTOMIZE GeocodeModelGenerated.js PLEASE EDIT ../GeocodeModel.js
 * 
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 * 
 */
// Database
import Database from "../../../classes/Database_CadenceRT_db";
import Sequelize from "sequelize";

// Logger
import Logger from "../../../classes/Logger";

const generatedModel = {

  // Start queries
    

  // CRUD METHODS


  /**
  * GeocodeModel.create
  *   @description create point set
  *   @param String class
  *
  */
  async create(item) {
    let result = await Database.getConnection().models.Geocode.create(item);    return result;
  },
  
  /**
  * GeocodeModel.delete
  *   @description CRUD ACTION delete
  *   @param String id Id
  *
  */
  async delete(id) {
    return await Database.getConnection().models.Geocode.destroy({ where: { _id: id } });
  },
  
  /**
  * GeocodeModel.findByclass
  *   @description CRUD ACTION findByclass
  *   @param Objectid key Id of the resource class to search
  *
  */
  async findByclass(key) {
    return await Database.getConnection().models.Geocode.findAll({ where: { "class": key } });
  },
  
  /**
  * GeocodeModel.findByr_owner
  *   @description Search by findByr_owner
  *   @param String key Id of the resource r_owner to search
  *
  */
  async findByr_owner(key) {
    return await Database.getConnection().models.Geocode.findAll({ where: { "r_owner": key } });
  },
  
  /**
  * GeocodeModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id resource
  *
  */
  async get(id) {
    let result = await Database.getConnection().models.Geocode.findByPk(id);
    return result;
  },
  
  /**
  * GeocodeModel.list
  *   @description CRUD ACTION list
  *   @param String class
  *
  */
  async list() { 
    return await Database.getConnection().models.Geocode.findAll();
      },
  
  /**
  * GeocodeModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  async update(item) { 
    let result = await Database.getConnection().models.Geocode.update(item, {
      where: { _id: item._id }
    });
    return result;
  },
  


};

export default generatedModel;
