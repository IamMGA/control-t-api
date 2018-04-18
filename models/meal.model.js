const mongoose = require('mongoose');
const mealSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  name: {
    type: String,
    lowercase: true,
    required: [true, 'Product name is required']
  },
  specNutritions: {
    servingSize: {
      type: Number,
      required: [true, 'Quantity is required']
    },
    calories: {
      type: Number,
      required: [true, 'Quantity is required']
    },
    fat: {
      type: Number,
      required: [true, 'Fat is required']
    },
    carbs: {
      type: Number,
      required: [true, 'Carbs is required']
    },
    protein: {
      type: Number,
      required: [true, 'Protein is required']
    },
    others: {
      sugar: {
        type: Number,
        default: 0
      },
      cholesterol: {
        type: Number,
        default: 0
      },
      caffeine: {
        type: Number,
        default: 0
      }
    }
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