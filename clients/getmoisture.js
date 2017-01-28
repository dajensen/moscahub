var mqtt = require('mqtt')

var client  = mqtt.connect('mqtt://zerohub:1883')
 

client.on('connect', function () {
  client.subscribe('roboplant/reading')
  setInterval(()=>{
    getReading()
  }, 5000)
})
 
client.on('message', function (topic, message) {
  // message is Buffer, so need to call toString() 
  console.log(message.toString())
//  client.end()
})

function getReading() {
  var newcolor = {red: 0, green: 0, blue: 127};
  client.publish('roboplant/read', JSON.stringify(newcolor))
}
