const express = require("express");
const router = express.Router();
const {AddUsers} = require('../db')
const crypto=require('crypto');
const verifyToken = require("../middleware/token");
const userModel = require("../schema/user.model");



const HashPass=(email,password)=>crypto.createHmac('sha256',email).update(password).digest('base64')

router.post("/",async (req,res)=>{
    const data = req.body;
    console.log(data);
    data.password = HashPass(data.email,data.password)
    let result = await AddUsers(data);
    return res.json({"status":200,"message":result});
});

router.get("/",verifyToken,async (req,res)=>{
    let user = req.user;
    user = await  userModel.findOne({email:req.user.email});
    let {email,vhcNo,name}= user;
    return res.json({"status":200,"user":{email,vhcNo,name}});
});

module.exports = router;

// DOB: "2022-08-12T03:57:51.115Z"
// address: "jnjnjnkn"
// country: "mlkmmlkm"
// district: "mkmksmdkmk"
// email: "ff@ff"
// name: "hhnjnj"
// password: "ZW5Q5uZh+It9z3p+3CtW/4r/gFcbXxxNSFKItB/nUfM="
// phNo: "kjnjknjnjn"
// pincode: "mklmklmmk"
// state: "mmkmkmkm"
// vhcNo: ",m m mmkmklm"