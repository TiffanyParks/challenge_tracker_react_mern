const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type:String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status :{
    type: Schema.Types.ObjectId,
    ref: "Status"
  },
});

const User = model('User', userSchema);

module.exports = User;
