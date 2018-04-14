const mongoose = require('mongoose');
const intakeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:"Meal",
    required: [true, 'Meal required']
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

const Intake = mongoose.model('Intake', intakeSchema);
module.exports = Intake;