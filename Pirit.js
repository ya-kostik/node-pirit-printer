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
 * @param [count] Count of rows
 * @returns {Pirit}
 */
Pirit.prototype.rollRow = function(count) {
  count = count || 1;
  return this.writeHex([0x14, parseInt(count)]);
};

/**
 * Add roll line command to buffer (0x15)
 * @param [count] Count of lines
 * @returns {Pirit}
 */
Pirit.prototype.rollLine = function(count) {
  count = count || 1;
  return this.writeHex([0x15, parseInt(count)]);
};

/**
 * Add slice paper command to buffer (0x19)
 * @returns {Pirit}
 */
Pirit.prototype.slice = function() {
  return this.write("\u0019");
};

/**
 * Combine save slice command and add it to buffer of commands
 * @returns {Pirit}
 */
Pirit.prototype.safeSlice = function() {
  return this.rollRow(8).slice();
};

/**
 * Add partialSlice paper command to buffer (0x1A)
 * @returns {Pirit}
 */
Pirit.prototype.partialSlice = function() {
  return this.write("\u001A");
};

/**
 * Combine save partial slice command and add it to buffer of commands
 * @returns {Pirit}
 */
Pirit.prototype.safePartialSlice = function() {
  return this.rollRow(8).partialSlice();
};

/**
 * Add to buffer Alarm command
 * @returns {Pirit}
 */
Pirit.prototype.signal = function() {
  return this.writeHex([0x1B, 0x07]);
};

/**
 * Set line spacing as height
 * @param [height]
 * @returns {Pirit}
 */
Pirit.prototype.setLineSpacing = function(height) {
  height = height || 1;
  return this.writeHex([0x33, height]);
};

/**
 * Set indent
 * @param nL
 * @param nH
 * @returns {Pirit}
 */
Pirit.prototype.setIndent = function(nL, nH) {
    return this.writeHex([0x1B, 0x5C, parseInt(nL), parseInt(nH)]);
}

Pirit.prototype.ALIGN_LEFT = 0.48;
Pirit.prototype.ALIGN_CENTER = 2.50;
Pirit.prototype.ALIGN_RIGHT = 1.49;

/**
 * Set align by one of the this types Pirit.prototype.ALIGN_LEFT, Pirit.prototype.ALIGN_RIGHT, Pirit.prototype.ALIGN_CENTER
 * @param [type]
 * @returns {Pirit}
 */
Pirit.prototype.align = function(type) {
    type = type || 0;
    return this.writeHex([0x1B, 0x61, type]);
}


module.exports = Pirit;
