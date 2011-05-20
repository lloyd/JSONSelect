JSONSelect defines a selector language similar to CSS intended for
JSON documents.  For an introduction to the project see
[jsonselect.org](http://jsonselect.org) or the [documentation](JSONSelect.md).

## What's Here

This repository is the home to many things related to JSONSelect:

  * [Documentation](JSONSelect.md) which describes the language
  * The [jsonselect.org](jsonselect.org) [site source](site/)
  * A [reference implementation](src/jsonselect.js) in JavaScript
  * [Conformance tests](tests/) to help JSONSelect implementors along.

## Project Overview

JSONSelect is an attempt to create a selector language similar to
CSS for JSON objects.  A couple key goals of the project's include:

  * **intuitive** - JSONSelect is to *feel like* CSS, meaning a developers with an understanding of CSS can probably guess most of the syntax.
  * **expressive** - As JSONSelect evolves, it will include more of the most popular constructs from the CSS spec and popular implementations (like sizzle).  A successful result will be a good balance of simplicty and power.
  * **language independance** - JSON objects are represented in every language under the sun, so should be JSONSelect.  The project
  * **incremental adoption** - JSONSelect features are broken in to conformance levels, to make it easier to build basic support and to allow incremental stabilization of the language.
  * **efficient** - As many constructs of the language as possible will be able to evaluate against a document in a context free manner.  This means it will be possible to build efficient stream filtering.

