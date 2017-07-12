var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var express = require('express')
var app = express()

//App Config
mongoose.connect('mongodb://localhost/restful_blog-app')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

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


//title
//image
//body
//created

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('SERVER IS RUNNING!')
})

