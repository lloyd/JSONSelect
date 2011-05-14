(function() {
    var typePat = /string|boolean|null|array|object|number/;
    var lex = function (str, off) {
        if (off == undefined) off = 0;
        while (str.length > off) {
            switch(str.charCodeAt(off)) {
            // for simple 1 char tokens, we'll let them represent themselves.
            case 0x22: case 0x23: case 0x2a: case 0x2c:
            case 0x3a: case 0x3e: case 0x7e: 
                return [off+1, str.charAt(off)];
            // whitespace: space, nl, tab, cr, represented as the space char
            case 0x20: case 0x0a: case 0x0d: case 0x09:
                do { off++; } while (off < str.length && "\t\r\n ".indexOf(str.charAt(off)) !== -1);
                return [off, " "];
            default: 
                var m;
                // test for types
                if (m = typePat.exec(str.substr(off))) {
                    return [off + m[0].length, m[0]];
                }
                throw "unrecognized char in input";
            }
            // whitespace: space, nl, tab, cr

        }
    };

    // expose
    if (!window.JSONSelect) window.JSONSelect = {} ;

    window.JSONSelect.lex = lex;
})();
