/*! Copyright (c) 2011, Lloyd Hilaiel, ISC License */
(function() {
    var w = window;
    var jp = (w.JSON ? w.JSON.parse : w.eval);
    function jsonParse(s) { try { return jp(s); } catch(e) { te("ijs"); }; }

    // emitted error codes.  Strip this table for an, uh, "optimized build"
    var _es = {}; // overshadow any globals when the table is stripped
    /** --->>> **/
    var _es = {
        "ijs": "invalid json string",
        "mpc": "multiple pseudo classes (:xxx) not allowed",
        "nmi": "multiple ids not allowed",
        "pcny": "psuedo class functions not yet supported",
        "se": "selector expected",
        "sra": "string required after '#'",
        "uc": "unrecognized char",
        "ujs": "unclosed json string",
        "upc": "unrecognized psuedo class"
    };
    /** <<<--- **/
    // throw a full or abbreviated error message depending on the existence of the
    // _es table
    var te = function(ec) { throw (_es[ec] ? _es[ec] : "jsonselect error: "+ec) }

    // THE LEXER
    var toks = {
        psc: 1, // pseudo class
        psf: 2, // pseudo class function
        typ: 3, // type
        str: 4, // string
    };

    var pat = /^(?:([\r\n\t\ ]+)|([*#,>])|(string|boolean|null|array|object|number)|(:(?:root|first-child|last-child|only-child))|(:\w+)|(\"(?:[^\\]|\\[^\"])*\")|(\")|((?:[_a-zA-Z]|[^\0-\0177]|\\[^\r\n\f0-9a-fA-F])(?:[_a-zA-Z0-9-]|[^\u0000-\u0177]|(?:\\[^\r\n\f0-9a-fA-F]))*))/;
    var lex = function (str, off) {
        if (!off) off = 0;
        var m = pat.exec(str.substr(off));
        if (!m) return undefined;
        off+=m[0].length;
        if (m[1]) return [off, " "];
        if (m[2]) return [off, m[0]];
        else if (m[3]) return [off, toks.typ, m[0]];
        else if (m[4]) return [off, toks.psc, m[0]];
        else if (m[5]) te("upc");
        else if (m[6]) return [off, toks.str, jsonParse(m[0])];
        else if (m[7]) te("ujs");
        else if (m[8]) return [off, toks.str, m[0].replace(/\\([^\r\n\f0-9a-fA-F])/g,"$1")];
    };

    // THE PARSER

    var parse = function (str) {
        var am = undefined, a = [], off = 0;
        while (true) {
            var s = parse_selector(str, off);
            a.push(s[1]);
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
                if (!l || l[1] !== toks.str) te("sra");
                if (s.id) te("nmi");
                s.id = l[2];
            } else if (l[1] === toks.psc) {
                if (s.pc) te("mpc");
                s.pc = l[2];
            } else if (l[1] === toks.psf) {
                te("pcny");
            } else {
                break;
            }
            l = lex(str, (off = l[0]));
        }

        // now if we didn't actually parse anything it's an error
        if (soff === off) te("se");

        return [off, s];
    };

    // THE EVALUATOR

    function forEach(sel, obj, fun) {
        // XXX
    };

    function match(sel, obj) {
        // XXX
        return [];
    };

    function compile(sel) {
        return {
            sel: parse(sel),
            match: function(obj){return match(this.sel, obj)},
            forEach: function(obj, fun) { return match(this.sel, obj, fun) }
        };
    }

    w.JSONSelect = {
        // expose private API for testing
        _lex: lex,
        _parse: parse,
        // public API
        match: function (sel, obj) { return compile(sel).match(obj) },
        forEach: function(sel, obj, fun) { return compile(sel).forEach(obj, fun) },
        compile: compile
    };
})();
