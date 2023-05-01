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
        
        isAdmin: {
            type: Boolean,
            default: false,
          },
        email: {
            type: String,
            unique:true,                
            required: true
            
        },
      
    }
);

module.exports = mongoose.model("users",userSchema);

