app.get("/", (req, res) => {

    postsData = Post.find({})

    res.render("index.ejs", { posts: postsData });
});