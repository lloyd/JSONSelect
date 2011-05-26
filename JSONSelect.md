**WARNING**: This document is a work in progress, just like JSONSelect itself.
View or contribute to the latest version [on github](http://github.com/lloyd/JSONSelect/blob/master/JSONSelect.md)

# JSONSelect

  1. [introduction](#introduction)
  1. [levels](#levels)
  1. [language overview](#overview)
  1. [grouping](#grouping)
  1. [selectors](#selectors)
  1. [pseudo classes](#pseudo)
  1. [combinators](#combinators)
  1. [planned additions](#additions)
  1. [grammar](#grammar)
  1. [conformance tests](#tests)
  1. [references](#references)

## Introduction<a name="introduction"></a>

JSONSelect defines a language very similar in syntax and structure to
[CSS3 Selectors](http://www.w3.org/TR/css3-selectors/).  JSONSelect
expressions are patterns which can be matched against JSON documents.

Potential applications of JSONSelect include:

  * Simplified programmatic matching of nodes within JSON documents.
  * Stream filtering, allowing efficient and incremental matching of documents.
  * As a query language for a document database.

## Levels<a name="levels"></a>

The specification of JSONSelect is broken into three levels.  Higher
levels include more powerful constructs, and are likewise more
complicated to implement and use.

**JSONSelect Level 1** is a small subset of CSS3.  Every feature is
derived from a CSS construct that directly maps to JSON.  A level 1
implementation is not particularly complicated while providing basic
querying features.

**JSONSelect Level 2** builds upon Level 1 adapting more complex CSS
constructs which allow expressions to include constraints such as
patterns that match against values, and those which consider a node's
siblings.  Level 2 is still a direct adaptation of CSS, but includes
constructs whose semantic meaning is significantly changed.

**JSONSelect Level 3** adds constructs which do not necessarily have a
direct analog in CSS, and are added to increase the power and convenience
of the selector language.  These include aliases, wholly new pseudo
class functions, and more blue sky dreaming.

## Language Overview<a name="overview"></a>

  * `string` -- type selectors
  * `*` -- the universal type selector
  * `.foo` -- Class selectors, which match against object keys
  * `."a string"` -- Class selectors, but quoted as JSON-strings
  * Several structural pseudo-classes:
    * `:root` - the root pseudo class
    * `:nth-child()` - the nth-child class that matches object
      values and array elements
    * `:nth-last-child()` - the inverse of `:nth-child()`
    * `:first-child` - the first child of an array or object
    * `:last-child` - the last child of an array or object
    * `:only-child` - the only child of an array or object
    * `:empty` - the empty pseudo class matching arrays or objects
      without children
  * `string, number` -- a grouping operator
  * `object string` -- a descendant combinator
  * `.bar > string` -- a child combinator

## Grouping<a name="grouping"></a>

## Selectors<a name="selectors"></a>

## Pseudo Classes<a name="pseudo"></a>

## Combinators<a name="combinators"></a>

## Planned Additions<a name="additions"></a>

  * `boolean.enabled ~ .email` -- a general sibling operator,
    *without the ordering requirement*
  * `:not()`
  * `:has()`
  * `[=value]` a node with a value of exactly `value`
  * `[^=value]` a node whose value starts with `value`
  * `[$=value]` a node whose value ends with `value`
  * `[*=value]` a node whose value contains the substring `value`


## Grammar<a name="grammar"></a>

(Adapted from [CSS3](http://www.w3.org/TR/css3-selectors/#descendant-combinators) and
 [json.org](http://json.org/))

    selectors_group
      : selector [ `,` selector ]*
      ;
    
    selector
      : simple_selector_sequence [ combinator simple_selector_sequence ]*
      ;
    
    combinator
      : `>` | \s+
      ;
    
    simple_selector_sequence
      /* why allow multiple HASH entities in the grammar? */
      : [ type_selector | universal ]
        [ hash | pseudo ]*
      | [ hash | pseudo ]+
      ;
    
    type_selector
      : `object` | `array` | `number` | `string` | `boolean` | `null`
      ;

    universal
      : '*'
      ;

    hash
      : `.` name
      | `.` json_string
      ;
    
    pseudo
      /* Note that pseudo-elements are restricted to one per selector and */
      /* occur only in the last simple_selector_sequence. */
      : `:` pseudo_class_name
      | `:` pseudo_function_name `(` expression `)`
      ;

    pseudo_class_name
      : `root` | `first-child` | `last-child` | `only-child`
    
    pseudo_function_name
      : `nth-child` | `nth-last-child`

    expression
      /* expression is and of the form "an+b" */
      : TODO
      ;

    json_string
      : `"` json_chars* `"`
      ;

    json_chars
      : any-Unicode-character-except-"-or-\-or-control-character
      |  `\"`
      |  `\\`
      |  `\/`
      |  `\b`
      |  `\f`
      |  `\n`
      |  `\r`
      |  `\t`
      |   \u four-hex-digits 
      ;

    name
      : nmstart nmchar*
      ;

    nmstart
      : escape | [_a-zA-Z] | nonascii
      ;

    nmchar
      : [_a-zA-Z0-9-]
      | escape
      | nonascii
      ;
 
    escape 
      : \\[^\r\n\f0-9a-fA-F]
      ;

    nonascii
      : [^\0-0177]
      ;

## Conformance Tests<a name="tests"></a>

See [https://github.com/lloyd/JSONSelect/tree/master/tests](https://github.com/lloyd/JSONSelect/tree/master/tests).

## References<a name="references"></a>

In no particular order.

  * [http://json.org/](http://json.org/)
  * [http://www.w3.org/TR/css3-selectors/](  * http://www.w3.org/TR/css3-selectors/)
  * [http://ejohn.org/blog/selectors-that-people-actually-use/](http://ejohn.org/blog/selectors-that-people-actually-use/)
  * [http://shauninman.com/archive/2008/05/05/css\_qualified\_selectors](  * http://shauninman.com/archive/2008/05/05/css_qualified_selectors)
  * [http://snook.ca/archives/html\_and\_css/css-parent-selectors](http://snook.ca/archives/html_and_css/css-parent-selectors)
  * [http://remysharp.com/2010/10/11/css-parent-selector/](http://remysharp.com/2010/10/11/css-parent-selector/)
  * [https://github.com/jquery/sizzle/wiki/Sizzle-Home](https://github.com/jquery/sizzle/wiki/Sizzle-Home)
