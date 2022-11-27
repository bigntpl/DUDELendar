const express = require("express");
const router = express.Router();
const users = require("../services/users");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jsonParser = bodyParser.json();
require("dotenv").config();

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
    const { username, password, firstname, lastname } = req.body;
    if (!(username && password && firstname && lastname)) {
      return res.status(400).json({ message: "All input is required" });
    }

    if (await users.checkDuplicatedUsername(username)) {
      return res.status(400).json({ message: "Your username already exists" });
    }

    res.status(200).json(await users.insertUser(req.body));
  } catch (err) {
    console.error(`Error while registering user:`, err.message);
    next(err);
  }
});

router.post("/login", jsonParser, async function (req, res, next) {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    if (await users.checkDuplicatedUsername(username)) {
      const user = await users.getUser(username);
      if (user.rows[0].User_Password == password) {
        const token = jwt.sign({ username: username }, process.env.TOKEN_KEY, {
          expiresIn: "2h",
        });
        return res.status(200).json({
          message: "Login Sucessfully",
          username: username,
          userid: user.rows[0].User_ID,
          token: token,
        });
      }
    }
    res.status(400).json({ message: "Invalid Credentials" });
  } catch (err) {
    console.error(`Error while loggin user:`, err.message);
    next(err);
  }
});

module.exports = router;
