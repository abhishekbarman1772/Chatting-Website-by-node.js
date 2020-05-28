var express=require("express"); 
var bodyParser=require("body-parser"); 
//const logout = require('express-passport-logout');
const mongoose = require('mongoose');  
var MongoClient = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
z=""
y=""
var app=express();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('view engine', 'ejs'); 
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/b.html");
   
});

app.post('/login',function(req,res){    
email =req.body.email;
pass =req.body.password;
var query = {Email: email, Password: pass}
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("details").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      result.forEach(function(product, index) { 
        z=product.Firstname; 
        y=product.Lastname; });

      db.close();
    if(result!=0){
        return res.render('v.ejs',{result,z,y}); 
    }  
    else
      {return res.status(404).send('Please register yourself');}
      
    });
  });
});

var dbUrl =  "mongodb://localhost:27017/mydb";
mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
  console.log('mongodb connected',err);
})

var Message = mongoose.model('Message',{
  name : String,
  message : String,
  Date: String
})

  var userNames = {};
 
  io.sockets.on('connection', function(socket) {
    var getDefaultName = function(){
  
      return z;
  };
      console.log('A user connected');
      name = getDefaultName();
      userNames[name] = socket.id;
      data = {name: name};
      socket.emit('initName', data);


  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages',urlencodedParser,function(req, res){
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
    sendStatus(500);
    
   io.emit('message', req.body);
    res.sendStatus(200);
  })
})

  app.get('/logout',(req,res)=>{
    //session destroy
     req.session=null;
    res.redirect('/');
});
	
  http.listen(3000, function() {
     console.log('listening on localhost:3000');
  });

