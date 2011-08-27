var Color = require('komodo-scheme').Color;

describe('KomodoScheme.Color', function() {

    it ('accepts a BGR value and renders it into RGB and hex', function(){
        // White
        var color = new Color('16777215');
        expect(color.hex).toEqual('ffffff');
        expect(color.rgb).toEqual([255,255,255]);
        // Some other random color
        color = new Color('7872391');
        expect(color.hex).toEqual('781f87');
        expect(color.rgb).toEqual([120,31,135]);
    });

});