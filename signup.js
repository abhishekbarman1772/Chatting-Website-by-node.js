var express=require("express"); 
var bodyParser=require("body-parser"); 
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://abhishek:qwerty123@cluster0-kozcl.mongodb.net/test?retryWrites=true&w=majority"
var app=express() 
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

app.get('/', function(req,res){
  res.sendFile(__dirname+'/a.html');
}).listen(3000) 


app.post('/sign_up', function(req,res){ 
    var first= req.body.firstname; 
   
       var last = req.body.lastname; 
   
       var email = req.body.email; 
   
       var pass = req.body.password; 
   
       var gend=req.body.gender;
   
       var add=req.body.address;
   
       var phone=req.body.number;
        
       var data = { 
           Firstname: first, 
       
           Lastname:last,
   
           Email: email, 
       
           Password:pass,
   
           Gender:gend,
   
           Phone:phone,
            
           Address:add
       } 
       MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("details").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          
          db.close();
          
        });
        res.sendFile(__dirname+'/registered.html');
      });
    }) ;
    
console.log("server listening at port 3000"); 
