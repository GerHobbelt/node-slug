# [slug](https://github.com/RightHere360/node-slug) 

[![Build Status](https://travis-ci.org/RightHere360/node-slug.svg?branch=master)](https://travis-ci.org/RightHere360/node-slug)

slugifies every string, even when it contains unicode!

Make strings url-safe. 

Provides additional cleanup modes for different purposes. Can also be used to produce file-system safe file paths / file name slugs.

* respecting [RFC 3986](https://tools.ietf.org/html/rfc3986)
* Comprehensive tests
* Minimal dependencies (except the unicode table)
* Not in coffee-script
* Coerces foreign symbols to their english equivalent
* Works in browser and node
* Processes a string on a per-**Unicode codepoint** basis (this allows proper processing of Supplemental Plane Unicode characters in your input)
* Accepts user-defined custom `transform(char)` function for those extra-special character mappings
* Includes a [`uslug` mode](https://www.npmjs.com/package/uslug) -- this is where Unicode letters and digits are kept as is in slug.
 


```
npm install @gerhobbelt/slug
```

## Example

```javascript
var slug = require('@gerhobbelt/slug');
var print = console.log.bind(console, '>');

print(slug('i ♥ unicode'));
// > i-love-unicode

print(slug('unicode ♥ is ☢')); // yes!
// > unicode-love-is-radioactive

print(slug('i ♥ unicode', '_')); // If you prefer something else than `-` as separator
// > i_love_unicode

slug.charmap['♥'] = 'freaking love'; // change default charmap or use option {charmap:{…}} as 2. argument
print(slug('I ♥ UNICODE'));
// > I-freaking-love-UNICODE

print(slug('☏-Number', { lower: true })); // If you prefer lower case
// > telephone-number

print(slug('i <3 unicode'));
// > i-love-unicode
```

## Options

```javascript
// options is either object or replacement string (sets options.replacement)
slug('string', [{ options } || 'replacement']);
```

```javascript
slug.defaults.mode = 'pretty';
slug.defaults.modes = {
  rfc3986: {
    replacement: '-',        // replace spaces with replacement string
    symbols: true,           // replace unicode symbols with descriptor text or not
    unemojify: true,         // convert emojis back to github-style identifiers, e.g. ':smile:'
    normalize: 'NFC',        // Unicode normalization to be applied. Can be `false`, 'NFC', 'NFKC', 'NFD', 'NFKD'
    remove: /['"]/g,         // (optional) regex to remove characters (`null` or RegExp)
    lower: true,             // result in lower case
    pinyin: true,            // apply pinyin transformation to input before mapping/filtering the slug
    transform: null,         // (optional) custom user-defined `function transform(char) -> char` mapping
    allowed: slug.defaults.allowed,             // (optional) regex matching **NOT** allowed characters (null, RegExp)
    charmap: slug.defaults.charmap,             // (optional) replace special characters (null, object map)
    multicharmap: slug.defaults.multicharmap    // (optional) replace multi-characters (null, object map)
  },
  pretty: {
    replacement: '-',
    symbols: true,
    unemojify: true,
    normalize: 'NFC',
    remove: /[.'"]/g,
    allowed: slug.defaults.allowed,
    lower: false,
    pinyin: true,
    transform: null,
    charmap: slug.defaults.charmap,
    multicharmap: slug.defaults.multicharmap
  },
  uslug: {
    replacement: '-',
    symbols: false,
    unemojify: true,
    normalize: 'NFC',
    remove: null,
    allowed: /[^\p{L}\p{M}\p{N}_~\-]/gu,
    lower: false,
    pinyin: false,
    transform: uslug_mode_transform,
    charmap: miscSymbolsCharmap,
    multicharmap: slug.defaults.multicharmap
  }
};
```




## [`uslug` mode](https://www.npmjs.com/package/uslug)

Derived from code from the [uslug](https://github.com/jeremys/uslug) project.

Inspired by [unicode-slugify](https://github.com/mozilla/unicode-slugify), uslug is a permissive slug generator that works with unicode.
We keep only characters from the categories Letter, Number and Separator (see [Unicode Categories](http://www.unicode.org/versions/Unicode6.0.0/ch04.pdf))
and the common [CJK Unified Ideographs](http://www.unicode.org/versions/Unicode6.0.0/ch12.pdf) as defined in the version 6.0.0 of the Unicode specification.
The data is extracted from the [XML unicode database](http://www.unicode.org/Public/6.0.0/ucdxml/ucd.all.flat.zip).

This slug generator is different from [node-slug](https://github.com/dodo/node-slug), which focus
on translating unicode characters to english or latin equivalent.

As of now, uslug does not support characters outside of the [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_(Unicode)#Basic_Multilingual_Plane).



## Quick Examples

    uslug('Быстрее и лучше!') // 'быстрее-и-лучше'
    uslug('汉语/漢語') // '汉语漢語'

    uslug('Y U NO', { lower: false }) // 'Y-U-NO'
    uslug('Y U NO', { replacement: ' ' }) // 'y u no'
    uslug('Y-U|NO', { allowed: /[^\p{L}\p{M}\p{N}_|~\-]/gu }) // 'yu|no'


## Options

### uslug(string, options)

Generate a slug for the string passed.

__Arguments__

* string - The string you want to slugify.
* options - An optional object that can contain:  
    * allowed: regex identifying the characters which will **NOT be accepted**: these will be replaced by a single space.  
    * lower: a Boolean to force to lower case the slug. Default: true.  
    * replacement: a string which will replace each space in the slug. Default: '-'.  



## Contributing

### Updating the Regular Expressions

The files `lib/L.js`, `lib/M.js`, `lib/N.js` and `lib/Z.js` contain regular expressions for
validating characters and word separators. Following the instructions below will show how the
regular expressions are generated.

1) Get and unzip the unicode database. The data needs to be prettified so each <char> element
is on its own line.

```
wget http://www.unicode.org/Public/6.0.0/ucdxml/ucd.all.flat.zip && unzip ucd.all.flat.zip && xmllint --format ucd.all.flat.xml > ucd.all.flat.xml.pretty
```

2) Extract relevant data.

```
grep -E '<char cp="[0-9A-F]{4}"' ucd.all.flat.xml.pretty | grep -E 'gc="L[ultmo]"' | perl -n -e '/cp="([0-9A-F]{4})/ && print "$1\n"' | scripts/convert-to-regexp.sh
```

In this case, the `grep -E 'gc="L[ultmo]"'` command will only extract characters that are in the
general categories of: Lu, Ll, Lt, Lm and Lo (which belong to the letters category).
`scripts/convert-to-regexp` is a custom script that will need execution permissions to run.



## License

This project is distributed under the MIT License. See LICENSE file for more information.
