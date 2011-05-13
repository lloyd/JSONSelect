## JSONSelect Conformance Tests.

Test documents have a suffix of `.json`, like `basic.json`.

Selectors to be applied to test documents have the document name,
followed by an underbar, followed by a description of the test, with
a `.selector` file name suffix, like `basic_grouping.selector`.

Expected output files have the same name as the `.selector` file, 
but have a `.output` suffix, like `basic_grouping.output`.

Expected output files contain a stream of JSON objects that are what
is expected to be produced when a given selector is applied to a given
document.
