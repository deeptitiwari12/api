var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./connection');


//Create user
router.post('/user', function(req, res, next) {
    connection.getConnection(function(error, tempConnection) {
        if (!!error) {
            console.log("connection error");
            var response = {
                error: 1,
                message: 'Unable to connect to the DB. Try again'
            };
            res.status(504).json(response);
            tempConnection.release();

        } else {
            console.log("connected");
            var query = "INSERT INTO user_master (contact_name, email,password, is_admin_access,role_id) VALUES ('" + req.body.contact_name + "','" + req.body.email + "','" + req.body.password + "','" + req.body.is_admin_access + "','" + req.body.role_id + "');";
            console.log(query);
            tempConnection.query(query, function(err, rows, fields) {
                tempConnection.release();
                if (!err) {
                    var response = {
                        success: 1,
                        message: 'Signup complete'
                    };
                    res.status(200).json(response);
                }
            });
        }
    });
});

//List user
router.get('/user', function(req, res, next) {
    connection.getConnection(function(error, tempConnection) {
        if (!!error) {
            console.log("connection error");
            var response = {
                error: 1,
                message: 'Unable to connect to the DB. Try again'
            };
            res.status(504).json(response);
            tempConnection.release();

        } else {
            console.log("connected");
            connection.query("SELECT * FROM user_master", function (err, rows, fields) {
                tempConnection.release();
                if (!err)
                {
                  console.log('The solution is: ', rows);
                numRows = rows.length;

                 if(rows.length!=0)
                  var response = {success:1, Data:rows, message:'Data found'};
                  else
                   var response = {error:1, message:'Result not found' };
                }
                else
                {
                  console.log(err);
                }
              res.json(response);                
           });
        }
    });
});

//View user
router.get('/user/:user_id', function(req, res, next) {
    var user_id = req.params.user_id;
    console.log(user_id);
    connection.getConnection(function(error, tempConnection) {
        if (!!error) {
            console.log("connection error");
            var response = {
                error: 1,
                message: 'Unable to connect to the DB. Try again'
            };
            res.status(504).json(response);
            tempConnection.release();

        } else {
            console.log("connected");
            connection.query("SELECT * FROM user_master where user_id = '" + req.params.user_id + "'", function (err, rows, fields) {
                tempConnection.release();
                if (!err)
                {
                  console.log('The solution is: ', rows);
                numRows = rows.length;

                 if(rows.length!=0)
                  var response = {success:1, Data:rows, message:'Data found'};
                  else
                   var response = {error:1, message:'Result not found' };
                }
                else
                {
                  console.log(err);
                }
              res.json(response);                
           });
        }
    });
});

//Edit user
router.put('/user/:user_id', function(req, res, next) {
    var user_id = req.params.user_id;
    console.log(user_id);
    connection.getConnection(function(error, tempConnection) {
        if (!!error) {
            console.log("connection error");
            var response = {
                error: 1,
                message: 'Unable to connect to the DB. Try again'
            };
            res.status(504).json(response);
            tempConnection.release();

        } else {
            console.log("connected");
            var query = "Update user_master set contact_name = '" + req.body.contact_name + "', email='" + req.body.email + "',password = '" + req.body.password + "' , is_admin_access = '" + req.body.is_admin_access + "',role_id = '" + req.body.role_id + "' where user_id = '" + req.params.user_id + "' ;";
            console.log(query);
            tempConnection.query(query, function(err, rows, fields) {
                tempConnection.release();
                if (!err) {
                    var response = {
                        success: 1,
                        message: 'Updated successfully'
                    };
                    res.status(200).json(response);
                }
            });
        }
    });
});

//Delete user
router.delete('/user/:user_id', function(req, res, next) {
    var user_id = req.params.user_id;
    console.log(user_id);
    connection.getConnection(function(error, tempConnection) {
        if (!!error) {
            console.log("connection error");
            var response = {
                error: 1,
                message: 'Unable to connect to the DB. Try again'
            };
            res.status(504).json(response);
            tempConnection.release();

        } else {
            console.log("connected");
            var query = "Delete from user_master  where user_id = '" + req.params.user_id + "' ;";
            console.log(query);
            tempConnection.query(query, function(err, rows, fields) {
                tempConnection.release();
                if (!err) {
                    var response = {
                        success: 1,
                        message: 'Deleted successfully'
                    };
                    res.status(200).json(response);
                }
            });
        }
    });
});





module.exports = router;
