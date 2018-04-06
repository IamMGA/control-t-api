const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'User needs a password']
  },
  nickName: {
    type: String,
    lowercase: true,
    required: [true, 'Nick is required']
  },
  info: {
    sex: {
      type: Number,
      min: [0, 'Undefined Sex'],
      max: [1, 'Undefined Sex'],
      required: [true, 'Sex is required']
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required']
    },
    stature: {
      type: Number,
      required: [true, 'Stature is required']
    },
    age: {
      type: Number,
      required: [true, 'Age is required']
    },
    activity: {
      type: Number,
      min: [0, 'Undefined activity'],
      max: [4, 'Undefined activity'],
      required: [true, 'Activity is required']
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

userSchema.virtual('dayCalories')
  .get(function () {
    let tmb;
    switch (this.info.sex) {
      case 0:
        tmb = 655 + (9.6 * this.info.weight) + (1.8 * this.info.stature) - (4.7 * this.info.age)
        break;
      case 1:
        tmb = 66 + (13.7 * this.info.weight) + (5 * this.info.stature) - (6.8 * this.info.age)
        break;
      default:
        break;
    }
    switch (this.info.activity) {
      case 0:
        tmb = tmb * 1.2;
        break;
      case 1:
        tmb = tmb * 1.375;
        break;
      case 2:
        tmb = tmb * 1.55;
        break;
      case 3:
        tmb = tmb * 1725;
        break;
      case 4:
        tmb = tmb * 1.9;
        break;
      default:
        break;
    }
    return tmb;
  })

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR)
    .then(salt => {
      bcrypt.hash(user.password, salt)
        .then(hash => {
          user.password = hash;
          return next();
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;