import fs from "node:fs/promises";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import Order from "./orderModel.js";

const app = express();

app.use(express.static("public"));

const DB = process.env.DATABASE;

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((connection) => {
    console.log("Database connection established");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  try {
    const meals = await mongoose.connection.db
      .collection("meals")
      .find()
      .toArray();
    const mealsWithImagePath = meals.map((meal) => ({
      ...meal,
      image: `http://localhost:3000/${meal.image}`, // Update image path here
    }));
    res.json(mealsWithImagePath);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meals", error: err });
  }
});

// app.post("/orders", async (req, res) => {
//   const orderData = req.body.order;

//   if (
//     orderData === null ||
//     orderData.items === null ||
//     orderData.items.length === 0
//   ) {
//     return res.status(400).json({ message: "Missing data." });
//   }

//   if (
//     orderData.customer.email === null ||
//     !orderData.customer.email.includes("@") ||
//     orderData.customer.name === null ||
//     orderData.customer.name.trim() === "" ||
//     orderData.customer.street === null ||
//     orderData.customer.street.trim() === "" ||
//     orderData.customer["postal-code"] === null ||
//     orderData.customer["postal-code"].trim() === "" ||
//     orderData.customer.city === null ||
//     orderData.customer.city.trim() === ""
//   ) {
//     return res.status(400).json({
//       message:
//         "Missing data: Email, name, street, postal code or city is missing.",
//     });
//   }

//   const newOrder = {
//     ...orderData,
//     id: (Math.random() * 1000).toString(),
//   };
//   const orders = await fs.readFile("./data/orders.json", "utf8");
//   const allOrders = JSON.parse(orders);
//   allOrders.push(newOrder);
//   await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
//   res.status(201).json({ message: "Order created!" });
// });

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    !orderData.customer.email ||
    !orderData.customer.email.includes("@") ||
    !orderData.customer.name ||
    !orderData.customer.street ||
    !orderData.customer["postal-code"] ||
    !orderData.customer.city
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code, or city is missing.",
    });
  }

  try {
    const newOrder = new Order(orderData);
    await newOrder.save(); // Save the new order to MongoDB
    res.status(201).json({ message: "Order created!", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(process.env.PORT);
