// GET /models (paduos visus modelius - auto kaina be PVM);
// POST /models (leis įrašyti naują modelį);
// GET /modelscount (grąžins visus modelius ir kiek automobilių turi šie modeliai);
// GET /vehicles (paduos visus automobilius, kur model_id taps model name ir hour_price [su join padaryti]). Čia, automobilių kaina grąžinama su PVM.
// POST /vehicles (įrašyti naują automobilį);
// GET /vehicles/lt (paduos visus automobilius, kurie yra Lietuvoje; identiškas duomenų formatas kaip /vehicles);
// GET /vehicles/lv (paduos visus automobilius, kurie yra Latvijoje; identiškas duomenų formatas kaip /vehicles);
// GET /vehicles/ee (paduos visus automobilius, kurie yra Estijoje; identiškas duomenų formatas kaip /vehicles);
// Paskutiniai GET'ai - dinaminiai URL ;)

// importing npm modules using ES6
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

//importing all controllers
import {
  getAllModels,
  postNewModel,
  postNewVehicle,
  getAllModelsCount,
  getAllVehicles,
  getVehiclesByCountry,
} from "./controllers/routesControllers.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to mongoDB");
    //Starting server
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));

//! GET
app.get("/", (req, res) => res.json(`API is running!...`));
app.get("/models", getAllModels);
app.get("/modelscount", getAllModelsCount);
app.get("/vehicles", getAllVehicles);
app.get("/vehicles/:country", getVehiclesByCountry);

//! POST
app.post("/vehicles", postNewVehicle);
app.post("/models", postNewModel);
