
/* ================================================================
  KSFColor
  An object for understanding and manipulating KSF color values
  =============================================================== */


exports.KSFColor = function(ksfColorValue) { this.init(ksfColorValue); };

(function(obj, undefined){

    obj.init = function(ksfColorValue) {
        this.hex = '';
        this.rgb = [];
        this.bgr = ksfColorValue || 0;

        if (ksfColorValue !== undefined) {
            this.loadKsfColor(ksfColorValue);
        }
    };

    obj.loadKsfColor = function(val) {
        // KSF color values are represented as
        // BGR (RGB backwards), but using base 10 values

        val = parseInt(val, 10);
        if (!val) {
            this.hex = '000000';
            this.rgb = [0,0,0];
            this.bgr = 0;
        } else {
            // Convert to hex and verify minimum length
            var h = val.toString(16);
            while (h.length < 6) { h = '0' + h; }

            // Slice to int
            var s2i = function(start) {
                return parseInt(h.slice(start, start + 2), 16);
            };

            // Store state values
            this.rgb = [s2i(0), s2i(2), s2i(4)];
            this.hex = h;
            this.bgr = val;
        }
    };

    obj.toHtmlHex = function() {
        return '#' + this.hex;
    };

}(exports.KSFColor.prototype));