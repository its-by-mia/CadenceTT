import TreedataModelGenerated from "./generated/TreedataModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await TreedataModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...TreedataModelGenerated,
  ...customModel
};
