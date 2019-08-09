var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require("fs");
var mysql = require('mysql');

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));
var connection_config = require("./connection");
var connection = mysql.createPool(connection_config);
var v_name = connection_config.version_name;
var v_code = connection_config.version_code;


router.get('/version_check', function(req, res, next) {
  var response = {success:1,data: {version_name: v_name, version_code: v_code, mandatory: true} , message: "version details succcesfully fetched"};
  res.json(response);  
  })



module.exports = router;