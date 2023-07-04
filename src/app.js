import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import Joi from "joi";

// Server Create
const app = express();

// Server config
app.use(cors());
app.use(express.json());
dotenv.config();

//DataBase config

// const mongoClient = new MongoClient(process.env.DATABASE_URL);

// try {
//   await mongoClient.connect(); // top level await
//   console.log("MongoDB conectado!");
// } catch (err) {
//   (err) => console.log(err.message);
// }

// const db = mongoClient.db();

// Server Listener

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
