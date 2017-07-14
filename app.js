var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var expressSanitizer = require('express-sanitizer')
var mongoose = require('mongoose')
var express = require('express')
var app = express()

//App Config
mongoose.connect('mongodb://localhost/restful_blog-app')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use('express-sanitizer')
app.use(methodOverride('_method'))

//Mongoose Model config
var blogSchema = new mongoose.Schema({
    title: String, 
    image: String,
    body: String, 
    created: {type: Date, default: Date.now}
})
var Blog = mongoose.model('Blog', blogSchema)

//Restful Routes

//INDEX ROUTE
app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!")
        } else {
            res.render("index", {blogs: blogs})
        }
    })
})

//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new")
})

//CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new")
        }else {
            //then, redirect to index
            res.redirect("/blogs")
        }
    })
    
})

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog})
        }
    })
})

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        } else {
            res.render("edit", {blog: foundBlog})
        }
    })
    res.render("edit")
})

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs")
        } else{
            res.redirect("/blogs/" + req.params.id)
        }
    })
})

// DELETE ROUTE
app.delete("/globs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        } else {
            res.redirect("/blog")
        }
    })
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('SERVER IS RUNNING!')
})

