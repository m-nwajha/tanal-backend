const express = require("express");
const router = express.Router();
const { sayHello } = require("../controllers/helloController");
const logger = require("../middleware/logger");

router.use(logger);

router.get("/hello", sayHello);

module.exports = router;
