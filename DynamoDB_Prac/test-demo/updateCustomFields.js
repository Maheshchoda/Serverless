const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const subscription_id = "1593706000000067111";
const paramsName = "amount";
const paramsValue = "1234121";

docClient.update(
    {
        TableName: "subscriptions",
        Key: {
            subscription_id
        },
        UpdateExpression: "set " + paramsName + " = :v ",
        ExpressionAttributeValues: {
            ":v": paramsValue
        },
        ReturnValues: "ALL_NEW"
    },
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    }
);
