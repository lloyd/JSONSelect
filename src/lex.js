(function() {
    var w = window;
    if (!w.JSONSelect) w.JSONSelect = {} ;

    var jsonParse = (window.JSON ? window.JSON.parse : window.eval);

    var toks = w.JSONSelect._toks = {
        psc: 1, // pseudo class
        psf: 2, // pseudo class function
        typ: 3, // type
        str: 4, // string
    };

    var typePat = /^(?:string|boolean|null|array|object|number)/;
    var psuedoClassPat = /^(?:root|first-child|last-child|only-child)/;
    var jsonStrPat = /^(?:\"(?:[^\\]|\\[^\"])*\")/;
    var identPat = /^(?:[_a-zA-Z]|[^\0-\0177]|\\[^\r\n\f0-9a-fA-F])(?:[_a-zA-Z0-9-]|[^\u0000-\u0177]|(?:\\[^\r\n\f0-9a-fA-F]))*/;
    var lex = function (str, off) {
        if (off == undefined) off = 0;
        while (str.length > off) {
            switch(str.charCodeAt(off)) {
            // for simple 1 char tokens, we'll let them represent themselves.
            case 0x23: case 0x2a: case 0x2c:
            case 0x3e: case 0x7e:
                return [off+1, str.charAt(off)];
            // whitespace: space, nl, tab, cr, represented as the space char
            case 0x20: case 0x0a: case 0x0d: case 0x09:
                do { off++; } while (off < str.length && "\t\r\n ".indexOf(str.charAt(off)) !== -1);
                return [off, " "];
            // colon ':' indicates psuedo class
            case 0x3a:
                var m;
                var ss = str.substr(off+1);
                if (m = psuedoClassPat.exec(ss)) {
                    return [off + 1 + m[0].length, toks.psc, ":" + m[0]];
                } else if (false) {
                    throw "psuedo class functions not yet supported";
                }
                throw "unrecognized psuedo class";
            // quote '"' indicates embedded JSON string
            case 0x22:
                var m;
                if (m = jsonStrPat.exec(str.substr(off))) {
                    try {
                        // using JSON parsing directly here is bad, it kills our
                        // portability.  Can we safely use eval considering we know
                        // this is a value enclosed in quotes?
                        return [off + m[0].length, toks.str, jsonParse(m[0])];
                    } catch(e) {
                        throw "invalid json string";
                    }
                }
                throw "unclosed json string";
            default:
                var m;
                var ss = str.substr(off);
                // test for types
                if (m = typePat.exec(ss)) {
                    return [off + m[0].length, toks.typ, m[0]];
                }
                // test for idents
                else if (m = identPat.exec(ss)) {
                    return [off + m[0].length, toks.str, m[0].replace(/\\([^\r\n\f0-9a-fA-F])/g,"$1")];
                }
                throw "unrecognized char";
            }
        }
    };

    w.JSONSelect._lex = lex;
})();
