import StakeholderModelGenerated from "./generated/StakeholderModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await StakeholderModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...StakeholderModelGenerated,
  ...customModel
};
