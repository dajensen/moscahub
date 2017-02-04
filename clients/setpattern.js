var mqtt = require('mqtt')

var client  = mqtt.connect('mqtt://zerohub:1883')
 

client.on('connect', function () {
  var newcolor = {
    pattern: [
      {red: 127, green: 0, blue: 127}
    ]
  };
  client.publish('plid/pattern', JSON.stringify(newcolor))
  client.end()
})
 

//      {red: 0, green: 0, blue: 0},
//      {red: 0, green: 0, blue: 127},
//      {red: 127, green: 0, blue: 0},
//      {red: 0, green: 127, blue: 0},
//      {red: 127, green: 127, blue: 0},
//      {red: 127, green: 0, blue: 127},
//      {red: 0, green: 127, blue: 127},
//      {red: 127, green: 127, blue: 127}
