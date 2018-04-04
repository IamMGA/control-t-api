const mongoose = require('mongoose');
const Meal = require('../models/meal.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Meal.find()
    .then(meal => res.json(meal))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const meal = new Meal(req.body);
  meal.creator = res.locals.session._id;

  meal.save()
    .then(() => {
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
  const id = req.params.id;
  Meal.findById(id)
    .then(meal => {
      if (meal) {
        res.json(meal)
      } else {
        next(new ApiError(`Meal not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  Meal.findByIdAndUpdate(id, {
      $set: req.body
    }, {
      new: true
    })
    .then(meal => {
      if (meal) {
        res.json(meal)
      } else {
        next(new ApiError(`Meal not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
  }