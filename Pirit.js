/**
 * Created by Constantin on 20.07.15.
 */
var encoder = require('node-cp866buffer').encode;

var defaultCallback = function(err) {
  if (err) throw new Error(err);
};

/**
 * Constructor for Pirit Printer Api
 * @param {SerialPort} port
 * @constructor
 */
var Pirit = function(port) {
  this.port = port;
  this.buffer = [];
};

/**
 * Callback for send command
 * @callback piritCallback
 * @param {Error} err
 * @param {Pirit} pirit
 */

/**
 * Send buffer of commands to printer
 * @param {piritCallback} [cb]
 */
Pirit.prototype.send = function(cb) {
  cb = cb || defaultCallback;
  var buffer = Buffer.concat(this.buffer);
  this.buffer = [];
  var self = this;
  this.port.write(buffer, function (err, data) {
    if (err) return cb(err);
    //TODO: remove all logs
    console.log(data);
    cb(null, self);
  });
};

/**
 * Only Error Callback
 * @callback errCallback
 * @param {Error} err
 */

/**
 * Close connect to printer
 * @param {errCallback} [cb]
 */
Pirit.prototype.close = function(cb) {
  cb = cb || defaultCallback;
  this.port.close(function (err) {
    if (err) return cb(err);
    cb();
  });
};

/**
 * Send buffer of command to printer and clean printer memory
 * @param {piritCallback} [cb]
 */
Pirit.prototype.sendAndClean = function(cb) {
  cb = cb || defaultCallback;
  this.clean().send(cb);
};

/**
 * Send buffer of command to printer and close port connection
 * @param {errCallback} [cb]
 */
Pirit.prototype.sendAndClose = function(cb) {
  cb = cb || defaultCallback;
  this.clean().send(function(err, port) {
    if (err) return cb(err);
    port.close(cb);
  });
};

/**
 * Add hex commands to buffer of commands
 * @param {Array} commands
 * @returns {Pirit}
 */
Pirit.prototype.writeHex = function(commands) {
  this.buffer.push(new Buffer(commands));
  return this;
};

/**
 * Encode text to CP866 and add it to buffer of commands
 * @param {String} [text]
 * @returns {Pirit}
 */
Pirit.prototype.write = function(text) {
  text = text || "";
  this.buffer.push(encoder(text));
  return this;
};

/**
 * Add to text "\n" and encode it to CP866, next add it to buffer of commands
 * @param {String} [text]
 * @returns {Pirit}
 */
Pirit.prototype.writeLine = function(text) {
  text = text || "";
  return this.write(text + "\n");
};

/**
 * Add print command (0x17) to command buffer
 * @returns {Pirit}
 */
Pirit.prototype.echo = function() {
  return this.write("\u0017");
};

/**
 * Add clean command to printer buffer
 * @returns {Pirit}
 */
Pirit.prototype.clean = function() {
  return this.write("\u0010");
};

/**
 * Add roll row command to buffer (0x14)
 * @param count Count of rows
 * @returns {Pirit}
 */
Pirit.prototype.rollRow = function(count) {
  return this.writeHex([0x14, parseInt(count)]);
};

/**
 * Add roll line command to buffer (0x15)
 * @param count Count of lines
 * @returns {Pirit}
 */
Pirit.prototype.rollLine = function(count) {
  return this.writeHex([0x15, parseInt(count)]);
};

/**
 * Add slice paper command to buffer (0x19)
 * @returns {Pirit}
 */
Pirit.prototype.slice = function() {
  return this.write("\u0019");
  //return this.writeHex([0x1B, 0x69]);
};

/**
 * Add partialSlice paper command to buffer (0x1A)
 * @returns {Pirit}
 */
Pirit.prototype.partialSlice = function() {
  return this.write("\u001A");
  //return this.writeHex([0x1B, 0x6D]);
};


module.exports = Pirit;





