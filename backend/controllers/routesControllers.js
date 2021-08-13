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
    // //* There are at least 2 ways of making ModelsCount route possible.
    // //* 1: Two calls to DB needed, all other operations executed using the server
    // //1.1: creating empty arrays for storing information from DB
    // let allModels = [];
    // let allVehicles = [];

    // //1.2: getting info form DB and pushing it to empty arrays
    // await Model.find()
    //   .then((result) => allModels.push(...result))
    //   .catch((err) => console.log(err));
    // await Vehicle.find()
    //   .then((result) => allVehicles.push(...result))
    //   .catch((err) => console.log(err));

    // //1.2: creating new array with count key, which will be sent as a server response (same data as in model, but cleared from mongodb meta data)
    // const newAllModelsCount = allModels.map((model) => ({
    //   _id: model._id,
    //   name: model.name,
    //   hour_price: model.hour_price,
    //   //Filter searches for the same model vehicles and .length counts them
    //   count: allVehicles.filter(
    //     (item) => item.model_id.toString() == model._id.toString()
    //   ).length,
    //   createdAt: model.createdAt,
    //   updatedAt: model.updatedAt,
    // }));

    // //1.3: sending response
    // res.json(newAllModelsCount);

    //* 2: Only 1 call to DB needed

    Model.aggregate([
      {
        $lookup: {
          from: "vehicles", //The collection you're getting the items from
          localField: "_id", //The local field you're using to lookup
          foreignField: "model_id", //The field the `A` document you're using to match
          as: "count", //The name of the field that will be populated with the results
        },
      },
      {
        $project: {
          // Take needed fields
          name: 1,
          hour_price: 1,
          count: { $size: "$count" }, // Counts fields
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ])
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

const getAllVehicles = (req, res) => {
  try {
    // Since I wanted to implement INNER JOIN functionality of MySQL, but in mongoDB, I used this "complex" code
    // I think I could leave jus $lookup and $project functionality, but I jus wanted the output to be well structured (without embedding)
    Vehicle.aggregate([
      {
        $lookup: {
          from: "models", //The collection you're getting the items from
          localField: "model_id", //The local field you're using to lookup
          foreignField: "_id", //The field the `A` document you're using to match
          as: "model_details", //The name of the field that will be populated with the results
        },
      },
      {
        $addFields: {
          model_name: "$model_details.name",
          hour_price: "$model_details.hour_price",
        },
      },
      {
        $unwind: "$hour_price",
      },
      {
        $unwind: "$model_name",
      },
      {
        $project: {
          model_name: 1,
          hour_price: { $round: [{ $multiply: ["$hour_price", 1.21] }, 2] },
          number_plate: 1,
          country_location: 1,
          // createdAt: 1,
          // updatedAt: 1,
        },
      },
    ])
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

const getVehiclesByCountry = (req, res) => {
  try {
    const countryCode = req.params.country;
    Vehicle.aggregate([
      { $match: { country_location: countryCode.toUpperCase() } },
    ])
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

//! POST
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
//Exporting functions for use in app.js
export {
  getAllModels,
  postNewModel,
  postNewVehicle,
  getAllModelsCount,
  getAllVehicles,
  getVehiclesByCountry,
};
