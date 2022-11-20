const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const bodyParser = require("body-parser");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * from Users`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function insertUser(user) {
  const result = await db.query(
    `INSERT INTO Users (User_Username, User_Password, User_FirstName, User_LastName) VALUES ('${user.username}', '${user.password}', '${user.firstname}', '${user.lastname}');`
  );

  let message = "Error in creating users";

  if (result.affectedRows) {
    message = "users created successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  insertUser,
};
