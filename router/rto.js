const express = require("express");
const router = express.Router();
const crypto=require('crypto');
const {AddRto} = require("../db")
router.get("/",(req,res)=>{
    return res.send("hello form user");
})

const HashPass=(email,password)=>crypto.createHmac('sha256',email).update(password).digest('base64')

router.post("/",async (req,res)=>{
    const data = req.body;
    console.log(data);
    data.password = HashPass(data.email,data.password)
    let result = await AddRto(data);
    return res.json({"status":200,"message":result});
})

module.exports = router;