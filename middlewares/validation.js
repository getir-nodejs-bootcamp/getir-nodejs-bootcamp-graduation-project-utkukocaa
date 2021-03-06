const { BadRequestError } = require("../errors/index");

const validate = (schema, source) => (req, res, next) => {
  //adding options to fix error message wrapping with slash
  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  const { value, error } = schema.validate(req[source], options);

  if (error) {
    const errorMessage = error?.details
      ?.map((detail) => detail?.message)
      .join(", ");
    throw new BadRequestError(errorMessage);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
