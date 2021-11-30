import GeocodeModelGenerated from "./generated/GeocodeModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await GeocodeModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...GeocodeModelGenerated,
  ...customModel
};
