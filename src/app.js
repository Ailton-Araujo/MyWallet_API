import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import Joi from "joi";
import { userInfo } from "os";

// Server Create
const app = express();

// Server config
app.use(cors());
app.use(express.json());
dotenv.config();

// DataBase config

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
  console.log("MongoDB connected successfully !");
} catch (err) {
  (err) => console.log(err.message);
}

const db = mongoClient.db();

//--------------------------EndPoints--------------------------

//Sign-up

app.post("/sign-up", async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    await db.collection("users").insertOne(user);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(err.message);
  }
});

// Server Listener

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
