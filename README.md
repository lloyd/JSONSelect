JSONSelect defines a selector language similar to CSS intended for 
JSON documents.

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
   then apply CSS to the XML document.  Here's an example mapping:

JSON:

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

XML: 

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

6. Attribute selector notation will be used to express constraints on
   values.  (string matching, regex, etc).  It might be good to break this
   work into JSONSelect 2, and leave JSONSelect 1 simple.

7. There aren't any classes in JSONSelect.

8. Full JSON strings must be possible to represent as IDs (`#`).  So we'll
   have two forms in the id production, one without quotes that accepts a
   character set similar to CSS IDs, but if a quote (`"`) follows a `#`,
   then we'll parse the ID as a JSON string:
   
    string#"This is a json string\n"
    
