const express = require("express");
const { connection } = require("./config/db");
const { router: productRoutes } = require("./routes/productRoutes");
const { router: userRoutes } = require("./routes/userRoutes");
const { router: orderRoutes } = require("./routes/orderRoutes");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, async () => {
  try {
    const conn = await connection;
    console.log(`Mongoose Connected on ${conn.connection.host}`);
    console.log(`Server Running on PORT ${process.env.PORT}...`);
  } catch (e) {
    console.log(e);
  }
});
