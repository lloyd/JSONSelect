JSONSelect defines a selector language similar to CSS intended for 
JSON documents.

## In Brief

Writing lots of code to pull data out of JSON objects sucks.  What if you
could just do this:

    > var obj = {
      candidates: [
        { name: {
            first: "Barack",
            middle: "Hussein",
            last: "Obama"
          },
          party: "Democrat"
        },
        { name: {
            first: "John",
            middle: "Sidney",
            last: " McCain"
          }
          party: "Republican"
        }
      ]
    > obj.select("#candidates #name #last");
    [ "Obama", "McCain" ]

## The Pitch

[CSS Selectors](http://www.w3.org/TR/css3-selectors/) are a well known
and deeply expressive way to match nodes in an XML document.  While there
have been some efforts to provide a similar mechanism for JSON, no known
serious attempts exist which attempt to leverage the actual syntax and
constructs of CSS selectors.

The benefits of a CSS-like language for JSON objects are foremost a matter
of *developer ergonomics*: Given that people working with web
technologies are likely to already be familiar with CSS selectors, a
syntactically similar way of selecting nodes from JSON documents should
be easy to learn and apply.  Further, a selector language can afford 
terse and readable code when accessing nested data from JSON objects.

Next, *efficiency*.  Much of the web nowadays is about parsing JSON
streams and extracting data from them.  This typically occurs by
consuming entire documents, parsing and mapping that data into a
language runtime, and then programatically extracting desired data.
By having a well defined and common selector language, there are
opportunities to perform filtering of unwanted elements *during
parsing*, or even on the sending server.  This means less unwanted data
flys around the intertubes, and the web works better.

Finally, *language independance*.  Many existing proposals are
(understandably) biased toward JavaScript as the language where
selectors will be applied.  This takes the form of selector
representation and constructs which are awkward or inefficient to
implement in other environments.  In order for a proposal to really
take hold, it needs to be viable to implement througout the web stack.
JSONSelect does (well, will do) two things to attempt to address this:

  * Represent selectors in strings, and provide a complete standalone
    grammar (derived from CSS selectors).
  * Be specified in conformance *levels* so that a implementor may
    incrementally integrate JSONSelect and have a clear way of expressing
    the subset supported ("JSONSelect 2 spoken here").

## First Impressions on Design

1. Implementations SHOULD order results using a depth first postorder
   traversal.  This allows streaming implementations to return
   incremental results, and having this be part of the specification
   means different implementations will order results identically, which
   improves conformance testing.

2. Object keys are IDs.  Unlike HTML, ids are not unique in a document, so
   selectors involving ids may match multiple nodes.
   
3. JSON type names map to JSON types.

4. We may define an abbreviation/sloppy syntax which allows for the
   omission of `#` when expressing object ids.
   
5. CSS selectors apply to XML documents.  The most consistent way to
   design JSONSelect is to define an algorithm to map JSON into XML,
   then apply CSS to the XML document.  There's an [example mapping](#mapping)
   lower down in this document.

6. Attribute selector notation will be used to express constraints on
   values.  (string matching, regex, etc).  It might be good to break this
   work into JSONSelect 2, and leave JSONSelect 1 simple.

7. There aren't any classes in JSONSelect.

8. Full JSON strings must be possible to represent as IDs (`#`).  So we'll
   have two forms in the id production, one without quotes that accepts a
   character set similar to CSS IDs, but if a quote (`"`) follows a `#`,
   then we'll parse the ID as a JSON string: `string#"This is a json string\n"`
    
9. `:*-of-type` is maybe JSONSelect 2?

## Example JSON to XML mapping <a name="mapping"></a>

For the purposes of mapping CSS to JSON, it's useful to have a well defined
way of mapping JSON to XML, given that CSS applies to the latter.  Here's
a proposed mapping by example that fuels the design of JSONSelect:

From JSON:

    {
        "name": {
            "first": "Lloyd",
            "last": "Hilaiel"
        },
        "favoriteColor": "yellow",
        "languagesSpoken": [
            {
                "language": "Bulgarian",
                "level": "advanced"
            },
            {
                "language": "English",
                "level": "native"
            },
            {
                "language": "Spanish",
                "level": "beginner"
            }
        ],
        "seatingPreference": [
            "window",
            "aisle"
        ],
        "drinkPreference": [
            "beer",
            "whiskey",
            "wine"
        ],
        weight: 172
    }
   
To XML: 
   
    <object>
      <object id="name">
        <string id="first">Lloyd</string>
        <string id="last">Hilaiel</string>
      </object>
      <string id="favoriteColor">yellow</string>
      <array id="languagesSpoken">
        <object>
          <string id="language">Bulgarian</string>
          <string id="level">advanced</string>
        </object>
        <object>
          <string id="language">English</string>
          <string id="level">native</string>
        </object>
        <object>
          <string id="language">Spanish</string>
          <string id="level">beginner</string>
        </object>
      </array>
      <array id="seatingPreference">
        <string>window</string>
        <string>aisle</string>
      </array>
      <array id="drinkPreference">
        <string>beer</string>
        <string>whiskey</string>
        <string>wine</string>
      </array>
      <number id="weight">172</number>
    </object>
