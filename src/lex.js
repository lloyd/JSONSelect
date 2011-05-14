(function() {
    var lex = function (str, off) {
        if (off == undefined) off = 0;
        while (str.length > off) {
            switch(str.charCodeAt(off)) {
            // for simple 1 char tokens, we'll let them represent themselves.
            case 0x22: case 0x23: case 0x2a: case 0x2c:
            case 0x3a: case 0x3e: case 0x7e: 
                return [off+1, str.charAt(off)];
            default:
                throw "unrecognized char in input";
            }
        }
    };

    // expose
    if (!window.JSONSelect) window.JSONSelect = {} ;

    window.JSONSelect.lex = lex;
})();
