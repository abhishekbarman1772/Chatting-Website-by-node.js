const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://abhishek:qwerty123@cluster0-kozcl.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

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
      });
    }) ;
