const express = require("express");
const listRecords = require("../controllers/record");
const validate = require("../middlewares/validation");
const { getRecords } = require("../validations/record");

const router = express.Router();

router.route("/").post(validate(getRecords, "body"), listRecords);

module.exports = router;
