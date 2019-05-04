const AWS = require('aws-sdk');
AWS.config.update({
  region: "ap-south-1"
})
const dynamoDB = AWS.DynamoDB();

const params = {
  TableName: "Movies",
  KeySchema:[
    {AttributeName: "year", KeyType: "HASH"},
    {AttributeName: "title", keyType:"RANGE"}
  ],
  AttributeDefinitions:[
    {AttributeName: "year", AttributeType:"N"},
    {AttributeName: "title", keyType: "S"}
  ],
  ProvisionedThroughput:{
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
}

//creating a Table
dynamoDB.createTable(params, function(err, data){
  if(err){
    console.log("Error, unable to create Table", JSON.stringify(err, null, 2))
  }else{
    console.log("Sucessfully created Table", JSON.stringify(data, null, 2));
  }
})

//loading the sample data from movieData.json and put in another table

const allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf-8'))

allMovies.forEach(function(movie){
  const params = {
    TableName: "Movies",
    Item:{
      "year": movie.year,
      "title": movie.title,
      "info": movie.info
    }
  }

  docClient.put(params, function(err, data){
    if(err){
      console.log(err)
    }else{
      console.log(data);
    }
  })
});

//creating a new Item
const params = {
    TableName:table,
    Item:{
        "year": year,
        "title": title,
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});

//read an item

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});

//update an Item

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
