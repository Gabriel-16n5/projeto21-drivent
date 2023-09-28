import Joi from 'joi';


export const hotelsSchema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        image: Joi.string().uri().required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string(),

})