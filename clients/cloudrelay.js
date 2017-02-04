var mqtt = require('mqtt')

var homeclient  = mqtt.connect('mqtt://zerohub:1883')
var cloudclient = mqtt.connect('mqtt://www.djroboplant.site:1883')

homeclient.on('connect', function () {
  client.subscribe('*/reading')
  setInterval(()=>{
    getReading()
  }, 5000)
})
 
cloudclient.on('connect', function() {
  client.subscribe('*/command')
  
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
