const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 
const CategorySchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    image: {
        type: 'String',
        required: false,
        default: 'https://cdn.pixabay.com/photo/2024/04/20/17/11/bee-8709123_1280.jpg'
    }
}, { timestamps: true });


// Export model
module.exports = mongoose.model("Category", CategorySchema);
