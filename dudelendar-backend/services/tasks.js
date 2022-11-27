const db = require("./db");
const helper = require("../helper");

async function getMultiple(page = 1) {
  const rows = await db.query(`SELECT * FROM Tasks`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getTasksById(userid) {
  const rows = await db.query(`SELECT * from Tasks Where User_ID='${userid}'`);
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function insertTask(task) {
  const result = await db.query(
    `INSERT INTO Tasks (Task_Name,Task_Detail,Task_StartTime,Task_EndTime,User_ID) VALUES ('${task.name}', '${task.detail}', '${task.start}', '${task.end}', '${task.userid}');`
  );

  let message = "Error in inserting tasks";

  if (result.affectedRows) {
    message = "tasks inserted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  insertTask,
  getTasksById,
};
