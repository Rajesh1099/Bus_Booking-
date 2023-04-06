const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,                   
            required: true
        },
        phone: {
            type: String, 
            unique:true,                    
            required: true
        },
        
        email: {
            type: String,
            unique:true,                
            required: true
            
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    }
);

module.exports = mongoose.model("users",userSchema);

