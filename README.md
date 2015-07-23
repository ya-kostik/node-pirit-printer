#Pirit

## Overview

Pirit is roll printer using for printing cash receipt.

For connection to working horses it use COM Port or USB Type A (USB use virtual COM Port driver to communicate with printer)


## Install

Just copy this repo to your project directory and require like Node.JS module

```
$ git clone https://nekogda@bitbucket.org/nekogda/pirit-printer.git
```


## Using

```
#!JavaScript
var connect = require('pirit').connect;

connect(function(err, pirit) {
if (err) return console.error(err);
  pirit
    //wrote some text
    .writeLine("РћРЅРѕ РјРѕР¶РµС‚ СЃС†РµРїР»СЏС‚СЊСЃСЏ")
    .writeLine("РњРѕР¶РЅРѕ РЅР°РїРµС‡Р°С‚Р°С‚СЊ РјРЅРѕРіРѕ РІСЃРµРіРѕ РёРЅРµС‚РµСЂРµСЃРЅРѕРіРѕ, РЅРѕ РЅРµ РїРѕ С‚РµРјРµ")
    .writeLine("РќРѕР¶РёРє Р±СѓРґРµС‚ СЂРµР·Р°С‚СЊ РЅРµРїСЂР°РІРёР»СЊРЅРѕ, РµСЃР»Рё РЅРµ РѕС‚РјРѕС‚Р°С‚СЊ 4 РёР»Рё 8 СЃС‚СЂРѕРє РїРµСЂРµРґ РІС‹Р·РѕРІРѕРј partialSlice РёР»Рё Slice")
    .writeLine("РўР°Рє РєР°Рє РєР°Р¶РґС‹Р№ СЂР°Р· Pirit РѕС‚СЂРµР·Р°Р» РїРѕ Р»РёРЅРёРё")
    //When we want slice paper, we need roll 4 or more rows
    .rollRow(8)
    //And slice after print and roll
    .partialSlice()
    .writeLine("РџРѕС‚РѕРј РѕРїСЏС‚СЊ С‡С‚Рѕ-С‚Рѕ РїРµС‡Р°С‚Р°С‚СЊ")
    .writeLine("РџРѕС‚РѕРј РѕРїСЏС‚СЊ С‡С‚Рѕ-С‚Рѕ РїРµС‡Р°С‚Р°С‚СЊ")
    .writeLine("РџРѕС‚РѕРј РѕРїСЏС‚СЊ С‡С‚Рѕ-С‚Рѕ РїРµС‡Р°С‚Р°С‚СЊ")
    .rollRow(8)
    .slice()
    //When we done with commands, we can use send, sendAndClean or sendAndClose to send buffer to Pirit Printer
    .sendAndClose();
});
```

When you call connect function, it trying find Pirit Printer as COM device. When connect was opened it call callback function and set as second argument object of Pirit constructor.

After all you can use Pirit API


## Methods

To see methods documentation see [Methods page](https://bitbucket.org/nekogda/pirit-printer/wiki/Methods) or use вЂќjsdocвЂњ 3 generator.