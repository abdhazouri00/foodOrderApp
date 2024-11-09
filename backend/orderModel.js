import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: {
    type: [String], // Assuming each item is represented by a string (like an item ID)
    required: true,
    validate: [
      (items) => items.length > 0,
      "Order must contain at least one item.",
    ],
  },
  customer: {
    email: {
      type: String,
      required: true,
      validate: [(email) => email.includes("@"), "Invalid email format."],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    "postal-code": {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
