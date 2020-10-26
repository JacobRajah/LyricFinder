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

MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("LyricFynder");
    const sample = { songName: "Ballin'", Artist: "Mustard ft. Roddy Rich"}
    dbo.collection("sample-test").findOne({}, function(err, res) {
      if (err) throw err;
      console.log(res.songName);
      console.log(res.Artist);
      db.close();
    });
  });
