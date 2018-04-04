const mongoose = require('mongoose');
const ApiError = require('../models/api-error.model');
const Meal = require('../models/meal.model');

module.exports.checkValidId = (req, res, next) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        next();
    } else {
        next(new ApiError(`Invalid meal id: ${id}`));
    }
}

module.exports.isMealCreator = (req , res, next) =>{
  const id = req.params.id;
  Meal.findById(id)
    .then(meal => {
      if (meal.creator.toString() === res.locals.session._id.toString()) {
        next();
      }else{
          next(new ApiError('Only the creator can modify it'));  
      }
    })
}


