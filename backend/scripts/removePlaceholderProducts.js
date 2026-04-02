/**
 * Removes products created by the old admin flow (placeholder name ABCXYZ).
 * Run from backend: node scripts/removePlaceholderProducts.js
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { connection } = require("../config/db");
const { Product } = require("../models/productModel");

async function run() {
  await connection;
  const result = await Product.deleteMany({ name: "ABCXYZ" });
  console.log(`Deleted ${result.deletedCount} placeholder product(s) (name ABCXYZ).`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
