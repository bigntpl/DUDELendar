const dotenv = require("dotenv");
dotenv.config();

const config = {
  db: {
    host: "202.151.176.194",
    user: "root",
    password: "IKRgck55236",
    database: "dudelendar",
  },
  listPerPage: 10,
};
module.exports = config;