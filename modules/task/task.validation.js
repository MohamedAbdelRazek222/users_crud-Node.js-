const Joi=require('joi');




const addTaskValidation={


body:Joi.object().required().keys({

taxt:Joi.string().min(5).max(100).required(),
title:Joi.string().min(5).max(20).required()




})


}
const updateTaskValidation={


body:Joi.object().required().keys({

taxt:Joi.string().min(5).max(100).required(),
title:Joi.string().min(5).max(20).required()




}),
params:Joi.object().required().keys({

    token:Joi.string().required(),

})

}
const deleteTaskValidation={


body:Joi.object().required().keys({

taxt:Joi.string().min(5).max(100).required(),
title:Joi.string().min(5).max(20).required()




}),
params:Joi.object().required().keys({

    token:Joi.string().required(),

})

}






module.exports={addTaskValidation,

    updateTaskValidation,
    deleteTaskValidation


}