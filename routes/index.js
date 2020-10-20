var express = require('express');
var router = express.Router();
let mongodb = require("mongodb");
let mongoClient=mongodb.MongoClient;



let url = "mongodb+srv://pswd123:wI8aD6bxgryMg0eg@zencluster.y8kfe.mongodb.net/?retryWrites=true&w=majority";




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/read', async function(req, res, next) {
  try{
    let client = await mongoClient.connect(url);

  let db = client.db("zen");
  let list = await db.collection("userform").find().toArray();
  client.close();
  res.json(list)
}
catch(err){
  console.log(err);
}



})

router.post("/insert", async function (req, res) {
  try {let client = await mongoClient.connect(url);
  let db = client.db("zen");
  let insertedList = await db.collection("userform").insertOne(req.body )
  client.close();
  res.json({
    message: "created",
    id: insertedList.insertedId

  })}
  catch(err){
    console.log(err);
  }


})




module.exports = router;
