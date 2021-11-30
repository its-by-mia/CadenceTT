import CollectiveModelGenerated from "./generated/CollectiveModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await CollectiveModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...CollectiveModelGenerated,
  ...customModel
};
