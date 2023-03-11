const validation = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.json(error.details);
    }
    next();
  };

  return func;
};

module.exports = validation;
