const mongoose = require('mongoose');
const Meal = require('../models/meal.model');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  const meal = new Meal(req.body);
  meal.save()
    .then(()=>{
      res.status(201).json(meal);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}

module.exports.get = (req, res, next) => {
  const text = req.params.text;
  Meal.find({name: text})
    .then(meal => {
      if (meal) {
        res.json(meal)
      } else {
        next(new ApiError(`Meal not found`, 404));
      }
    }).catch(error => next(error));
}