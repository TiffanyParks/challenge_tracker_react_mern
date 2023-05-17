const { Schema, model } = require('mongoose');

const statusSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

});

const Status = model('Status', statusSchema);

module.exports = Status;