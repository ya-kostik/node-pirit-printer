# Pirit Printer Node.js API
Node.JS API for Pirit printers


## Overview

Pirit is roll printer using for printing cash receipt.

For connection to working horses it use COM Port or USB Type A (USB use virtual COM Port driver to communicate with printer)


## Install

```
$ npm i node-pririt-printer --save
```


## Using

```
#!JavaScript
var connect = require('pirit').connect;

connect(function(err, pirit) {
if (err) return console.error(err);
  pirit
    //wrote some text
    .writeLine("Оно может сцепляться")
    .writeLine("Можно напечатать много всего инетересного, но не по теме")
    .writeLine("Ножик будет резать неправильно, если не отмотать 4 или 8 строк перед вызовом partialSlice или Slice")
    .writeLine("Так как каждый раз Pirit отрезал по линии")
    //When we want slice paper, we need roll 4 or more rows
    .rollRow(8)
    //And slice after print and roll
    .partialSlice()
    .writeLine("Потом опять что-то печатать")
    .writeLine("Потом опять что-то печатать")
    .writeLine("Потом опять что-то печатать")
    .safeSlice()
    //When we done with commands, we can use send, sendAndClean or sendAndClose to send buffer to Pirit Printer
    .sendAndClose();
});
```

When you call connect function, it trying find Pirit Printer as COM device. When connect was opened it call callback function and set as second argument object of Pirit constructor.

After all you can use Pirit API


## TODO Methods

To see methods documentation use ”jsdoc“ generator.
