(function() {
    var lex = JSONSelect._lex;
    var toks = JSONSelect._toks;
    var parse = function (str) {
        return parse_selector(str, 0)[1];
    };

    var parse_selector = function(str, off) {
        var soff = off;
        var s = { };
        var l = lex(str, off);
        console.log("l: ", l);
        // skip space
        if (l && l[1] === " ") { soff = off = l[0]; l = lex(str, off); }
        if (l && l[1] === toks.typ) {
            s.type = l[2];
            l = lex(str, (off = l[0]));
            console.log("l: ", l);
        } else if (l && l[1] === "*") {
            // don't bother representing the universal sel, '*' in the
            // parse tree, cause it's the default
            l = lex(str, (off = l[0]));
            console.log("l: ", l);
        }

        // now support either an id or a pc
        while (true) {
            if (l === undefined) {
                break;
            } else if (l[1] === '#') {
                l = lex(str, (off = l[0]));
                if (!l || l[1] !== toks.str) throw "string required after '#'";
                if (s.id) throw "multiple ids not allowed";
                s.id = l[2];
            } else if (l[1] === toks.psc) {
                if (s.pc) throw "multiple pseudo classes (:xxx) not allowed";
                s.pc = l[2];
            } else if (l[1] === toks.psf) {
                throw "psuedo class functions not yet supported";
            } else {
                break;
            }
            l = lex(str, (off = l[0]));
        }

        // now if we didn't actually parse anything it's an error
        if (soff === off) throw "selector expected";

        return [off, s];
    };

    // expose
    if (!window.JSONSelect) window.JSONSelect = {} ;

    window.JSONSelect._parse = parse;
})();
