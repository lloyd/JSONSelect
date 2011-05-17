$(document).ready(function() {
    var tests = {};

    function fetchFile(p, c) {
        $.get(p, function (data) {
            $("." + c).text(data);
        });
    }

    function renderTests() {
        var c = $("<div/>");
        for (var k in tests) {
            c.append($("<h1/>").text("document: " + k));
            var cl = k + "_document";
            c.append($("<pre/>").addClass(cl).text("loading document..."));
            fetchFile("tests/" + k + ".json", cl);
            for (var i = 0; i < tests[k].length; i++) {
                var n = tests[k][i];
                c.append($("<h2/>").text(n));
                var cl = k + "_" + n + "_selector";
                c.append($("<pre/>").addClass(cl).text("loading selector..."));
                fetchFile("tests/" + k + "_" + n + ".selector", cl);
                cl = k + "_" + n + "_output";
                c.append($("<pre/>").addClass(cl).text("loading output..."));
                fetchFile("tests/" + k + "_" + n + ".output", cl);
            }
        }
        c.appendTo($("#tests"));
    }

    $.get("tests/alltests.txt", function (data) {
        var lines = data.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var f = $.trim(lines[i]);
            if (f.length == 0) continue;
            var m = /^([A-Za-z]+)_(.+)\.selector$/.exec(f);
            console.log(f, ": ", m);
            if (m) {
                if (!tests.hasOwnProperty(m[1])) tests[m[1]] = [];
                tests[m[1]].push(m[2]);
            }
        }
        renderTests();
    });
});