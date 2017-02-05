var mqtt = require('mqtt')

var client  = mqtt.connect('wss://djroboplant.site:8083', {username: 'walter', password: 'isfremides'})
 

client.on('connect', function () {
  var newcolor = {
    pattern: [
      {red: 127, green: 0, blue: 127}
    ]
  }

  client.publish('test', JSON.stringify(newcolor))
  client.publish('test', 'This is another test')
  client.publish('test', 'And another')
  client.end()
})
 

//      {red: 127, green: 0, blue: 127},
//      {red: 0, green: 127, blue: 127},
//      {red: 127, green: 127, blue: 127}
