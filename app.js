const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose =require("mongoose");

const homeStartingContent = "Welcome to DAILY JOURNAL.";
const aboutContent = "This is a blog site where an individual can note down their views, ideas and remainders too !";
const contactContent = {
  name : "©️ Balasa Harsha",
  email : "balasaharsha@gmail.com",
  phno : "+91 9154988767"
};

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://harsha:Harsha%40535048@cluster0.dg3zb.mongodb.net/blogDB");

const postSchema = new mongoose.Schema({
  title : String,
  content :String
});

const Post = mongoose.model('Post', postSchema);



app.get("/", (req,res) =>{

  Post.find({},(err,posts)=>{
    if(!err){
        res.render("home" , { 
        homeStartingContent : homeStartingContent ,
        posts : posts
      });
    }
  });
});

app.get("/about", (req,res) =>{
  res.render("about",{ 
    aboutContent :aboutContent , 
  });
});

app.get("/contact", (req,res) =>{
  res.render("contact",{ 
    contactContent : contactContent ,
  });
});

app.get("/compose" ,(req,res) =>{
  res.render("compose");
});

app.post("/compose" ,(req,res) =>{
  const newPost = {
    title : req.body.postTitle,
    content : req.body.postBody
  };
  Post.insertMany([newPost],(err) =>{
    if(err)
    {
      console.log(err);
    }
  })
  res.redirect("/");
});

app.get("/posts/:postid", (req,res) =>{
  const reqId = (req.params.postid);
  Post.findOne({_id : reqId},(err,post)=>{
    if(!err){
        res.render("post" , { 
        post : post
      });
    }
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started !!!");
});
