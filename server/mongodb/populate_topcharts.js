var MongoClient = require('mongodb').MongoClient;
require('dotenv').config(); //set env
const uri = process.env.DB;
const getTopCharts = require('../getTopCharts');

async function populate_topcharts() {
    datetime = new Date();
    date = datetime.toISOString().slice(0,10);
    col = `TopCharts-${date}`; 

    try {
        charts = await getTopCharts.getBillboard()
    }
    catch {
        console.log("Scrapping error")
        return null
    }
    
    console.log('Billboard Data Collected');

    MongoClient.connect(uri, function(err,db){
        if (err) throw err;
        var dbo = db.db('LyricFynder');
        dbo.createCollection(col, function(err,res){
            if (err) throw err;
            console.log(`Collection ${col} Created!`);
        });

        dbo.collection(col).insertMany(charts, function(err,res){
            if (err) throw err;
            console.log(`${res.insertedCount} insertions occured successfully`)
        });

        db.close();
    });

    console.log(`Topcharts for ${date} have been populated.`)
    
}

populate_topcharts()
