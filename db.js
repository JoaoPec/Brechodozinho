import mongoose from "mongoose"

const postSchema = {
    description: String,
    price: Number,
    image: String 
}

const Post = mongoose.model("Post", postSchema)

export { Post }