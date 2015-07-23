var connect = require('./connect');

module.exports = {
  connect: connect
};

/**
 * @example {Function} connect
 *
 * connect(function(err, pirit) {
 *   if (err) return console.log(err);
 *   pirit
 *     //wrote some text
 *     .writeLine("Оно может сцепляться")
 *     .writeLine("Можно напечатать много всего инетересного, но не по теме")
 *     .writeLine("Ножик будет резать неправильно, если не отмотать 4 или 8 строк перед вызовом partialSlice или Slice")
 *     .writeLine("Так как каждый раз Pirit отрезал по линии")
 *     //When we want slice paper, we need roll 4 or more rows
 *     .rollRow(8)
 *     //And slice after print and roll
 *     .partialSlice()
 *     .writeLine("Потом опять что-то печатать")
 *     .writeLine("Потом опять что-то печатать")
 *     .writeLine("Потом опять что-то печатать")
 *     .rollRow(8)
 *     .slice()
 *     //When we done with commands, we can use send, sendAndClean or sendAndClose to send buffer to Pirit Printer
 *   .sendAndClose();
 * });
 */