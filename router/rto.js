const express = require("express");
const verifyToken = require("../middleware/token");
const router = express.Router();
const crypto=require('crypto');
const {AddRto} = require("../db");
const rtoModel = require("../schema/rto.model");
const userModel = require("../schema/user.model");

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

router.get("/users",async (req,res)=>{   
    let rto = req.user;
    console.log(req.user);
    //rto = await  rtoModel.findOne({email:req.user.email});
    let users = await userModel.find({})
    //let {rotName,rtoId,email}= rto;
    // console.log(users);
    let vals = users.map(e=>{
        console.log(e);
        let {email,vhcNo} = e;
        return {email,vhcNo};
    })
    return res.json({"status":200,vals});
});

router.get("/user/:email",verifyToken,async (req,res)=>{   
    let rto = req.user;
    console.log(req.user);
    //rto = await  rtoModel.findOne({email:req.user.email});
    const  user = await userModel.findOne({email:req.params.email})
    //let {rotName,rtoId,email}= rto;
    console.log(user);
    let {
        country,
        district,
        pincode,
        state,
        email,
        DOB,
        name,
        address,
        phNo,
        vhcNo,emission} = user;
    console.log({country,
        district,
        pincode,
        state,
        email,
        DOB,
        name,
        address,
        phNo,
        vhcNo});
    return res.json({"status":200,data:{address,email,name,phNo,vhcNo,emission}});
});
module.exports = router;