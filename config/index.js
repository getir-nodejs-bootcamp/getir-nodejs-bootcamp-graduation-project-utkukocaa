const { dotenv } = require("./dotenv");
const asyncErrors = require("./express-async-errors");
module.exports = () => {
  dotenv.config();
  asyncErrors;
};
