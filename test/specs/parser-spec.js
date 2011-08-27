var Parser = require('komodo-scheme').Parser;

describe('KomodoScheme.Parser', function() {

    var p = new Parser({ path: __dirname + '/zenburn.ksf' });

    it ('can read files off of disk', function(){
        expect(p.schemeVersion).toEqual(4);
    });

    it ('outputs CSS', function(){
        expect(p.toCSS()).toMatch(/.ksf-[a-z-]+ {[^}]+color:/i);
    });

    it ('outputs language-specific CSS', function(){
        expect(p.toCSS('rgb', 'Django')).toMatch(/.ksf-[a-z-]+ {[^}]+color:/i);
    });

});
