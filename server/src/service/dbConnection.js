const mongoDb = require('mongodb').MongoClient;

connectUrl = function(url) {
  return mongoDb.connect(url, function(err, db){
    if(err) throw err;
    return db;
  });
}

createCollection = function(url, resp) {
  return mongoDb.connect(url, function(err, db){
    if (err) throw err;
  var dbo = db.db("billing");
  dbo.createCollection("employee", function(err, res) {
    if (err) throw err;
    db.close();
  });
  });
}

dropEmployeeCollection = function(url, resp){
  return mongoDb.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billing");
    dbo.collection("employee").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      resp.json('deleted')
      db.close();
    });
  });

}

findAllEmployeeData = function(url , resp){
  return mongoDb.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billing");
    dbo.collection("employee").find({}).toArray(function(err, result) {
      if (err) throw err;
      resp.json(JSON.stringify(result));
      db.close();
    });
  });
}

insertOne = function(url, insertData, res) {
  return mongoDb.connect(url, function(err, db){
    if (err) throw err;
    dbo = db.db('billing');
    var data = { a:1, b:2 }
    dbo.collection('employee').insertOne(insertData, function(err, result){
      if (err) throw err;
      res.json(result);
    })
  });
}

findDatas = function(url, searchData, res){
  return mongoDb.connect(url, function(err, db){
    if(err) throw err;
    dbo = db.db('billing');
    var regex = new RegExp('^'+searchData);
    var condition = {$or:[
      {empNo:regex},
      {empName: regex},
      {labLead: regex},
      {seatNo: regex},
      {pmo: regex}
    ]};
    dbo.collection('employee').find(condition).toArray(function(err, result){
      if(err) throw err;
      res.json(JSON.stringify(result));
    })
  });
}

module.exports.connect = connectUrl;
module.exports.createCollection = createCollection;
module.exports.insertOne = insertOne;
module.exports.dropEmployeeCollection = dropEmployeeCollection;
module.exports.findAllEmployeeData = findAllEmployeeData;
module.exports.findDatas = findDatas;