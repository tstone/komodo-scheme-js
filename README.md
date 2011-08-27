Parse Komodo Edit/IDE Scheme files in Node.js

Usage
------

    var KomodoScheme = require('komodo-scheme').Parser;
    
    var scheme = new KomodoScheme();
    scheme.loadFromFile('/path/to/Scheme.ksf');
    console.log(scheme.toCSS());

Running Tests
------

    $ bash test.sh