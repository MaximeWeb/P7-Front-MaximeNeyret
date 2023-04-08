const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String, 
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxLength: 500,
        },
        picture: {
            type: String,
        },
        
        likes: [],

        createAt: {
           type:Date,
           default:new Date()
        },
            
         
    },
         { 
            timestamps: true,
         }
);

module.exports = mongoose.model('post', PostSchema);