const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
    userId: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    fields: [{
        question: {
            type: String
        },
        label: {
            type: String
        },
        type: {
           type: String
        },
        options: {
            type: Array
        },
        defaultValue: {
            type: String
        },
        // more fields can be added here
    }],
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})
const editor = mongoose.model("editor", schema)
module.exports = editor