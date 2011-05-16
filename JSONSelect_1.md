# JSONSelect 1

## Features

JSONSelect level 1 includes the following constructs, mostly from CSS3
but with some differences.

  * `string` -- type selectors
  * `*` -- the universal type selector
  * `#foo` -- ID selectors, which match against object keys
  * `#"a string"` -- ID selectors with JSON-string quoted ids
  * Several structural psuedo-classes:
    * `:root` - the root psuedo class
    * `:nth-child()` - the nth-child class that matches object
      values and array elements
    * `:nth-last-child()` - the inverse of `:nth-child()`
    * `:first-child` - the first child of an array or object
    * `:last-child` - the last child of an array or object
    * `:only-child` - the only child of an array or object
    * `:empty` - the empty psuedo class matching arrays or objects
      without children
  * `string, number` -- a grouping operator
  * `object string` -- a descentant combinator
  * `#bar > string` -- a child combinator


## A Semi-Formal Grammar

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
      : `#` name
      | `#` json_string
      ;
    
    pseudo
      /* Note that pseudo-elements are restricted to one per selector and */
      /* occur only in the last simple_selector_sequence. */
      : `:` psuedo_class_name
      | `:` psuedo_function_name `(` expression `)`
      ;

    psuedo_class_name
      : `root` | `first-child` | `last-child` | `only-child`
    
    psuedo_function_name
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

