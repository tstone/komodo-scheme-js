Parse Komodo Edit/IDE Scheme files in Node.js

Usage
------

    var KomodoScheme = require('komodo-scheme').Parser;

    var scheme = new KomodoScheme({ path: '/path/to/Scheme.ksf' });
    console.log(scheme.toCSS());

    // Outputs:
    // .ksf-attribute-name { color: #781f87; }
    // .ksf-bracebad { background-color: #3f3f3f; font-weight: bold; color: #9090c6 }
    // ... etc ...

    // Language-Specific CSS:
    console.log(scheme.toCSS('hex', 'Django'));

    // CSS color values as RGB:
    console.log(scheme.toCSS('rgb'));

    // Custom prefix before each selector:
    console.log(scheme.toCSS('rgb', '', '#preview'));

    // Or, individual scheme attributes can be accessed through a hash:
    console.log(scheme.commonStyles.strings.fore);

    // Also included is a Color class which provides parsing of the BGR color
    // into several formats
    var Color = require('komodo-scheme').Color;
    var c = new Color(scheme.commonStyles.strings.fore);

    console.log(c.toRGB());
    // outputs:  [144,144,198]

    console.log(c.toHtmlRGB());
    // outputs:  'rgb(144,144,198)'

    console.log(c.toHtmlHex());
    // outputs:  '#9090c6'

Running Tests
------

    $ bash test.sh
