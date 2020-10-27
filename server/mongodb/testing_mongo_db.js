const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Admin:Admin@lyricfynder.5vsum.mongodb.net/LyricFynder?retryWrites=true&w=majority";

//Creating Collection
// dbo.createCollection("customers", function(err, res) {
//   if (err) throw err;
//   console.log("Collection created!");
//   db.close();
// });

//Insertion
// dbo.collection("sample-test").insertOne(sample, function(err, res) {
//     if (err) throw err;
//     console.log("Insertion Success!");
//     db.close();
//   });

//Find Value
// dbo.collection("sample-test").findOne({}, function(err, res) {
//   if (err) throw err;
//   console.log(res.songName);
//   console.log(res.Artist);
//   db.close();
// });

//Insert many Objects
// const sample = [{ songName: "Say So", Artist: "Doja Cat"}, { songName: "Truth Hurts", Artist: "Lizzo"}]
// dbo.collection("sample-test").insertMany(sample);

//Find All
// dbo.collection("sample-test").find({}).toArray(function(err,res){
//   if(err) throw err;
//   console.log(res);
//   db.close()
// })

// Collection Deletion
MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("LyricFynder");
    dbo.collection("sample-test").drop(function(err,delOK){
      if (err) throw err;
      if (delOK) console.log("Deleted Collection");
      db.close();
    });

  });
