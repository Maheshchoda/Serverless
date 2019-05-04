const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.get(
//   {
//     TableName: "training_demo",
//     Key: {
//       user_id: "2342jie232",
//       timestamp: 1556364896194
//     }
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// docClient.query(
//   {
//     TableName: "subscriptions",
//     Index: "customer_id-updated_time-index",
//     KeyConditionExpression: "customer_id = :cusid",
//     ExpressionAttributeValues: {
//       ":cusid": "1593706000000067044"
//     }
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// docClient.scan(
//   {
//     TableName: "training_demo",
//     FilterExpression: "title = :title",
//     ExpressionAttributeValues: {
//       ":title": "dummyNote"
//     }
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );
