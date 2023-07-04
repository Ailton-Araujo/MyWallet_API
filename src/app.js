import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import Joi from "joi";
import bcrypt from "bcrypt";

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

//DataSchema

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

//--------------------------EndPoints--------------------------

//Sign-up

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  const validation = userSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const userMail = await db.collection("users").findOne({ email });
    if (userMail) return res.status(409).send("E-mail já cadastrado");

    const hash = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({ name, email, password: hash });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Server Listener

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
