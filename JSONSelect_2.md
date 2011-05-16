# JSONSelect 2

## Features

  * `boolean#enabled ~ #email` -- a general sibling operator,
    *without the ordering requirement*
  * `:not()`
  * `[=value]` a node with a value of exactly `value`
  * `[^=value]` a node whose value starts with `value`
  * `[$=value]` a node whose value ends with `value`
  * `[*=value]` a node whose value contains the substring `value`
