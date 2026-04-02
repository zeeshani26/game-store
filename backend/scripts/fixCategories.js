/**
 * One-time migration: normalize category labels in MongoDB.
 * Run from backend folder: node scripts/fixCategories.js
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { connection } = require("../config/db");
const { Product } = require("../models/productModel");

async function run() {
  await connection;

  const shooting = await Product.updateMany(
    { category: { $in: ["Activision", "Shooter", "shooter"] } },
    { $set: { category: "Shooting" } }
  );
  console.log(`Updated to Shooting: ${shooting.modifiedCount} documents`);

  const gow = await Product.updateMany(
    {
      name: {
        $regex: /God\s+of\s+War/i,
      },
    },
    { $set: { category: "Action" } }
  );
  console.log(`Updated God of War titles to Action: ${gow.modifiedCount} documents`);

  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
