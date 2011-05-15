(function() {
    var lex = JSONSelect._lex;
    var parse = function (str) {
        var off = 0;
        var ar = [];
        while (off < str.length) {
            var x = lex(str, off);
            off = x[0];
            ar.push(x.length > 2 ? x.slice(1) : x[1]);
        }
        return ar;
    };

    // expose
    if (!window.JSONSelect) window.JSONSelect = {} ;

    window.JSONSelect._parse = parse;
})();
