// Don't run. Experimental file for importing initially only

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { users } = require("./data/users");
const { products } = require("./data/products");
const { User } = require("./models/userModel");
const { Product } = require("./models/productModel");
const { Order } = require("./models/orderModel"); // to destroy orders from user models
const { connection } = require("./config/db");

dotenv.config();

const importData = async () => {
  try {
    const conn = await connection;
    console.log(`Mongoose Connected on ${conn.connection.host}`);

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const conn = await connection;
    console.log(`Mongoose Connected on ${conn.connection.host}`);
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
