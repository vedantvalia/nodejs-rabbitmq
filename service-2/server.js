// server.js
console.log('May Node be with you');
const express = require('express');
const app = express();
const ampq = require('amqplib');
connect();
var connection, channel 
async function connect (){
    try{
        const ampqserver="amqp://localhost:5672";
        connection= await ampq.connect(ampqserver);
        channel = await connection.createChannel();
        await channel.assertQueue('rabbit');

        channel.consume('rabbit',data=>{
            console.log(`Recieved ${Buffer.from(data.content)}`);

        }, {
            noAck: true
        });

    } catch(err){
        console.log(err);
    }

}
app.listen(5002, function () {
    console.log('listening on 5002')
  })

app.get('/send',(req,res) => {
    res.send("Hello world")
})  


app.get('/',(req, res) => {
    //res.send('Hello World')
    res.sendFile(__dirname + '/index.html')
        // Note: __dirname is the current directory you're in. Try logging it and see what you get!
      
    })
