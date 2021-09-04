const { MongoClient } = require("mongodb");
const tbot_password = require("../ttrack_password/ttrack_password");
const uri = `mongodb+srv://leon:${tbot_password}@sprint3.05fm9.mongodb.net/sprint3?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// client.connect(err => {
//     if(err) throw err
//     const collection = client.db("sprint3").collection("ttrack")
//     let username = 'leon'
//     let query = { username: username}
//     collection.find(query).toArray(function (err, result) {
//         if(err) throw err;
//         if(result.length > 0) {
//             console.log('Username already exists! Please log in or choose a different username.')
//         }
//         client.close();
//     });

// });

module.exports = client;
