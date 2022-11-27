const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
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

async function checkDuplicatedUsername(username) {
  const rows = await db.query(
    `SELECT * from Users Where User_Username='${username}'`
  );
  return rows.length > 0;
}

async function getUser(username) {
  const rows = await db.query(
    `SELECT * from Users Where User_Username='${username}'`
  );
  return { rows };
}

module.exports = {
  getMultiple,
  insertUser,
  checkDuplicatedUsername,
  getUser,
};
