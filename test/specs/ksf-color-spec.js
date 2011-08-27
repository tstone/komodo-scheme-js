

describe('KSFColor', function() {

    it ('Accepts a BGR value and renders it into RGB and hex', function(){
        // White
        var color = new KSFColor('16777215');
        expect(color.hex).toEqual('ffffff');
        expect(color.rgb).toEqual([255,255,255]);
        // Some other random color
        color = new KSFColor('7872391');
        expect(color.hex).toEqual('781f87');
        expect(color.rgb).toEqual([120,31,135]);
    });

});