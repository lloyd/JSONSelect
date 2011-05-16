(function() {
    var lex = JSONSelect._lex;
    var toks = JSONSelect._toks;
    var parse = function (str) {
        var am = undefined;
        var a = [];
        var off = 0;
        var s = parse_selector(str, 0);
        a.push(s[1]);
        while (true) {
            s = lex(str, off = s[0]);
            if (s && s[1] === ' ') s = lex(str, off = s[0]);
            if (!s) break;
            // now we've parsed a selector, and have something else...
            if (s[1] === ">") {
                a.push(">");
                off = s[0];
            } else if (s[1] === ",") {
                if (am == undefined) am = [ ",", a ];
                else am.push(a);
                a = [];
                off = s[0];
            }
            var s = parse_selector(str, off);
            a.push(s[1]);
            off = s[0];
        }
        if (am) am.push(a);
        return am ? am : a;
    };

    var parse_selector = function(str, off) {
        var soff = off;
        var s = { };
        var l = lex(str, off);
        // skip space
        if (l && l[1] === " ") { soff = off = l[0]; l = lex(str, off); }
        if (l && l[1] === toks.typ) {
            s.type = l[2];
            l = lex(str, (off = l[0]));
        } else if (l && l[1] === "*") {
            // don't bother representing the universal sel, '*' in the
            // parse tree, cause it's the default
            l = lex(str, (off = l[0]));
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
