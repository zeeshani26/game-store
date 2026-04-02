const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoUri = process.env.MONGO_URL || process.env.MongoUrl;
if (!mongoUri || typeof mongoUri !== "string") {
  console.error(
    "Missing MONGO_URL. Copy backend/.env.example to backend/.env and set MONGO_URL (or MongoUrl)."
  );
  process.exit(1);
}

const connection = mongoose.connect(mongoUri);

module.exports = { connection };
