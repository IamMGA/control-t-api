const mongoose = require('mongoose');
const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  specNutritions: {
    type: Object,
    required: [true, 'Nutrition spec is required']
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;