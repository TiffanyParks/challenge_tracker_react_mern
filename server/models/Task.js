const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    taskCount: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

});

const Task = model('Task', taskSchema);

module.exports = Task;