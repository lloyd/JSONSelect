### JSONSelect 1

## Features

..is expected to include the following constructs mostly from CSS3,
but with some differences.

  * `string` -- type selectors
  * `*` -- the universal type selector
  * `#foo` -- ID selectors, which match against object keys  
  * `#"a string" -- ID selectors with JSON-string quoted ids
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
  * `boolean#enabled ~ #email` -- a general sibling operator,
    *perhaps without the ordering requirement*

The following are being considered:

  * `:nth-of-type()`
  * `:nth-last-of-type()`
  * `:last-of-type()`
  * `:first-of-type()`
  * `:only-of-type()`
  * `:not()`
  * `#foo + #bar` -- the adjacent sibling combinator

## Grammar Draft

