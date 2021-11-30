// Import Sequelize
import Sequelize from "sequelize";
import Database from "../classes/Database_CadenceRT_db";

export default init => {
  let sequelize = Database.getConnection();


    /**
      * ------------------------------------
      * Start define generated schema
      *
      * The content of this section will be overwritten on each documentation, 
      * please insert your customization at the top or at the end of the file.
      * ------------------------------------
      */



    /**
      * ------------------------------------
      * Collective
      * ------------------------------------
      */
    class Collective extends Sequelize.Model{}
    Collective.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      _created: {
        type: Sequelize.DATE, 
        allowNull: false
      },
      
      _expiration: {
        type: Sequelize.DATE
      },
      
      _modified: {
        type: Sequelize.DATE, 
        allowNull: false
      },
      
      class: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      description: {
        type: Sequelize.STRING
      },
      
      handle: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      locked: {
        type: Sequelize.BOOLEAN, 
        allowNull: false
      },
      
      metadata: {
        type: Sequelize.STRING
      },
      
      status: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      subclass: {
        type: Sequelize.STRING
      },
      
      token: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
        
        
      r_owner:  {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: '_id',
        },
      },
      
      
      //EXTERNAL RELATIONS
      /*
      r_collective: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: Stakeholder,
          key: '_id',
        }
      },
      */
    },
      { sequelize, tableName: "collective", timestamps: false }
    );



    /**
      * ------------------------------------
      * Filesystem
      * ------------------------------------
      */
    class Filesystem extends Sequelize.Model{}
    Filesystem.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      _created: {
        type: Sequelize.DATE, 
        allowNull: false
      },
      
      _modified: {
        type: Sequelize.DATE
      },
      
      _status: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      basepath: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      blob: {
        type: Sequelize.FLOAT
      },
      
      filename: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      filesize: {
        type: Sequelize.FLOAT
      },
      
      locked: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      mime: {
        type: Sequelize.FLOAT
      },
      
      permission: {
        type: Sequelize.INTEGER, 
        allowNull: false
      },
      
      r_user: {
        type: Sequelize.FLOAT
      },
      
      //RELATIONS
        
        
      r_owner:  {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: '_id',
        },
      },
        
        
      
      
      //EXTERNAL RELATIONS
      /*
      r_avatar: {
        type: Sequelize.INTEGER,
        references: {
          model: Stakeholder,
          key: '_id',
        }
      },
      s_lastchild: {
        type: Sequelize.INTEGER,
        references: {
          model: Treedata,
          key: '_id',
        }
      },
      s_parent: {
        type: Sequelize.INTEGER,
        references: {
          model: Treedata,
          key: '_id',
        }
      },
      */
    },
      { sequelize, tableName: "filesystem", timestamps: false }
    );



    /**
      * ------------------------------------
      * Geocode
      * ------------------------------------
      */
    class Geocode extends Sequelize.Model{}
    Geocode.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      _created: {
        type: Sequelize.DATE, 
        allowNull: false
      },
      
      class: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      o: {
        type: Sequelize.DECIMAL
      },
      
      series: {
        type: Sequelize.BOOLEAN, 
        allowNull: false
      },
      
      x: {
        type: Sequelize.DECIMAL, 
        allowNull: false
      },
      
      xy: {
        type: Sequelize.DECIMAL
      },
      
      y: {
        type: Sequelize.DECIMAL, 
        allowNull: false
      },
      
      //RELATIONS
        
      r_owner:  {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: "User",
          key: '_id',
        },
      },
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "geocode", timestamps: false }
    );



    /**
      * ------------------------------------
      * Stakeholder
      * ------------------------------------
      */
    class Stakeholder extends Sequelize.Model{}
    Stakeholder.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      _created: {
        type: Sequelize.DATE, 
        allowNull: false
      },
      
      _expiration: {
        type: Sequelize.DATE
      },
      
      _modified: {
        type: Sequelize.DATE
      },
      
      description: {
        type: Sequelize.STRING
      },
      
      handle: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      status: {
        type: Sequelize.FLOAT, 
        allowNull: false
      },
      
      //RELATIONS
        
      r_avatar:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Filesystem",
          key: '_id',
        },
      },
        
        
      r_owner:  {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: "User",
          key: '_id',
        },
      },
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "stakeholder", timestamps: false }
    );



    /**
      * ------------------------------------
      * Treedata
      * ------------------------------------
      */
    class Treedata extends Sequelize.Model{}
    Treedata.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      _created: {
        type: Sequelize.DATE
      },
      
      _modified: {
        type: Sequelize.DATE
      },
      
      class: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      description: {
        type: Sequelize.STRING
      },
      
      handle: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      metadata: {
        type: Sequelize.STRING
      },
      
      orphan: {
        type: Sequelize.BOOLEAN
      },
      
      ref_inlaw: {
        type: Sequelize.STRING
      },
      
      ref_last: {
        type: Sequelize.STRING
      },
      
      ref_parent: {
        type: Sequelize.STRING
      },
      
      ref_twin: {
        type: Sequelize.STRING
      },
      
      status: {
        type: Sequelize.BOOLEAN
      },
      
      //RELATIONS
        
      s_lastchild:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Filesystem",
          key: '_id',
        },
      },
        
      s_parent:  {
        type: Sequelize.INTEGER,
        references: {
          model: "Filesystem",
          key: '_id',
        },
      },
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "treedata", timestamps: false }
    );



    /**
      * ------------------------------------
      * User
      * ------------------------------------
      */
    class User extends Sequelize.Model{}
    User.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      _created: {
        type: Sequelize.DATE
      },
      
      _expires: {
        type: Sequelize.DATE
      },
      
      _lastactive: {
        type: Sequelize.DATE
      },
      
      address_1: {
        type: Sequelize.STRING
      },
      
      address_2: {
        type: Sequelize.STRING
      },
      
      address_3: {
        type: Sequelize.STRING
      },
      
      address_city: {
        type: Sequelize.STRING
      },
      
      address_country: {
        type: Sequelize.STRING
      },
      
      address_postalcode: {
        type: Sequelize.STRING
      },
      
      avatar: {
        type: Sequelize.INTEGER
      },
      
      id_number: {
        type: Sequelize.STRING
      },
      
      locale: {
        type: Sequelize.STRING
      },
      
      mail_primary: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      msisdn: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      name_first: {
        type: Sequelize.STRING
      },
      
      name_last: {
        type: Sequelize.STRING
      },
      
      name_title: {
        type: Sequelize.STRING
      },
      
      nationality: {
        type: Sequelize.STRING
      },
      
      opt_ins: {
        type: Sequelize.STRING
      },
      
      opt_outs: {
        type: Sequelize.STRING
      },
      
      password: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      r_group: {
        type: Sequelize.INTEGER
      },
      
      r_parent: {
        type: Sequelize.INTEGER
      },
      
      r_policy: {
        type: Sequelize.INTEGER
      },
      
      r_role: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      status: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      super_class: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      tax_number: {
        type: Sequelize.STRING
      },
      
      username: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      //RELATIONS
        
        
        
        
        
      
      
      //EXTERNAL RELATIONS
      /*
      r_members: {
        type: Sequelize.INTEGER,
        references: {
          model: Collective,
          key: '_id',
        }
      },
      r_owner: {
        type: Sequelize.INTEGER,
        references: {
          model: Filesystem,
          key: '_id',
        }
      },
      r_owner: {
        type: Sequelize.INTEGER,
        references: {
          model: Collective,
          key: '_id',
        }
      },
      r_owner: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: Geocode,
          key: '_id',
        }
      },
      r_owner: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: Stakeholder,
          key: '_id',
        }
      },
      */
    },
      { sequelize, tableName: "user", timestamps: false }
    );


    /**
      * ------------------------------------
      * Relations many to many
      * ------------------------------------
      */

    
    Collective.belongsToMany(User, {
        through: "Collective_r_members",
        as: "r_members",
        foreignKey: "id_Collective",
        otherKey: "id_User",
        timestamps: false
    });

    
    
    
    Stakeholder.belongsToMany(Collective, {
        through: "Stakeholder_r_collective",
        as: "r_collective",
        foreignKey: "id_Stakeholder",
        otherKey: "id_Collective",
        timestamps: false
    });

    
    
  /**
   * ------------------------------------
   * End define generated schema
      * ------------------------------------
      */

    /**
      * ------------------------------------
      * Roles
      * ------------------------------------
      */
    class Roles extends Sequelize.Model{}
    Roles.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      role: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      _user:  {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: '_id',
        },
      }
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "roles", timestamps: false }
    );

    User.hasMany(Roles, {
      foreignKey: "_user"
    });

    /**
      * ------------------------------------
      * Insert here your custom models
      * ------------------------------------
      */

};
