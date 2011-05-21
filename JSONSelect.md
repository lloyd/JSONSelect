**WARNING**: This document is a work in progress, just like JSONSelect itself.
View or contribute to the latest version [on github](http://github.com/lloyd/JSONSelect/blob/master/JSONSelect.md)

# JSONSelect

  1. [introduction](#introduction)
  1. [language overview](#overview)
  1. [grouping](#grouping)
  1. [selectors](#selectors)
  1. [pseudo classes](#pseudo)
  1. [combinators](#combinators)
  1. [planned additions](#additions)
  1. [grammar](#grammar)

## Introduction<a name="introduction"></a>

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

