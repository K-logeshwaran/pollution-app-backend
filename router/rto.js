const express = require("express");
const verifyToken = require("../middleware/token");
const router = express.Router();
const crypto=require('crypto');
const {AddRto} = require("../db");
const rtoModel = require("../schema/rto.model");

const HashPass=(email,password)=>crypto.createHmac('sha256',email).update(password).digest('base64')

router.post("/",async (req,res)=>{
    const data = req.body;
    console.log(data);
    data.password = HashPass(data.email,data.password)
    let result = await AddRto(data);
    return res.json({"status":200,"message":result});
})



router.get("/",verifyToken,async (req,res)=>{   
    let rto = req.user;
    console.log(req.user);
    rto = await  rtoModel.findOne({email:req.user.email});
    let {rotName,rtoId,email}= rto;
    console.log(rto);
    return res.json({"status":200,"rto":{rtoName:rotName,rtoId,email}});
});

module.exports = router;