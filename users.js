var express = require('express');
var router = express.Router();
var mysql=require('mysql');

/* GET users listing. */
router.post('/check', function(req, res, next) {

  res.send('My app is running');
});


var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'demo'
 });
 var app = express();
 connection.connect(function(err){

 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }

}

);

router.get('/deepti', function(req, res, next) {

	var response = {sucess: 'My name is deepti'}
    connection.query("SELECT * FROM user_registration", function (err, result, fields) {
	 // if (err) throw err;
	    console.log(err);
	    response=result;
	    res.send(response);
	    console.log("Get finish Post start");
	    // connection.end();
	  });
   
});


router.post('/create', function(req, res, next) {
	// app.post('/create', function(req, res, next) {
		console.log(req.body);
		var query = "INSERT INTO user_registration (name, phone, address,email) VALUES ('"+req.body.name+"','"+req.body.phone+"','"+req.body.address+"','"+req.body.email+"');";
		console.log(query);
	    var con= connection.query(query, function(err,doc,resp,fields){ 
	    console.log(err);
	    // console.log(err);
	    res.send(resp);
	    console.log("finish Post");
	    // connection.end();

	});
	});
router.post('/remove', function(req, res, next) {

	console.log(req.body.id);
	var query = "DELETE FROM user_registration WHERE userID = "+req.body.id+";";
        console.log(query);
		connection.query(query,function(err,rows,resp){
	 	console.log(err);
	    res.send(resp);
	    //res.send(response);
	    console.log("finish remove");

	     // connection.end();
	    
	  });
   
});

router.post('/edit', function(req, res, next) {

    console.log(req.body);
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var email = req.body.email;
     var userID = req.body.userID;

    //var query = "DELETE FROM user_registration WHERE userID = "+req.body.id+";";
	var query = "UPDATE user_registration set name='"+name+"', phone='"+phone+"', address='"+address+"',email='"+email+"' WHERE userID = '"+userID+"';";
	 console.log(query);
		connection.query(query,function(err,rows,resp){
		 	 	console.log(err);
			if (err) {
	     		// connection.end();
			}else{
		 		//console.log('Response:  ',rows);
			    res.send(rows);
		 	    // res.send(response);
		 	    console.log("Edit Data");
			     // connection.end();
			}
	    
	  });
   
});

  
module.exports = router;
