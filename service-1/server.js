// server.js
console.log('May Node be with you');
const express = require('express');
const app = express();
const ampq = require('amqplib');
var connection, channel;
connect();
async function connect (){
    try{
        const ampqserver="amqp://localhost:5672";
        connection= await ampq.connect(ampqserver);
        channel = await connection.createChannel();
        await channel.assertQueue('rabbit');

    } catch(err){
        console.log(err);
    }

}

app.get('/send',(req,res) => {
  const fakedata={
    name: "vedant",
    company : "spaceX"
  };
  channel.sendToQueue("rabbit",Buffer.from(JSON.stringify(fakedata)));
  // await channel.close();
  // await connection.close();  
  return res.send("Done");
}) 


app.listen(5001, function () {
    console.log('listening on 5001');
  });


app.get('/',(req, res) => {
    //res.send('Hello World')
    res.sendFile(__dirname + '/index.html');
        // Note: __dirname is the current directory you're in. Try logging it and see what you get!
      
    });
