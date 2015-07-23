/**
 * Created by Constantin on 20.07.15.
 */
var serialport = require('serialport');
var Pirit = require("./Pirit");
var SerialPort = serialport.SerialPort;

//TODO: add some documentation, what a hell is going on here
var connect = function (port, cb) {
  var com = port.comName;
  var comPort = new SerialPort(com);
  this.port = comPort;
  comPort.on("open", cb.bind(this));
};

var afterConnect = function(err) {
  if (err) return this.after(err);
  this.after(null, new Pirit(port))
};

module.exports = function(cb) {
  var self = {};
  self.after = cb;
  serialport.list(function (err, ports) {
    var i = ports.length;
    var port;
    while(i--) {
      port = ports[i];
      if (port.manufacturer == "STMicroelectronics.") {
        connect(port, afterConnect.bind(self));
        break;
      }
    }
  });
};