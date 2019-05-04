const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

// const dynamoDB = new AWS.DynamoDB();

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.put(
//   {
//     TableName: "training_demo",
//     Item: {
//       user_id: "Nain",
//       timestamp: 23423423,
//       title: "updataed"
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

// docClient.update(
//   {
//     TableName: "training_demo",
//     Key: {
//       user_id: "Nain",
//       timestamp: 23423423
//     },
//     UpdateExpression: "set #t = :t",
//     ExpressionAttributeNames: {
//       "#t": "title"
//     },
//     ExpressionAttributeValues: {
//       ":t": "UpdatedTim"
//     }
//   },
//   () => {}
// );
// (async function listTables() {
//   try {
//     dynamoDB.listTables((err, data) => {
//       if (err) {
//         throw new Error(
//           "There is some problem while fetching the list of tables"
//         );
//       } else {
//         console.log(data);
//       }
//     });
//   } catch {
//     console.log("There is Some error");
//   }
// })();
//
// docClient.delete(
//   {
//     TableName: "training_demo",
//     Key: {
//       user_id: "Nain",
//       timestamp: 23423423
//     }
//   },
//   () => {}
// );

// docClient.batchWrite(
//   {
//     RequestItems: {
//       'training_demo': [
//         {
//           DeleteRequest:{
//             Key:{
//               user_id: "4300fsaf03",
//               timestamp: 1556364695135
//             }
//           }
//         },
//         {
//           PutRequest: {
//             Item: {
//               user_id: "Nain",
//               timestamp: 23423423,
//               title: "This is from  wirte"
//             }
//           }
//         }
//       ]
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
