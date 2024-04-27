const Joi = require('joi');

const pageSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    url: Joi.string().required()
});

module.exports = {
    pageSchema
};
