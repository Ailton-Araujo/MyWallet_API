import { stripHtml } from "string-strip-html";
import db from "../database/database.connection.js";

const listTransactions = async (req, res) => {
  const userId = res.locals.userId;
  try {
    const transactions = await db
      .collection("transactions")
      .find({
        userId,
      })
      .sort({ $natural: -1 })
      .toArray();
    res.send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addTransaction = async (req, res) => {
  const { description, amount, type } = req.body;
  try {
    await db.collection("transactions").insertOne({
      description,
      amount,
      type,
      date: Date.now(),
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params();
  const userId = res.locals.userId;
  try {
    const transaction = await db.collection("transactions").find({
      _id: id,
    });
    if (!transaction) return res.status(404).send("Transação não encontrada");
    await db.collection("transactions").deleteOne({
      transaction,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editTransaction = async (req, res) => {
  const { id } = req.params();
  const userId = res.locals.userId;
  const { description, amount, type } = req.body;

  try {
    const transaction = await db.collection("transactions").find({
      _id: id,
    });
    if (!transaction) return res.status(404).send("Transação não encontrada");
    await db.collection("transactions").updateOne({
      $set: {
        description: stripHtml(description).result.trim(),
        amount: stripHtml(amount).result.trim(),
        type: stripHtml(type).result.trim(),
      },
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { listTransactions, addTransaction, deleteTransaction, editTransaction };
