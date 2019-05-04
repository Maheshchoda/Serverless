const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.update(
  {
    TableName: "training_demo",
    Key: {
      user_id: "2342jie232",
      timestamp: 1556364896194
    },
    UpdateExpression: "set #v = #v + :incr",
    ExpressionAttributeNames: {
      "#v": "views"
    },
    ExpressionAttributeValues: {
      ":incr": 1
    }
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);
