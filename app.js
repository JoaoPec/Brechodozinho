import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { Post } from "./db.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const pswd = process.env.PASSWORD

mongoose.connect(`mongodb+srv://joaopecurcino:${pswd}@brecho.rowqou8.mongodb.net`, { useNewUrlParser: true })

app.listen(3000, () => {
    console.log("http://localhost:3000")
})

app.get("/", async (req, res) => {
    
    try {
        const posts = await Post.find({})
        res.render("index.ejs", { post: posts })
        console.log(posts)
    } catch (err) {
        res.status(500).send("Error: " + err)
    }

})

app.get("/compose", (req, res) => {
    res.render("compose.ejs")
})

app.post("/compose", upload.single("img"), async (req, res) => {
    
    try {
        
        const description = req.body.description
        const price = req.body.price
        const buffer = req.file.buffer
        
        const imageBase64 = buffer.toString("base64");
 
        const imageSrc = `data:${req.file.mimetype};base64,${imageBase64}`;

        const post = new Post({
            description: description,
            price: price,
            image: imageSrc
        })
        await post.save()

        res.redirect("/")
    } catch (err) {
        res.status(500).send("Error: " + err)
    }
})

app.post("/delete", async (req, res) => {
    try {
        const id = req.body.id
        console.log(id)
        await Post.deleteOne({ _id: id })
        res.redirect("/")
    } catch (err) {
        res.status(500).send("Error: " + err)
    }
})