const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[a-zA-Z0-9 !#$%&'*+\-/=?^_`{|}~]+\.[a-zA-Z0-9 !#$%&'*+\-/=?^_`{|}~]{2,}$/;
        return value.match(re);
      },
    },
  },
});

module.exports = mongoose.model("User", userSchema);
