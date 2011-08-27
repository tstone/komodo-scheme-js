var Parser = require('komodo-scheme').Parser;

describe('KomodoScheme.Parser', function() {

    it ('can read files off of disk', function(){
        var p = new Parser({ path: __dirname + '/zenburn.ksf' });
        // expect(p.schemeVersion).toEqual(4);
    });

});