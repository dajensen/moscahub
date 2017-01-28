var mosca = require('mosca');
var http = require("http");
var connect = require("connect")
var serveStatic = require('serve-static')

function setHeaders(res, path) {
  res.setHeader("Access-Control-Allow-Origin", "*")
}
var app = connect()
    .use(serveStatic('./public', 
      {
        'index': ['index.html', 'index.htm'],
        setHeaders: setHeaders
      }))

var httpServ = http.createServer(app);

var settings = {
  port: 1883,
  backend: {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'myCollections',
    mongo: {}
  }
};

var mqttServ = new mosca.Server(settings);

mqttServ.attachHttpServer(httpServ);

httpServ.listen(3000);

console.log("Starting");


var lampcolor = {red: 0, green: 127, blue: 0};
var garagedoor = {};


mqttServ.on('ready', setup);
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
 
// fired whena  client is connected
mqttServ.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});
 
// fired when a message is received
mqttServ.on('published', function(packet, client) {

  if(client)
  {
    console.log("Got a message from " + client.id + " on topic: " + packet.topic);
//    console.log("Client: ");
//    console.dir(client);
//    console.log("Packet: ");
//    console.dir(packet);

    var publish_color = false;
    if(packet.topic == 'rgblamp/present') {
      publish_color = true;
    }

    if(packet.topic == 'rgblamp/newcolor') {
      lampcolor = JSON.parse(packet.payload);
      console.dir(lampcolor);
      publish_color = true;
    }

    var publish_garagedoor_status = false;
    if(packet.topic == 'garagedoor/present') {
      console.log("Garage door is present");
//      console.dir(JSON.parse(packet.payload));
    }

    if(packet.topic == 'garagedoor/status') {
      publish_garagedoor_status = true;
      garagedoor = JSON.parse(packet.payload);
      console.log("Got garagedoor status");
      console.dir(garagedoor);
    }

    if(publish_color)
    {
      var newPacket = {
        topic: 'rgblamp/color',
        payload: JSON.stringify(lampcolor),
        retain: false,
        qos: 0
      };

      mqttServ.publish(newPacket, function() {
        console.log("Sent Color Message");
      });
    }

  }  
});
 
// fired when a client subscribes to a topic
mqttServ.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
});
 
// fired when a client subscribes to a topic
mqttServ.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed : ', topic);
});
 
// fired when a client is disconnecting
mqttServ.on('clientDisconnecting', function(client) {
  console.log('clientDisconnecting : ', client.id);
});
 
// fired when a client is disconnected
mqttServ.on('clientDisconnected', function(client) {
  console.log('clientDisconnected : ', client.id);
});

console.log("At the end");
