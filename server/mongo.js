var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://35.235.89.251:27017/";
let ycy_wb = async function(url,code) {
	let client = await MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
	    if (err) 
	        throw err;
	    var dbo = db.db("hpday");
	    dbo.collection("wb").find({}).toArray(function(err, result) { // 返回集合中所有数据
		    if (err) 
		        throw err;
		    console.log(result);
		    db.close();
		    //return result;
	    });
	});
	console.log(client);
}

ycy_wb(url,"cod3");
// use admin
// db.createUser(
//   {
//     user: "best", //用户
//     pwd: "best", //密码
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] //权限
//   }
// )
// mongo --port 27017 -u "best" -p "best" --authenticationDatabase "admin"