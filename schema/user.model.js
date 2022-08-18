const {Schema,model} = require('mongoose')

const USER =  new Schema({
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    DOB:{
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    phNo:{
        type:String,
        required:true
    },
    vhcNo:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    emission:{
        required:true,
        type:Number,
        default:0
    }
})


module.exports = model("USER",USER)