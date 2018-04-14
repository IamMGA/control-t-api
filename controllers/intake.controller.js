const mongoose = require('mongoose');
const Intake = require('../models/intakes.model');
const ApiError = require('../models/api-error.model');
const dayStart = "T00:00:00.000Z";
const dayEnd = "T23:59:59.999Z";

module.exports.todayIntakes = (req, res, next) => {
  const today = new Date().toISOString().substring(0, 10);

  Intake.find({
      "createdAt": {
        $gte: today + dayStart,
        $lte: today + dayEnd
      },
      "user": req.user._id
    })
    .populate('meal','specNutritions , name')
    .then(intakes => res.json(intakes))
    .catch(error => next(error));
}

module.exports.intakesByDates = (req, res, next) => {

  Intake.find({
    "createdAt": {
      $gte: req.body.dayOne + dayStart,
      $lte: req.body.dayTwo + dayEnd
    },
    "user": req.user._id
  })
  .then(intakes => res.json(intakes))
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ApiError(error.errors));
    } else {
      next(new ApiError(error.message, 500));
    }
  })
}

module.exports.addIntake = (req, res, next) => {
  const intake = new Intake(req.body);
  intake.user = req.user._id;
  // if (!intake.meals.length) {
  //   next(new ApiError(`Empty Intake`, 404));
  // }
  intake.save()
    .then(() => {
      res.status(201).json(intake);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}

module.exports.deleteIntake = (req, res, next) => {
  const id = req.params.id;
  Intake.findByIdAndRemove(id)
    .then(intake => {
      if (intake) {
        res.status(204).json()
      } else {
        next(new ApiError(`Intake not found`, 404));
      }
    }).catch(error => next(error));
}