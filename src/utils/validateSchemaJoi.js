const Joi = require('joi');

function validateRegisterData(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
      .min(8)
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])'))
      .required().messages({ 
        'string.pattern.base': 'Password must have at least one uppercase letter and one special character'
      }),
      username: Joi.string().required().min(4).max(20).messages({
        'string.min': 'Username must have at least 4 characters',
        'string.max': 'Username must have at most 20 characters'
      }),
    });

    return schema.validate(data);
  }

function validateLoginData(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return schema.validate(data);
  }


  function validatePutFastLapInRace(data) {
    const schema = Joi.object({
      raceId: Joi.number().required(),
      lapTime: Joi.number()
      .min(0)
      .required()
    });

    return schema.validate(data);
  }

module.exports = { validateRegisterData, validateLoginData, validatePutFastLapInRace };
