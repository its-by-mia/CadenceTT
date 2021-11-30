// Import Sequelize
import Sequelize from "sequelize";
import InitSchema from "../models/schema_CadenceRT_db";
import UserModel from "../models/CadenceRT_db/UserModel";

// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info(
      "Database connected at: " +
        properties.CadenceRT_db.host +
        ":" +
        properties.CadenceRT_db.port +
        "//" +
        properties.CadenceRT_db.user +
        "@" +
        properties.CadenceRT_db.name
    );

    // Import schema
    InitSchema();

    await UserModel.createAdminUser();

  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");

    const sequelize = new Sequelize(
      properties.CadenceRT_db.name,
      properties.CadenceRT_db.user,
      properties.CadenceRT_db.password,
      {
        host: properties.CadenceRT_db.host,
        dialect: properties.CadenceRT_db.dialect,
        port: properties.CadenceRT_db.port,
        logging: false
      }
    );
    this.dbConnection_CadenceRT_db = sequelize;

    try {
      await sequelize.sync();
    } catch (err) {
      // Catch error here
      Logger.error(`Failed connection to the DB`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_CadenceRT_db;
  }
}

export default new Database();
