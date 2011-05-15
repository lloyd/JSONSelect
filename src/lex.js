(function() {
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
            case 0x3a:
                var m;
                var ss = str.substr(off+1);
                if (m = psuedoClassPat.exec(ss)) {
                    return [off + 1 + m[0].length, ":" + m[0]];
                } else if (false) {
                    // XXX: pseudo functions
                }
                throw "unrecognized psuedo class";
            case 0x22:
                var m;
                if (m = jsonStrPat.exec(str.substr(off))) {
                    try {
                        // XXX: we need numeric token codes
                        return [off + m[0].length, 0, JSON.parse(m[0])];
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
                    return [off + m[0].length, m[0]];
                }
                // test for idents
                else if (m = identPat.exec(ss)) {
                    return [off + m[0].length, 0, m[0].replace(/\\([^\r\n\f0-9a-fA-F])/g,"$1")];
                }
                throw "unrecognized char";
            }
            // whitespace: space, nl, tab, cr

        }
    };

    // expose
    if (!window.JSONSelect) window.JSONSelect = {} ;

    window.JSONSelect.lex = lex;
})();
