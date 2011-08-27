function trim(s) { return s.replace(/^\s+/,'').replace(/\s+$/, ''); }
function lowerFirst(s) { return s.substr(0,1).toLowerCase() + s.substr(1); }
var fs = require('fs');


/* ================================================================
  Color
  An object for understanding and manipulating KSF color values
  =============================================================== */

exports.Color = function(ksfColorValue) { this.__init(ksfColorValue); };

(function(obj, undefined){

    obj.__init = function(ksfColorValue) {
        this.__ksf = ksfColorValue;
    };

    obj.toBGR = function() {
        return parseInt(this.__ksf);
    };

    obj.toHex = function() {
        var h = this.toBGR().toString(16);
        while (h.length < 6) { h = '0' + h; }
        return h;
    };

    obj.toRGB = function() {
        var h = this.toHex();
        var s2i = function(start) {
            return parseInt(h.slice(start, start + 2), 16);
        };

        return [s2i(0), s2i(2), s2i(4)];
    };

    obj.toHtmlHex = function() {
        return '#' + this.toHex();
    };

    obj.toHtmlRGB = function() {
        var rgb = this.toRGB();
        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    };

}(exports.Color.prototype));


/* ================================================================
  KomodoScheme
  An object for understanding Komodo theme files
  =============================================================== */

exports.Parser = function(config){ this.__init(config); };

(function(obj, undefined){

    obj.__init = function(config) {
        // config:
        //      rawData (string)
        //      path (string)

        this.booleans = {};
        this.commonStyles = {};
        this.languageStyles = {};
        this.miscLangSettings = {};
        this.colors = {};
        this.indicators = {};

        this.__background = null;
        this.__primaryColors = [];

        // Load from config if specified
        if (config.rawData !== undefined) {
            this.loadFromRawData(config.rawData);
        } else if (config.path !== undefined) {
            this.loadFromFile(config.path);
        }
    };


    obj.__parseV4 = function(data) {
        // Standardize linebreaks
        data = data.replace(/\r/g, '');

        // Split into sections
        var sections = data.split('\n\n');
        for (var i=0; i<sections.length; i++) {
            var c = sections[i].split('=');
            var name = trim(c[0]);
            name = lowerFirst(name);

            // Clean up props and => JSON
            var props = trim(c[1]);
            props = props.replace(/True/g, 'true').replace(/False/g, 'false').replace(/None/g, "''").replace(/'/g, '"');
            props = JSON.parse(props);

            // Store state and parse BGR into colors (where applicable)
            this[name] = props;
        }
    };


    obj.loadFromRawData = function(data) {
        // Regex out version
        var m = (/Version[ ]?=[ ]?([456])/i).exec(data);
        if (m[1]) {
            this.schemeVersion = parseInt(m[1], 10);
            data = trim(data.replace(m[0], ''));

            // Parse scheme if a known version
            if (this.schemeVersion === 4) {
                this.__parseV4(data);
            } else {
                throw "Unsupported scheme version '" + this.schemeVersion + "'";
            }
        }

        return this;
    };


    obj.loadFromFile = function(path) {
        return this.loadFromRawData(fs.readFileSync(path, 'utf8'));
    };

    obj.__getColor = function(val, format) {
        val = new exports.Color(val);
        return format === 'rgb' ? val.toHtmlRGB() : val.toHtmlHex();
    }

    obj.__propToCSS = function(name, val, format) {

        var t = typeof(val);
        if (t === 'string' || t === 'number') {
            switch(name.toLowerCase()) {
                case 'fore':
                    return 'color: ' + this.__getColor(val, format) + '; ';
                    break;
                case 'back':
                    return 'background-color: ' + this.__getColor(val, format) + '; ';
                    break;
                case 'bold':
                    return val === 1 ? 'font-weight: bold; ' : '';
                    break;
                case 'italic':
                    return val === 1 ? 'font-style: italic; ' : '';
                    break;
                case 'face':
                    return "font-family: '" + val + "'; ";
                    break;
                case 'size':
                    return 'font-size: ' + val + 'px; ';
                    break;
            }
        }
        return '';
    };

    obj.toCSS = function(format, language, prefix) {
        var css = '',
            styles = {};

        // Prep config
        prefix = prefix || '';
        language ? styles = this.languageStyles[language] : styles = this.commonStyles;
        if (format !== 'hex' && format !== 'rgb') { format = 'hex'; }
        if (!styles) { throw "Language '" + language + "' not found."; }

        // Iterate over styles, turning each into CSS
        for (var key in styles) {
            var s = '';
                item = styles[key];

            if (typeof(item) === 'object') {
                for (var prop in item) {
                    s += this.__propToCSS(prop, item[prop], format);
                }
                if (s.length > 0) {
                    css += prefix + '.ksf-' + key.replace(/ |_/g, '-') + ' { ' + s + ' }\n';
                }
            }
        }

        // Build common styles if not doing language-specific CSS
        if (language === undefined || language.length === 0) {
            // .ksf-common
            if (this.booleans.preferFixed) {
                css = css.replace(/.ksf-default-fixed/i, '.ksf-common');
            } else {
                css = css.replace(/.ksf-default-proportional/i, '.ksf-common');
            }
            // Selected style
            if (this.colors.selBack || this.colors.selFore) {
                css += prefix + '.ksf-selected { ';
                if (this.colors.selFore) {css += 'color: ' + this.__getColor(this.colors.selFore) + '; '; }
                if (this.colors.selBack) {css += 'background-color: ' + this.__getColor(this.colors.selBack) + '; '; }
                css += '}';
            }
        }

        return css;
    };

}(exports.Parser.prototype));
