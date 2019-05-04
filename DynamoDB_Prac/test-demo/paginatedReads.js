const async = require("async");
const _ = require("underscore");

const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

//doWhilst:- It take three parameters
//1.Iterate (takes callback as a parameter, it is an asynchronous
//           function that is always executed first time and then
//           it is executed again if the truth test passes)
//2.truthTest(synchronous truth test the function is going to Iterate
//            as long as it return a boolean value true).
//3.callback (It is called after the truth test return false)

let startKey = [];
let results = [];
let pages = 0;

async.doWhilst(
  //Iteratee
  callback => {
    let params = {
      TableName: "subscriptions",
      Limit: 30
    };

    if (!_.isEmpty(startKey)) {
      params.ExclusiveStartKey = startKey;
    }
    docClient.scan(params, (err, data) => {
      if (err) {
        console.log(err);
        callback(err, {});
      } else {
        if (typeof data.LastEvaluatedKey !== "undefined") {
          startKey = data.LastEvaluatedKey;
        } else {
          startKey = [];
        }

        if (!_.isEmpty(data.Items)) {
          results = _.union(results, data.Items); //union function combines the two arrays
        }
        pages++;

        callback(null, results);
      }
    });
  },
  //truthTest
  () => {
    if (_.isEmpty(startKey)) {
      return false;
    } else {
      return true;
    }
  },
  //callback
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      console.log("ItemCount", data.length);
      console.log("Pages", pages);
    }
  }
);
