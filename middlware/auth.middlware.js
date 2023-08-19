const jwt = require("jsonwebtoken");
const blackListModel = require("../models/token.model");

const auth = async(req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1] || null;
        if(token){
            const existingToken = await blackListModel.findOne({
                blacklist: {$in: token}
            });
            if(existingToken){
                return res.status(400).send({error: "Please Login Again!."})
            }

            const decoded = jwt.verify(token, "kamran");
            req.userID = decoded.userID;

            return next();
        }
        else{
            res.status(400).send("please login first!.")
        }
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
}

module.exports = auth;