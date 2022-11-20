const express = require("express");
const router = express.Router();
const users = require("../services/users");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

/* GET users. */
router.get("/list", async function (req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

/* register. */
router.post("/register", jsonParser, async function (req, res, next) {
  try {
    res.json(await users.insertUser(req.body));
  } catch (err) {
    console.error(`Error while registering user:`, err.message);
    next(err);
  }
});

module.exports = router;
