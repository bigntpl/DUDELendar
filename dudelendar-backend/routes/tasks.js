const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const tasks = require("../services/tasks");
const helper = require("../helper");


/* GET tasks. */
router.get("/list", async function (req, res, next) {
  try {
    let allTasks = await tasks.getMultiple(req.query.page);
    console.log("allTasks", allTasks.data);
    // allTasks = JSON.parse(allTasks);
    allTasks.data.forEach((obj) => {
      helper.renameKey(obj, "Task_ID", "id");
      helper.renameKey(obj, "Task_Name", "title");
      helper.renameKey(obj, "Task_StartTime", "start");
      helper.renameKey(obj, "Task_EndTime", "end");
      helper.renameKey(obj, "User_ID", "user");
      helper.renameKey(obj, "Task_Detail", "detail");
    });
    res.json(allTasks);
  } catch (err) {
    console.error(`Error while getting tasks `, err.message);
    next(err);
  }
});

router.post("/listById", jsonParser, async function (req, res, next) {
  try {
    let allTasks = await tasks.getTasksById(req.body.userid);
    allTasks.data.forEach((obj) => {
      helper.renameKey(obj, "Task_ID", "id");
      helper.renameKey(obj, "Task_Name", "title");
      helper.renameKey(obj, "Task_StartTime", "start");
      helper.renameKey(obj, "Task_EndTime", "end");
      helper.renameKey(obj, "User_ID", "user");
      helper.renameKey(obj, "Task_Detail", "detail");
    });
    res.json(allTasks);
  } catch (err) {
    console.error(`Error while registering user:`, err.message);
    next(err);
  }
});

/* add task. */
router.post("/add", jsonParser, async function (req, res, next) {
  try {
    res.status(200).json(await tasks.insertTask(req.body));
  } catch (err) {
    console.error(`Error while registering user:`, err.message);
    next(err);
  }
});

module.exports = router;
