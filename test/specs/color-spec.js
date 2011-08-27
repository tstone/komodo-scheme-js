var Color = require('komodo-scheme').Color;

describe('KomodoScheme.Color', function() {
    
    var white = new Color('16777215');
    var purple = new Color('7872391');

    it ('should return as a hex', function(){
        expect(white.toHex()).toEqual('ffffff');
        expect(white.toHtmlHex()).toEqual('#ffffff');
        
        expect(purple.toHex()).toEqual('781f87');
        expect(purple.toHtmlHex()).toEqual('#781f87');
    });
    
    it ('should return as rgb', function(){
        expect(white.toRGB()).toEqual([255,255,255]);
        expect(white.toHtmlRGB()).toEqual('rgb(255,255,255)');
        
        expect(purple.toRGB()).toEqual([120,31,135]);
        expect(purple.toHtmlRGB()).toEqual('rgb(120,31,135)');
    });
    

    /* it ('accepts a BGR value and renders it into RGB and hex', function(){
        // White
        var color = 
        expect(color.hex).toEqual('ffffff');
        expect(color.rgb).toEqual([255,255,255]);
        // Some other random color
        color = 
        expect(color.hex).toEqual('781f87');
        expect(color.rgb).toEqual([120,31,135]);
    }); */

});