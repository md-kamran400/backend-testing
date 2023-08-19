const {Router} = require("express");
const auth = require("../middlware/auth.middlware")
const BookModel = require("../models/book.model")
const bookRouter = Router()


bookRouter.post("/add", async(req, res)=>{
    try {
        let book = await new BookModel(req.body)
        book.save();
        res.status(200).json({msg: "Book Added", addBook: book})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

bookRouter.get("/", async(req, res)=>{
    try {
        let book = await BookModel.find();
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})



bookRouter.patch("/update/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        let book = await BookModel.findByIdAndUpdate({_id: id}, req.body)
        res.status(200).json({msg: "Book Updated"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

bookRouter.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        let book = await BookModel.findByIdAndDelete(id)
        res.status(200).json({msg: "Book deleted"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

module.exports = bookRouter