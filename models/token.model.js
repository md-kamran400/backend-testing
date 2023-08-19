const {default: mongoose, model} = require("mongoose");

const blackListSchema = new mongoose.Schema({
    blacklist: {type: [String]}
});

const blackListModel = mongoose.model("blacklist", blackListSchema)

module.exports = blackListModel;