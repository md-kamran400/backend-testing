

const {Router} = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const blackListModel = require("../models/token.model");

const userRouter = Router();


userRouter.post("/register", async(req, res)=>{
    try {
        let {email, pass} = req.body;
        const existingUsers = await userModel.find({email});
        if(existingUsers.length){
        return res.status(200).send({
            error: "Register failed user Already exist!",
        });
        }

        if(checkPassWord(pass)){
            const hashPass = bcrypt.hashSync(pass, 10);
            const user = new userModel({...req.body, pass: hashPass});
            await user.save();
            return res.status(200).send({
                msg: "The new user has been registered.",
                registeredUser: {...req.body, pass: hashPass},
            });
        }

        return res.status(400).send({
            error: "Rester failed. password must contains at least one Specaial character, uppercaseLetter, onne number."
        });
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
})

const checkPassWord = (pass) =>{
    if(pass.length< 0){
        return false;
    }

    let alfaebates = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let nums = "0123456789";
    let spacial = "~!@#$%^&*()_+{}:<>?"

    let data1 = false;
    let data2 = false;
    let data3 = false;

    for(let i=0;i<pass.length;i++){
        if(alfaebates.includes(pass[i])){
            data1 = true;
        }
        if(nums.includes(pass[i])){
            data2 = true;
        }
        if(spacial.includes(pass[i])){
            data3 = true;
        }
    }
    return data1 && data2 && data3 ? true: false;
}


userRouter.post("/login", async(req, res)=>{
    try {
        let {email, pass} = req.body;
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            bcrypt.compare(pass, existingUser.pass,(err, result)=>{
                if(result){
                    try {
                        const token = jwt.sign({userID: existingUser._id}, "kamran",{
                            expiresIn: 120,
                        })

                        const refreshToken  = jwt.sign({userID: existingUser._id}, "kamran",{expiresIn: 300})
                        return res.status(200).send({msg: "Login successFull", token, refreshToken});
                    } catch (error) {
                        return res.status(400).send({error: error.message})
                    }
                }
                res.status(400).send({error: "Login Failed wrong Password is given by user"})
            });
        }
        else{
            res.status(400).send({error: "Login failed user not found!"});
        }
    } catch (error) {
        res.status(400).send({error: error.message})
    }
});

userRouter.get("/logout", async(req, res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]|| null;
        if(token){
            await blackListModel.updateMany({}, {$push: {blacklist: [token]}});
            res.status(200).send("Logout Successfull")
        }
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = userRouter;