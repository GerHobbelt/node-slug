# [slug](https://github.com/RightHere360/node-slug) [![Build Status](https://travis-ci.org/RightHere360/node-slug.svg?branch=master)](https://travis-ci.org/RightHere360/node-slug)

slugifies every string, even when it contains unicode!

Make strings url-safe.

* respecting [RFC 3986](https://tools.ietf.org/html/rfc3986)
* Comprehensive tests
* No dependencies (except the unicode table)
* Not in coffee-script (except the tests lol)
* Coerces foreign symbols to their english equivalent
* Works in browser (window.slug) and AMD/CommonJS-flavoured module loaders (except the unicode symbols unless you use browserify but who wants to download a ~2mb js file, right?)

```
npm install slug
```

```
bower install slug
```

## example

```javascript
var slug = require('slug');
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

## options

```javascript
// options is either object or replacement (sets options.replacement)
slug('string', [{ options } || 'replacement']);
```

```javascript
slug.defaults.mode = 'pretty';
slug.defaults.modes['rfc3986'] = {
  replacement: '-', // replace spaces with replacement
  symbols: true, // replace unicode symbols or not
  remove: null, // (optional) regex to remove characters
  lower: true, // result in lower case
  allowed: slug.allowed, // (optional) regex allowed characters
  charmap: slug.charmap, // replace special characters
  multicharmap: slug.multicharmap, // replace multi-characters
};
slug.defaults.modes['pretty'] = {
  replacement: '-',
  symbols: true,
  remove: /[.]/g,
  lower: false,
  allowed: slug.allowed,
  charmap: slug.charmap,
  multicharmap: slug.multicharmap,
};
```

## browser

When using browserify you might want to remove the symbols table from your bundle by using `--ignore` similar to this:

```bash
# generates a standalone slug browser bundle:
browserify slug.js --ignore unicode/category/So -s slug > slug-browser.js
```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/dodo/node-slug/trend.png)](https://bitdeli.com/free 'Bitdeli Badge')












# Uslug.js

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
    uslug('Y U NO', { spaces: true }) // 'y u no'
    uslug('Y-U|NO', { allowedChars: '|' }) // 'yu|no'


## Installation

    npm install uslug


## Options

### uslug(string, options)

Generate a slug for the string passed.

__Arguments__

* string - The string you want to slugify.
* options - An optional object that can contain:  
    * allowedChars: a String of chars that you want to be whitelisted. Default: '-_~'.  
    * lower: a Boolean to force to lower case the slug. Default: true.  
    * spaces: a Boolean to allow spaces. Default: false.  

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
