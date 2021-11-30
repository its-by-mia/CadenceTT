import FilesystemModelGenerated from "./generated/FilesystemModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await FilesystemModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...FilesystemModelGenerated,
  ...customModel
};
