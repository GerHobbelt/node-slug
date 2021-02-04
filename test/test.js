/* eslint-env mocha, es6 */

import assert from 'assert';

import slug from '../slug.js';

describe('slug', () => {
  it('should convert input to string', () => {
    [ slug(1) ].should.eql([ '1' ]);
    return [ slug(567890) ].should.eql([ '567890' ]);
  });
  it('should replace whitespaces with replacement', () => {
    [ slug('foo bar baz') ].should.eql([ 'foo-bar-baz' ]);
    [ slug('foo bar baz', '_') ].should.eql([ 'foo_bar_baz' ]);
    return [ slug('foo bar baz', '') ].should.eql([ 'foobarbaz' ]);
  });
  it('should remove trailing space if any', () =>
    [ slug(' foo bar baz ') ].should.eql([ 'foo-bar-baz' ]));
  it('should remove trailing separator if any', () =>
    [ slug(' foo bar baz-') ].should.eql([ 'foo-bar-baz' ]));
  it('should remove not allowed chars', () => {
    [ slug('foo, bar baz') ].should.eql([ 'foo-bar-baz' ]);
    [ slug('foo- bar baz') ].should.eql([ 'foo-bar-baz' ]);
    return [ slug('foo] bar baz') ].should.eql([ 'foo-bar-baz' ]);
  });
  it('should leave allowed chars in rfc3986 mode', () => {
    let a;
    let allowed;
    let i;
    let len;
    let results;
    allowed = [ '.', '_', '~' ];
    results = [];
    for (i = 0, len = allowed.length; i < len; i++) {
      a = allowed[i];
      results.push(
        [
          slug(`foo ${a} bar baz`, {
            mode: 'rfc3986'
          })
        ].should.eql([ `foo-${a}-bar-baz` ])
      );
    }
    return results;
  });
  it('should leave allowed chars in pretty mode', () => {
    let a;
    let allowed;
    let i;
    let len;
    let results;
    allowed = [ '_', '~' ];
    results = [];
    for (i = 0, len = allowed.length; i < len; i++) {
      a = allowed[i];
      results.push([ slug(`foo ${a} bar baz`) ].should.eql([ `foo-${a}-bar-baz` ]));
    }
    return results;
  });
  it('should replace latin chars', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      À: 'A',
      Á: 'A',
      Â: 'A',
      Ã: 'A',
      Ä: 'A',
      Å: 'A',
      Æ: 'AE',
      Ç: 'C',
      È: 'E',
      É: 'E',
      Ê: 'E',
      Ë: 'E',
      Ì: 'I',
      Í: 'I',
      Î: 'I',
      Ï: 'I',
      Ð: 'D',
      Ñ: 'N',
      Ò: 'O',
      Ó: 'O',
      Ô: 'O',
      Õ: 'O',
      Ö: 'O',
      Ő: 'O',
      Ø: 'O',
      Ù: 'U',
      Ú: 'U',
      Û: 'U',
      Ü: 'U',
      Ű: 'U',
      Ý: 'Y',
      Þ: 'TH',
      ß: 'ss',
      à: 'a',
      á: 'a',
      â: 'a',
      ã: 'a',
      ä: 'a',
      å: 'a',
      æ: 'ae',
      ç: 'c',
      è: 'e',
      é: 'e',
      ê: 'e',
      ë: 'e',
      ì: 'i',
      í: 'i',
      î: 'i',
      ï: 'i',
      ð: 'd',
      ñ: 'n',
      ò: 'o',
      ó: 'o',
      ô: 'o',
      õ: 'o',
      ö: 'o',
      ő: 'o',
      ø: 'o',
      ù: 'u',
      ú: 'u',
      û: 'u',
      ü: 'u',
      ű: 'u',
      ý: 'y',
      þ: 'th',
      ÿ: 'y',
      ẞ: 'SS'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace greek chars', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      α: 'a',
      β: 'b',
      γ: 'g',
      δ: 'd',
      ε: 'e',
      ζ: 'z',
      η: 'h',
      θ: '8',
      ι: 'i',
      κ: 'k',
      λ: 'l',
      μ: 'm',
      ν: 'n',
      ξ: '3',
      ο: 'o',
      π: 'p',
      ρ: 'r',
      σ: 's',
      τ: 't',
      υ: 'y',
      φ: 'f',
      χ: 'x',
      ψ: 'ps',
      ω: 'w',
      ά: 'a',
      έ: 'e',
      ί: 'i',
      ό: 'o',
      ύ: 'y',
      ή: 'h',
      ώ: 'w',
      ς: 's',
      ϊ: 'i',
      ΰ: 'y',
      ϋ: 'y',
      ΐ: 'i',
      Α: 'A',
      Β: 'B',
      Γ: 'G',
      Δ: 'D',
      Ε: 'E',
      Ζ: 'Z',
      Η: 'H',
      Θ: '8',
      Ι: 'I',
      Κ: 'K',
      Λ: 'L',
      Μ: 'M',
      Ν: 'N',
      Ξ: '3',
      Ο: 'O',
      Π: 'P',
      Ρ: 'R',
      Σ: 'S',
      Τ: 'T',
      Υ: 'Y',
      Φ: 'F',
      Χ: 'X',
      Ψ: 'PS',
      Ω: 'W',
      Ά: 'A',
      Έ: 'E',
      Ί: 'I',
      Ό: 'O',
      Ύ: 'Y',
      Ή: 'H',
      Ώ: 'W',
      Ϊ: 'I',
      Ϋ: 'Y'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace turkish chars', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      ş: 's',
      Ş: 'S',
      ı: 'i',
      İ: 'I',
      ç: 'c',
      Ç: 'C',
      ü: 'u',
      Ü: 'U',
      ö: 'o',
      Ö: 'O',
      ğ: 'g',
      Ğ: 'G'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace cyrillic chars', () => {
    let char;
    let char_map;
    let expected;
    let replacement;
    let results;
    char_map = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'yo',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'j',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'c',
      ч: 'ch',
      ш: 'sh',
      щ: 'sh',
      ъ: 'u',
      ы: 'y',
      ь: '',
      э: 'e',
      ю: 'yu',
      я: 'ya',
      А: 'A',
      Б: 'B',
      В: 'V',
      Г: 'G',
      Д: 'D',
      Е: 'E',
      Ё: 'Yo',
      Ж: 'Zh',
      З: 'Z',
      И: 'I',
      Й: 'J',
      К: 'K',
      Л: 'L',
      М: 'M',
      Н: 'N',
      О: 'O',
      П: 'P',
      Р: 'R',
      С: 'S',
      Т: 'T',
      У: 'U',
      Ф: 'F',
      Х: 'H',
      Ц: 'C',
      Ч: 'Ch',
      Ш: 'Sh',
      Щ: 'Sh',
      Ъ: 'U',
      Ы: 'Y',
      Ь: '',
      Э: 'E',
      Ю: 'Yu',
      Я: 'Ya',
      Є: 'Ye',
      І: 'I',
      Ї: 'Yi',
      Ґ: 'G',
      є: 'ye',
      і: 'i',
      ї: 'yi',
      ґ: 'g'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      expected = `foo-${replacement}-bar-baz`;
      if (!replacement) {
        expected = 'foo-bar-baz';
      }
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ expected ]));
    }
    return results;
  });
  it('should replace czech chars', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      č: 'c',
      ď: 'd',
      ě: 'e',
      ň: 'n',
      ř: 'r',
      š: 's',
      ť: 't',
      ů: 'u',
      ž: 'z',
      Č: 'C',
      Ď: 'D',
      Ě: 'E',
      Ň: 'N',
      Ř: 'R',
      Š: 'S',
      Ť: 'T',
      Ů: 'U',
      Ž: 'Z'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace polish chars', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      ą: 'a',
      ć: 'c',
      ę: 'e',
      ł: 'l',
      ń: 'n',
      ó: 'o',
      ś: 's',
      ź: 'z',
      ż: 'z',
      Ą: 'A',
      Ć: 'C',
      Ę: 'E',
      Ł: 'L',
      Ń: 'N',
      Ś: 'S',
      Ź: 'Z',
      Ż: 'Z'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace latvian chars', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      ā: 'a',
      č: 'c',
      ē: 'e',
      ģ: 'g',
      ī: 'i',
      ķ: 'k',
      ļ: 'l',
      ņ: 'n',
      š: 's',
      ū: 'u',
      ž: 'z',
      Ā: 'A',
      Č: 'C',
      Ē: 'E',
      Ģ: 'G',
      Ī: 'I',
      Ķ: 'K',
      Ļ: 'L',
      Ņ: 'N',
      Š: 'S',
      Ū: 'U',
      Ž: 'Z'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace vietnamese chars', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      Ạ: 'A',
      Ả: 'A',
      Ầ: 'A',
      Ấ: 'A',
      Ậ: 'A',
      Ẩ: 'A',
      Ẫ: 'A',
      Ằ: 'A',
      Ắ: 'A',
      Ặ: 'A',
      Ẳ: 'A',
      Ẵ: 'A',
      Ẹ: 'E',
      Ẻ: 'E',
      Ẽ: 'E',
      Ề: 'E',
      Ế: 'E',
      Ệ: 'E',
      Ể: 'E',
      Ễ: 'E',
      Ị: 'I',
      Ỉ: 'I',
      Ĩ: 'I',
      Ọ: 'O',
      Ỏ: 'O',
      Ồ: 'O',
      Ố: 'O',
      Ộ: 'O',
      Ổ: 'O',
      Ỗ: 'O',
      Ơ: 'O',
      Ờ: 'O',
      Ớ: 'O',
      Ợ: 'O',
      Ở: 'O',
      Ỡ: 'O',
      Ụ: 'U',
      Ủ: 'U',
      Ũ: 'U',
      Ư: 'U',
      Ừ: 'U',
      Ứ: 'U',
      Ự: 'U',
      Ử: 'U',
      Ữ: 'U',
      Ỳ: 'Y',
      Ỵ: 'Y',
      Ỷ: 'Y',
      Ỹ: 'Y',
      Đ: 'D',
      ạ: 'a',
      ả: 'a',
      ầ: 'a',
      ấ: 'a',
      ậ: 'a',
      ẩ: 'a',
      ẫ: 'a',
      ằ: 'a',
      ắ: 'a',
      ặ: 'a',
      ẳ: 'a',
      ẵ: 'a',
      ẹ: 'e',
      ẻ: 'e',
      ẽ: 'e',
      ề: 'e',
      ế: 'e',
      ệ: 'e',
      ể: 'e',
      ễ: 'e',
      ị: 'i',
      ỉ: 'i',
      ĩ: 'i',
      ọ: 'o',
      ỏ: 'o',
      ồ: 'o',
      ố: 'o',
      ộ: 'o',
      ổ: 'o',
      ỗ: 'o',
      ơ: 'o',
      ờ: 'o',
      ớ: 'o',
      ợ: 'o',
      ở: 'o',
      ỡ: 'o',
      ụ: 'u',
      ủ: 'u',
      ũ: 'u',
      ư: 'u',
      ừ: 'u',
      ứ: 'u',
      ự: 'u',
      ử: 'u',
      ữ: 'u',
      ỳ: 'y',
      ỵ: 'y',
      ỷ: 'y',
      ỹ: 'y',
      đ: 'd'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace currencies', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      '€': 'euro',
      '₢': 'cruzeiro',
      '₣': 'french franc',
      '£': 'pound',
      '₤': 'lira',
      '₥': 'mill',
      '₦': 'naira',
      '₧': 'peseta',
      '₨': 'rupee',
      '₹': 'indian rupee',
      '₩': 'won',
      '₪': 'new shequel',
      '₫': 'dong',
      '₭': 'kip',
      '₮': 'tugrik',
      '₯': 'drachma',
      '₰': 'penny',
      '₱': 'peso',
      '₲': 'guarani',
      '₳': 'austral',
      '₴': 'hryvnia',
      '₵': 'cedi',
      '¢': 'cent',
      '¥': 'yen',
      元: 'yuan',
      円: 'yen',
      '﷼': 'rial',
      '₠': 'ecu',
      '¤': 'currency',
      '฿': 'baht',
      $: 'dollar'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      replacement = replacement.replace(' ', '-');
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace symbols in rfc3986 mode', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      '©': 'c',
      œ: 'oe',
      Œ: 'OE',
      '∑': 'sum',
      '®': 'r',
      '∂': 'd',
      ƒ: 'f',
      '™': 'tm',
      '℠': 'sm',
      '…': '...',
      '˚': 'o',
      º: 'o',
      ª: 'a',
      '∆': 'delta',
      '∞': 'infinity',
      '♥': 'love',
      '&': 'and',
      '|': 'or',
      '<': 'less',
      '>': 'greater'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push(
        [
          slug(`foo ${char} bar baz`, {
            mode: 'rfc3986'
          })
        ].should.eql([ `foo-${replacement}-bar-baz`.toLowerCase() ])
      );
    }
    return results;
  });
  it('should replace symbols in pretty mode', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      '©': 'c',
      œ: 'oe',
      Œ: 'OE',
      '∑': 'sum',
      '®': 'r',
      '∂': 'd',
      ƒ: 'f',
      '™': 'tm',
      '℠': 'sm',
      '˚': 'o',
      º: 'o',
      ª: 'a',
      '∆': 'delta',
      '∞': 'infinity',
      '♥': 'love',
      '&': 'and',
      '|': 'or',
      '<': 'less',
      '>': 'greater'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should remove ellipsis in pretty mode', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      '…': '...'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ 'foo-bar-baz' ]));
    }
    return results;
  });
  it('should strip … symbols in pretty mode', () =>
    [ slug('foo … bar baz') ].should.eql([ 'foo-bar-baz' ]));
  it('should strip symbols', () => {
    let char;
    let char_map;
    let i;
    let len;
    let results;
    char_map = [ '†', '“', '”', '‘', '’', '•' ];
    results = [];
    for (i = 0, len = char_map.length; i < len; i++) {
      char = char_map[i];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ 'foo-bar-baz' ]));
    }
    return results;
  });
  it('should replace unicode', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    char_map = {
      '☢': 'radioactive',
      '☠': 'skull-and-bones',
      '☤': 'caduceus',
      '☣': 'biohazard',
      '☭': 'hammer-and-sickle',
      '☯': 'yin-yang',
      '☮': 'peace',
      '☏': 'telephone',
      '☔': 'umbrella-with-rain-drops',
      '☎': 'telephone',
      '☀': 'sun-with-rays',
      '★': 'star',
      '☂': 'umbrella',
      '☃': 'snowman',
      '✈': 'airplane',
      '✉': 'envelope',
      '✊': 'raised-fist'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      results.push([ slug(`foo ${char} bar baz`) ].should.eql([ `foo-${replacement}-bar-baz` ]));
    }
    return results;
  });
  it('should replace no unicode when disabled', () => {
    let char;
    let char_map;
    let i;
    let len;
    let results;
    char_map = '😹☢☠☤☣☭☯☮☏☔☎☀★☂☃✈✉✊'.split('');
    results = [];
    for (i = 0, len = char_map.length; i < len; i++) {
      char = char_map[i];
      results.push(
        [
          slug(`foo ${char} bar baz`, {
            symbols: false
          })
        ].should.eql([ 'foo-bar-baz' ])
      );
    }
    return results;
  });
  it('should allow altering the charmap', () => {
    let charmap;
    charmap = {
      f: 'ph',
      o: '0',
      b: '8',
      a: '4',
      r: '2',
      z: '5'
    };
    return [
      slug('foo bar baz', {
        charmap
      }).toUpperCase()
    ].should.eql([ 'PH00-842-845' ]);
  });
  it('should replace lithuanian characters', () =>
    slug('ąčęėįšųūžĄČĘĖĮŠŲŪŽ').should.eql('aceeisuuzACEEISUUZ'));
  it('should replace multichars', () =>
    [ slug('w/ <3 && sugar || ☠') ].should.eql([ 'with-love-and-sugar-or-skull-and-bones' ]));
  it('should be flavourable', () => {
    let expected;
    let text;
    text = "It's your journey ... we guide you through.";
    expected = 'Its-your-journey-we-guide-you-through';
    return [
      slug(text, {
        mode: 'pretty'
      })
    ].should.eql([ expected ]);
  });
  it('should default to lowercase in rfc3986 mode', () => {
    let expected;
    let text;
    text = "It's Your Journey We Guide You Through.";
    expected = 'its-your-journey-we-guide-you-through.';
    return [
      slug(text, {
        mode: 'rfc3986'
      })
    ].should.eql([ expected ]);
  });
  it('should allow disabling of lowercase', () => {
    let expected;
    let text;
    text = "It's Your Journey We Guide You Through.";
    expected = 'Its-Your-Journey-We-Guide-You-Through.';
    return [
      slug(text, {
        mode: 'rfc3986',
        lower: false
      })
    ].should.eql([ expected ]);
  });
  it('should allow to limit slug words (5, i.e.)', () => {
    let expected;
    let text;
    text = "It's Your Journey We Guide You Through.";
    expected = 'Its-Your-Journey-We-Guide';
    return [
      slug(text, {
        limit: 5
      })
    ].should.eql([ expected ]);
  });
  return it('should allow Å, Ä, Ö, å, ä, ö', () => {
    let char;
    let char_map;
    let replacement;
    let results;
    let text;
    char_map = {
      Ä: 'Ä',
      Å: 'Å',
      Ö: 'O',
      ä: 'ä',
      å: 'å',
      ö: 'ö'
    };
    results = [];
    for (char in char_map) {
      replacement = char_map[char];
      text = `foo ${char} bar baz`;
      results.push(
        [
          slug(text, {
            charmap: char_map,
            allowed: /[^\wÅÄÖåäö\s\-\.\_~]/g
          })
        ].should.eql([ `foo-${replacement}-bar-baz` ])
      );
    }
    return results;
  });
});
