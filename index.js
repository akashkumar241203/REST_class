const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4 } = require("uuid");
const methodOverride =require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id : uuidv4(),
        username : "akash kumar",
        content : "Love coding"
    },
    {
        id : uuidv4(),
        username : "ram kumar",
        content : "Love coding"
    },
    {
        id : uuidv4(),
        username : "arun kumar",
        content : "Love coding"
    }
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs" ,{ posts });
});

app.get("/posts/new" , (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username , content} = req.body;
  let id = uuidv4();
  posts.push({id, username , content});
  res.redirect("/posts");
});


app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res)=>{
    const { id } = req.params;
    const newContent = req.body.content;
    const post = posts.find(p => p.id === id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
});

