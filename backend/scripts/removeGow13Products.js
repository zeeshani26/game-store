/**
 * Removes legacy catalog entries for God Of War I and God Of War 3 from MongoDB.
 * Run from backend: node scripts/removeGow13Products.js
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { connection } = require("../config/db");
const { Product } = require("../models/productModel");

const NAMES = ["God Of War I", "God Of War 3"];

async function run() {
  await connection;
  const result = await Product.deleteMany({ name: { $in: NAMES } });
  console.log(`Deleted ${result.deletedCount} product(s) matching: ${NAMES.join(", ")}`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
