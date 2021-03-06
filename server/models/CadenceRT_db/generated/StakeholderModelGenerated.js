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
 *  TO CUSTOMIZE StakeholderModelGenerated.js PLEASE EDIT ../StakeholderModel.js
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
  * StakeholderModel.create
  *   @description CRUD ACTION create
  *
  */
  async create(item) {
    let result = await Database.getConnection().models.Stakeholder.create(item);
    let r_collective = await result.setR_collective(item.r_collective);
    result.r_collective = r_collective;
        return result;
  },
  
  /**
  * StakeholderModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
  async delete(id) {
    return await Database.getConnection().models.Stakeholder.destroy({ where: { _id: id } });
  },
  
  /**
  * StakeholderModel.findByr_avatar
  *   @description CRUD ACTION findByr_avatar
  *   @param Objectid key Id of model to search for
  *
  */
  async findByr_avatar(key) {
    return await Database.getConnection().models.Stakeholder.findAll({ where: { "r_avatar": key } });
  },
  
  /**
  * StakeholderModel.findByr_collective
  *   @description CRUD ACTION findByr_collective
  *   @param Objectid key Id of model to search for
  *
  */
  async findByr_collective(key) {
    return await Database.getConnection().models.Stakeholder.findAll({ where: { "r_collective": key } });
  },
  
  /**
  * StakeholderModel.findByr_owner
  *   @description CRUD ACTION findByr_owner
  *   @param Objectid key Id of model to search for
  *
  */
  async findByr_owner(key) {
    return await Database.getConnection().models.Stakeholder.findAll({ where: { "r_owner": key } });
  },
  
  /**
  * StakeholderModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id resource
  *
  */
  async get(id) {
    let result = await Database.getConnection().models.Stakeholder.findByPk(id);
    let r_collective = await result.getR_collective({ raw: true });
    result.dataValues.r_collective = r_collective.map(item => item._id);
    
    return result;
  },
  
  /**
  * StakeholderModel.list
  *   @description CRUD ACTION list
  *
  */
  async list() { 
    return await Database.getConnection().models.Stakeholder.findAll();
      },
  
  /**
  * StakeholderModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  async update(item) { 
    let result = await Database.getConnection().models.Stakeholder.update(item, {
      where: { _id: item._id }
    });
    result = await Database.getConnection().models.Stakeholder.findByPk(item._id);
    let r_collective = await result.setR_collective(item.r_collective);
    result.r_collective = r_collective;
    
    return result;
  },
  


};

export default generatedModel;
