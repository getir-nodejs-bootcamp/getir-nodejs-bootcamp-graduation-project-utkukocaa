const Joi = require("joi").extend(require("@joi/date"));

const getRecords = Joi.object({
  startDate: Joi.date().format("YYYY-MM-DD").required().max("now"),
  endDate: Joi.date()
    .format("YYYY-MM-DD")
    .required()
    .max("now")
    .greater(Joi.ref("startDate")),
  minCount: Joi.number().required().min(0),
  maxCount: Joi.number().required().positive().greater(Joi.ref("minCount")),
});

module.exports = {
  getRecords,
};
