const express = require('express');
const bodyParser = require('body-parser');
const expressMongoDb = require('express-mongo-db');
const cors = require('cors');
const { host, port, dbName } = require('./properties.json').database;
const mongoData = require('./src/service/dbConnection.js');

const server = express();
const url = `mongodb://${host}:${port}/${dbName}`;

server.use(bodyParser())


/* Routers import */
const userControlRouter = require('./src/routers/userControlRouter.js');


server.listen(2030);

/*Middleware to connect to database and store it in request object asdb*/
server.use(expressMongoDb(url));

server.use(cors());

server.post('/insertOne', function(req, res){
  var data = req.body;
  var empData = {empNo: data.empNo, empName:data.empName, seatNo: data.seatNo,
                    labLead: data.labLead, pmo: data.pmo}
  mongoData.insertOne(url, empData, res);
});


server.get('/createEmployeeCollection', function(req, res){
  mongoData.createCollection(url, res);
});

server.get('/dropEmployeeCollection', function(req, res){
  mongoData.dropEmployeeCollection(url, res);
});

server.get('/', function(req, res){
  res.send('Node Server');
});

server.post('/checkData', function(req, res) {
  res.json('sample data')
});

server.post('/findEmployee', function(req, res){
 mongoData.findDatas(url, req.body.searchData, res);
})

server.post('/findAllEmployeeData', function(req, res){
  mongoData.findAllEmployeeData(url, res);
});

server.post('/checkReactData', function(req, res){
  res.json('sample data')
});


/* Config Routers Middleware */
server.use('/user',userControlRouter);
