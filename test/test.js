/* eslint-env mocha, es6 */

import assert from 'assert';

import slug from '../slug.js';

describe('slug', () => {
  it('should convert input to string', () => {
    assert.deepStrictEqual(slug(1), '1');
    assert.deepStrictEqual(slug(567890),  '567890');
  });
  it('should replace whitespaces with replacement', () => {
    assert.deepStrictEqual(slug('foo bar baz'), 'foo-bar-baz');
    assert.deepStrictEqual(slug('foo bar baz', '_'), 'foo_bar_baz');
    assert.deepStrictEqual(slug('foo bar baz', ''), 'foobarbaz');
  });
  it('should remove trailing space if any', () => {
    assert.deepStrictEqual(slug(' foo bar baz '), 'foo-bar-baz');
  });
  it('should remove trailing separator if any', () => {
    assert.deepStrictEqual(slug(' foo bar baz-'), 'foo-bar-baz');
  });
  it('should remove not allowed chars', () => {
    assert.deepStrictEqual(slug('foo, bar baz'), 'foo-bar-baz');
    assert.deepStrictEqual(slug('foo- bar baz'), 'foo-bar-baz');
    assert.deepStrictEqual(slug('foo] bar baz'), 'foo-bar-baz');
  });
  it('should leave allowed chars in rfc3986 mode', () => {
    let a;
    let allowed;
    let i;
    let len;
    allowed = [ '.', '_', '~' ];
    for (i = 0, len = allowed.length; i < len; i++) {
      a = allowed[i];
      assert.deepStrictEqual(
        slug(`foo ${a} bar baz`, {
          mode: 'rfc3986'
        })
        , `foo-${a}-bar-baz`
      );
    }
  });
  it('should leave allowed chars in pretty mode', () => {
    let a;
    let allowed;
    let i;
    let len;
    allowed = [ '_', '~' ];
    for (i = 0, len = allowed.length; i < len; i++) {
      a = allowed[i];
      assert.deepStrictEqual(slug(`foo ${a} bar baz`), `foo-${a}-bar-baz`);
    }
  });
  it('should replace latin chars', () => {
    let char;
    let char_map;
    let replacement;
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
      Ō: 'O',
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
      ō: 'o',
      Œ: 'OE',
      œ: 'oe',
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should replace greek chars', () => {
    let char;
    let char_map;
    let replacement;
    char_map = {
      α: 'a',
      β: 'b',
      γ: 'g',
      δ: 'd',
      ε: 'e',
      ζ: 'z',
      η: 'i',
      θ: 'th',
      ι: 'i',
      κ: 'k',
      λ: 'l',
      μ: 'm',
      ν: 'n',
      ξ: 'ks',
      ο: 'o',
      π: 'p',
      ρ: 'r',
      σ: 's',
      τ: 't',
      υ: 'y',
      φ: 'f',
      χ: 'x',
      ψ: 'ps',
      ω: 'o',
      ά: 'a',
      έ: 'e',
      ί: 'i',
      ό: 'o',
      ύ: 'y',
      ή: 'i',
      ώ: 'o',
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
      Η: 'I',
      Θ: 'TH',
      Ι: 'I',
      Κ: 'K',
      Λ: 'L',
      Μ: 'M',
      Ν: 'N',
      Ξ: 'KS',
      Ο: 'O',
      Π: 'P',
      Ρ: 'R',
      Σ: 'S',
      Τ: 'T',
      Υ: 'Y',
      Φ: 'F',
      Χ: 'X',
      Ψ: 'PS',
      Ω: 'O',
      Ά: 'A',
      Έ: 'E',
      Ί: 'I',
      Ό: 'O',
      Ύ: 'Y',
      Ή: 'I',
      Ώ: 'O',
      Ϊ: 'I',
      Ϋ: 'Y'
    };
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should replace turkish chars', () => {
    let char;
    let char_map;
    let replacement;
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should replace cyrillic chars', () => {
    let char;
    let char_map;
    let expected;
    let replacement;
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
      х: 'kh',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'sht',
      ъ: 'a',
      ы: 'y',
      ь: 'y',
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
      Х: 'Kh',
      Ц: 'Ts',
      Ч: 'Ch',
      Ш: 'Sh',
      Щ: 'Sht',
      Ъ: 'A',
      Ы: 'Y',
      Ь: 'Y',
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
    for (char in char_map) {
      replacement = char_map[char];
      expected = `foo-${replacement}-bar-baz`;
      if (!replacement) {
        expected = 'foo-bar-baz';
      }
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), expected);
    }
  });
  it('should replace czech chars', () => {
    let char;
    let char_map;
    let replacement;
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should replace polish chars', () => {
    let char;
    let char_map;
    let replacement;
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should replace latvian chars', () => {
    let char;
    let char_map;
    let replacement;
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should replace vietnamese chars', () => {
    let char;
    let char_map;
    let replacement;
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should replace currencies', () => {
    let char;
    let char_map;
    let replacement;
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
      圆: 'yuan',
      円: 'yuan',
      '﷼': 'rial',
      '₠': 'ecu',
      '¤': 'currency',
      '฿': 'baht',
      $: 'dollar'
    };
    for (char in char_map) {
      replacement = char_map[char];
      replacement = replacement.replace(' ', '-');
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`, `testing char '${char}`);
    }
  });
  it('should replace currencies (pinyin disabled)', () => {
    let char;
    let char_map;
    let replacement;
    char_map = {
      '₨': 'rupee',
      '₹': 'indian rupee',
      '¢': 'cent',
      '¥': 'yen',
      元: 'yuan',
      円: 'yen',   // yuan
      圆: 'yuan',
      '﷼': 'rial',
      '¤': 'currency',
      '฿': 'baht',
      $: 'dollar'
    };
    for (char in char_map) {
      replacement = char_map[char];
      replacement = replacement.replace(' ', '-');
      assert.deepStrictEqual(slug(`foo ${char} bar baz`, { pinyin: false }), `foo-${replacement}-bar-baz`, `testing char '${char}`);
    }
  });
  it('should replace symbols in rfc3986 mode', () => {
    let char;
    let char_map;
    let replacement;
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(
        slug(`foo ${char} bar baz`, {
          mode: 'rfc3986'
        })
        , `foo-${replacement}-bar-baz`.toLowerCase()
      );
    }
  });
  it('should replace symbols in pretty mode', () => {
    let char;
    let char_map;
    let replacement;
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should remove ellipsis in pretty mode', () => {
    let char;
    let char_map;
    let replacement;
    char_map = {
      '…': '...'
    };
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), 'foo-bar-baz');
    }
  });
  it('should strip … symbols in pretty mode', () => {
    assert.deepStrictEqual(slug('foo … bar baz'), 'foo-bar-baz');
  });
  it('should strip symbols', () => {
    let char;
    let char_map;
    let i;
    let len;
    char_map = [ '†', '“', '”', '‘', '’', '•' ];
    for (i = 0, len = char_map.length; i < len; i++) {
      char = char_map[i];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), 'foo-bar-baz');
    }
  });
  it('should replace unicode', () => {
    let char;
    let char_map;
    let replacement;
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
    for (char in char_map) {
      replacement = char_map[char];
      assert.deepStrictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`);
    }
  });
  it('should replace no unicode when disabled', () => {
    let char;
    let char_map;
    let i;
    let len;
    char_map = '😹☢☠☤☣☭☯☮☏☔☎☀★☂☃✈✉✊'.split('');
    for (i = 0, len = char_map.length; i < len; i++) {
      char = char_map[i];
      assert.deepStrictEqual(
        slug(`foo ${char} bar baz`, {
          symbols: false,
          unemojify: false
        })
        , 'foo-bar-baz'
      );
    }
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
    assert.deepStrictEqual(
      slug('foo bar baz', {
        charmap
      }).toUpperCase()
      , 'PH00-842-845');
  });
  it('should replace lithuanian characters', () => {
    assert.deepStrictEqual(slug('ąčęėįšųūžĄČĘĖĮŠŲŪŽ'), 'aceeisuuzACEEISUUZ');
  });
  it('should replace multichars', () => {
    assert.deepStrictEqual(slug('w/ <3 && sugar || ☠'), 'with-love-and-sugar-or-skull-and-bones');
  });
  it('should be flavourable', () => {
    let expected;
    let text;
    text = "It's your journey ... we guide you through.";
    expected = 'Its-your-journey-we-guide-you-through';
    assert.deepStrictEqual(
      slug(text, {
        mode: 'pretty'
      })
      , expected);
  });
  it('should default to lowercase in rfc3986 mode', () => {
    let expected;
    let text;
    text = "It's Your Journey We Guide You Through.";
    expected = 'its-your-journey-we-guide-you-through.';
    assert.deepStrictEqual(
      slug(text, {
        mode: 'rfc3986'
      })
      , expected);
  });
  it('should survive incorrect options', () => {
    let expected;
    let text;
    text = "It's your journey ... we guide you through.";
    expected = 'Its-your-journey-we-guide-you-through';
    assert.deepStrictEqual(
      slug(text, {
        mode: 'filesystemXXX'
      })
      , expected);
  });
  it('should survive incorrect options and tweak the default instead', () => {
    let expected;
    let text;
    text = "It's your journey ... we guide you through.";
    expected = 'Its your journey we guide you through';
    assert.deepStrictEqual(
      slug(text, {
        mode: 'filesystemXXX',
        replacement: ' '
      })
      , expected);
  });
  it('should not produce reams of separators for fringe cases', () => {
    let expected;
    let text;
    text = 'a-.= =.-b.-=.';
    expected = 'a.b';
    assert.deepStrictEqual(
      slug(text, {
        mode: 'rfc3986',
        replacement: '.'
      })
      , expected);
  });
  it('should work correctly with regex special chars as replacement characters', () => {
    let expected;
    let text;
    text = "It's your journey ... we guide you through.";
    expected = 'Its.your.journey.we.guide.you.through';
    assert.deepStrictEqual(
      slug(text, {
        replacement: '.'
      })
      , expected);
  });
  it('should work correctly with multichar replacement strings', () => {
    let expected;
    let text;
    text = "It's your journey ... we guide you through.";
    expected = 'Its.*.your.*.journey.*.we.*.guide.*.you.*.through';
    assert.deepStrictEqual(
      slug(text, {
        replacement: '.*.'
      })
      , expected);
  });
  it('should allow disabling of lowercase', () => {
    let expected;
    let text;
    text = "It's Your Journey We Guide You Through.";
    expected = 'Its-Your-Journey-We-Guide-You-Through.';
    assert.deepStrictEqual(
      slug(text, {
        mode: 'rfc3986',
        lower: false
      })
      , expected);
  });
  it('should allow to limit slug words (5, i.e.)', () => {
    let expected;
    let text;
    text = "It's Your Journey We Guide You Through.";
    expected = 'Its-Your-Journey-We-Guide';
    assert.deepStrictEqual(
      slug(text, {
        limit: 5
      })
      , expected);
  });
  return it('should allow Å, Ä, Ö, å, ä, ö', () => {
    let char;
    let char_map;
    let replacement;
    let text;
    char_map = {
      Ä: 'Ä',
      Å: 'Å',
      Ö: 'O',
      ä: 'ä',
      å: 'å',
      ö: 'ö'
    };
    for (char in char_map) {
      replacement = char_map[char];
      text = `foo ${char} bar baz`;
      assert.deepStrictEqual(
        slug(text, {
          charmap: char_map,
          allowed: /[^\wÅÄÖåäö\s\-\.\_~]/g
        })
        , `foo-${replacement}-bar-baz`
      );
    }
  });
});




describe('slug in uslug mode', () => {

  function uslug(str, opts) {
    return slug(str, Object.assign({}, { mode: 'uslug' }, opts));
  }

  let word0 = 'Ελληνικά';
  let word1 = [ word0, word0 ].join('-');
  let word2 = [ word0, word0 ].join(' - ');

  let tests = [
    [ '', '' ],
    [ 'The \u212B symbol invented by A. J. \u00C5ngstr\u00F6m (1814, L\u00F6gd\u00F6, \u2013 1874) denotes the length 10\u207B\u00B9\u2070 m.', 'the-å-symbol-invented-by-a-j-ångström-1814-lögdö-1874-denotes-the-length-10-10-m', { normalize: 'NFKC', lower: true } ],
    [ 'The \u212B symbol invented by A. J. \u00C5ngstr\u00F6m (1814, L\u00F6gd\u00F6, \u2013 1874) denotes the length 10\u207B\u00B9\u2070 m.', 'The-Å-symbol-invented-by-A-J-Ångström-1814-Lögdö-1874-denotes-the-length-10-¹⁰-m', { normalize: 'NFC' } ],
    [ 'Быстрее и лучше!', 'быстрее-и-лучше', { lower: true } ],
    [ 'xx x  - "#$@ x', 'xx-x-dollar-x' ],
    [ 'Bän...g (bang)', 'bäng-bang', { lower: true, remove: /[.'"]/g } ],
    [ 'Bän...g (bang)', 'Bän-g-bang' ],
    [ 'Bän…g (bang)!', 'Bän-g-bang' ],
    [ word0, word0.toLowerCase(), { lower: true } ],
    [ word1, word1.toLowerCase(), { lower: true } ],
    [ word2, word1.toLowerCase(), { lower: true } ],
    [ '    a ', 'a' ],
    [ 'tags/', 'tags' ],
    [ 'y_u_no', 'y_u_no' ],
    [ 'el-ni\xf1o', 'el-ni\xf1o' ],
    [ 'x荿', 'x荿' ],
    [ 'ϧ΃蒬蓣', 'ϧ-蒬蓣', { normalize: 'NFC' } ],
    [ '¿x', 'x' ],
    [ '汉语/漢語', '汉语-漢語' ],
    [ 'فار,سي', 'فار-سي' ],
    [ 'เแโ|ใไ', 'เแโ-ใไ', { charmap: null } ],
    [ 'เแโ|ใไ', 'เแโ-or-ใไ' ],
    [ '日本語ドキュメンテ(ーション)', '日本語ドキュメンテ-ーション' ],
    [ '一二三四五六七八九十！。。。', '一二三四五六七八九十' ],
    [ 'संसद में काम नहीं तो वेतन क्यों?', 'संसद-में-काम-नहीं-तो-वेतन-क्यों' ],
    [ 'เร่งรัด \'ปรับเงินเดือนท้องถิ่น 1 ขั้น\' ตามมติ ครม.', 'เร่งรัด-ปรับเงินเดือนท้องถิ่น-1-ขั้น-ตามมติ-ครม' ],
    [ 'オバマ大統領が病院爆撃の調査へ同意するように、協力してください！', 'オバマ大統領が病院爆撃の調査へ同意するように-協力してください' ],
    [ '일본정부 법무대신(法務大臣): 우리는 일본 입관법의 재검토를 요구한다!', '일본정부-법무대신-法務大臣-우리는-일본-입관법의-재검토를-요구한다' ],
    // Keeps character in supplementary plane (char code 77824).
    [ '\uD80C\uDC00', '\uD80C\uDC00' ],
    // Removes non-letter/digit/emo character in supplementary plane (char code 77824).
    [ '\uD80C\uDC00', '\uD80C\uDC00' ],
    [ '😁', 'grin' ],
    [ '😁a', 'grin-a' ],
    [ '🐶🐶🐶🐱', 'dog-dog-dog-cat' ],
    [ 'qbc,fe', 'qbc-fe' ],
    // Supplementary plane special purpose chars
    [ '𝄠𝄡𝄢𝄣𝄤𝄥𝄦 𝆔𝆕𝆖', '' ],
    // FE0F selector: https://github.com/jeremys/uslug/issues/6 / https://codepoints.net/U+FE0F?lang=en
    [ 'Boom ❤️', 'boom', { unemojify: false, lower: true } ]
  ];

  for (let t in tests) {
    let test = tests[t];
    it(`should pass '${test[0]}' as '${test[1]}' (test #${t + 1})`, () => {
      assert.deepStrictEqual(
        uslug(test[0], test[2]), test[1]
      );
    });
  }
});




describe('slug in filename mode', () => {

  function uslug(str, opts) {
    return slug(str, Object.assign({}, { mode: 'filename' }, opts));
  }

  let word0 = 'Ελληνικά';
  let word1 = [ word0, word0 ].join('-');
  let word2 = [ word0, word0 ].join(' - ');

  let tests = [
    [ '', '' ],
    [ 'Gooi de trossen maar los, ouwe! :: Wij gaan zeilen...', 'Gooi de trossen maar los ouwe Wij gaan zeilen...' ],
    [ 'Over / De / Boeg / Gegooid/waarom ook/niet, eigenlijk/?/punt.pdf', 'Over De Boeg Gegooid waarom ook niet eigenlijk punt.pdf' ],
    [ 'The \u212B symbol invented by A. J. \u00C5ngstr\u00F6m (1814, L\u00F6gd\u00F6, \u2013 1874) denotes the length 10\u207B\u00B9\u2070 m.', 'the a symbol invented by a. j. angstrom (1814 logdo 1874) denotes the length 10 10 m.', { normalize: 'NFKC', lower: true } ],
    [ 'The \u212B symbol invented by A. J. \u00C5ngstr\u00F6m (1814, L\u00F6gd\u00F6, \u2013 1874) denotes the length 10\u207B\u00B9\u2070 m.', 'The A symbol invented by A. J. Angstrom (1814 Logdo 1874) denotes the length 10 ¹⁰ m.', { normalize: 'NFC' } ],
    [ 'Быстрее и лучше!', 'быстрее и лучше', { lower: true, charmap: null } ],
    [ 'Быстрее и лучше!', 'bystree i luchshe', { lower: true } ],
    [ 'xx x  - "#$@ x', 'xx x dollar x' ],
    [ 'Bän...g (bang)', 'ban...g (bang)', { lower: true } ],
    [ 'Bän...g (bang)', 'Ban...g (bang)' ],
    [ 'Bän…g (bang)!', 'Ban...g (bang)' ],
    [ word0, 'ellinika', { lower: true } ],
    [ word1, 'ellinika ellinika', { lower: true } ],
    [ word2, 'ellinika ellinika', { lower: true } ],
    [ '    a ', 'a' ],
    [ 'tags/', 'tags' ],
    [ 'y_u_no', 'y_u_no' ],
    [ 'el-ni\xf1o', 'el nino' ],
    [ 'x荿', 'x荿' ],
    [ 'ϧ΃蒬蓣', 'ϧ 蒬蓣', { normalize: 'NFC' } ],
    [ '¿x', 'x' ],
    [ '汉语/漢語', '汉语 漢語' ],
    [ 'فار,سي', 'far sy' ],
    [ 'เแโ|ใไ', 'เแโ ใไ', { charmap: null } ],
    [ 'เแโ|ใไ', 'เแโ or ใไ' ],
    [ '日本語ドキュメンテ(ーション)', '日本語ドキュメンテ(ーション)' ],
    [ '一二三四五六七八九十！。。。', '一二三四五六七八九十' ],
    [ 'संसद में काम नहीं तो वेतन क्यों?', 'Sa SaTha Ma Ka Ma NaHa Ta Va TaNa Ka Ya' ],
    [ 'संसद में काम नहीं तो वेतन क्यों?', 'स सद म क म नह त व तन क य', { charmap: null } ],
    [ 'เร่งรัด \'ปรับเงินเดือนท้องถิ่น 1 ขั้น\' ตามมติ ครม.',  'เร งร ด ปร บเง นเด อนท องถ น 1 ข น ตามมต ครม.' ],
    [ 'オバマ大統領が病院爆撃の調査へ同意するように、協力してください！',  'オバマ大統領が病院爆撃の調査へ同意するように 協力してください' ],
    [ '일본정부 법무대신(法務大臣): 우리는 일본 입관법의 재검토를 요구한다!',  '일본정부 법무대신(法務大臣) 우리는 일본 입관법의 재검토를 요구한다' ],
    // Keeps character in supplementary plane (char code 77824).
    [ '\uD80C\uDC00', '\uD80C\uDC00' ],
    // Removes non-letter/digit/emo character in supplementary plane (char code 77824).
    [ '\uD80C\uDC00', '\uD80C\uDC00' ],
    [ '😁', 'grinning face with smiling eyes' ],
    [ '😁a', 'grinning face with smiling eyesa' ],
    [ '🐶🐶🐶🐱',  'dog facedog facedog facecat face' ],
    [ 'qbc,fe', 'qbc fe' ],
    // Supplementary plane special purpose chars
    [ '𝄠𝄡𝄢𝄣𝄤𝄥𝄦 𝆔𝆕𝆖', 'musical g clef ottava bassamusical c clefmusical f clefmusical f clef ottava altamusical f clef ottava bassamusical drum clef 1musical drum clef 2 musical grace note slashmusical grace note no slashmusical tr' ],
    // FE0F selector: https://github.com/jeremys/uslug/issues/6 / https://codepoints.net/U+FE0F?lang=en
    [ 'Boom ❤️', 'boom heavy heart', { unemojify: false, lower: true } ],
    [ 'Boom ❤️', 'Boom heavy heart' ]
  ];

  for (let t in tests) {
    let test = tests[t];
    it(`should pass '${test[0]}' as '${test[1]}' (test #${t + 1})`, () => {
      assert.deepStrictEqual(
        uslug(test[0], test[2]), test[1]
      );
    });
  }
});


