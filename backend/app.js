// POST /models (leis įrašyti naują modelį);
// GET /modelscount (grąžins visus modelius ir kiek automobilių turi šie modeliai);
// GET /vehicles (paduos visus automobilius, kur model_id taps model name ir hour_price [su join padaryti]). Čia, automobilių kaina grąžinama su PVM.
// POST /vehicles (įrašyti naują automobilį);
// GET /vehicles/lt (paduos visus automobilius, kurie yra Lietuvoje; identiškas duomenų formatas kaip /vehicles);
// GET /vehicles/lv (paduos visus automobilius, kurie yra Latvijoje; identiškas duomenų formatas kaip /vehicles);
// GET /vehicles/ee (paduos visus automobilius, kurie yra Estijoje; identiškas duomenų formatas kaip /vehicles);
// Paskutiniai GET'ai - dinaminiai URL ;)

// importing npm modules with ES6
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());
