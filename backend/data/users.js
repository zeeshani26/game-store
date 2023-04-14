const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Zeeshan",
    email: "zeeshan@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Amaan",
    email: "amaan@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = { users };
