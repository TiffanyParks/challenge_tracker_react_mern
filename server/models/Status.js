const { Schema, model } = require('mongoose');

const statusSchema = new Schema(
    {
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
            ref: "Task"
        },

    }
);

const Status = model('Status', statusSchema);

module.exports = Status;