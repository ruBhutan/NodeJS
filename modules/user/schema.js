const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 
const UserSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    address: {
        type: 'String',
        required: false,
        default: 'Bhutan'
    },
    status: {
        type: 'Number',
        default: 1,
        description : '0: deleted, 1: active, 2: pending, 3: blocked'
    }
}, { timestamps: true });


// Export model
module.exports = mongoose.model("User", UserSchema);
