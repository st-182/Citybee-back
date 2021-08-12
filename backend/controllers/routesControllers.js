// Import of modules (schemas)
import Model from "../models/modelsModel.js";
import Vehicle from "../models/vehiclesModel.js";

//! GET Routes
// returns all models without PVM
const getAllModels = (req, res) => {
  try {
    Model.find()
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

// -- single post page
const getAllModelsCount = async (req, res) => {
  try {
    //There are at least 2 ways of making ModelsCount route possible.
    //1: Only 2 calls to server needed and all operations are done using the server
    let allModels = [];
    let allVehicles = [];
    await Model.find()
      .then((result) => allModels.push(...result))
      .catch((err) => console.log(err));
    await Vehicle.find()
      .then((result) => allVehicles.push(...result))
      .catch((err) => console.log(err));

    // allModels.forEach((model) => {
    //   Object.assign(model, {
    //     count: allVehicles.filter(
    //       (item) => item.model_id.toString() == model._id.toString()
    //     ).length,
    //   });
    //   console.log(model);
    //   //allVehicles.filter((item) => item.model_id.toString() == model._id.toString()).length;
    // });

    const newAllModelsCount = allModels.map((model) => ({
      _id: model._id,
      name: model.name,
      hour_price: model.hour_price,
      count: allVehicles.filter(
        (item) => item.model_id.toString() == model._id.toString()
      ).length,
    }));
    res.json(newAllModelsCount);

    // await Vehicle.countDocuments({ model_id: "6114fd1542aef21804ff377c" })
    //   .then((result) => res.json(result))
    //   .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

const postNewModel = (req, res) => {
  try {
    const receivedModelFromFrontend = req.body;
    const newModel = new Model(receivedModelFromFrontend);
    newModel
      .save()
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

const postNewVehicle = (req, res) => {
  try {
    const receivedVehicleFromFrontend = req.body;
    const newVehicle = new Vehicle(receivedVehicleFromFrontend);
    newVehicle
      .save()
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};
export { getAllModels, postNewModel, postNewVehicle, getAllModelsCount };
