
import pinyin from 'pinyin';
import unicode_symbols from 'unicode/category/So.js';
//import unorm from 'unorm';
import { unemojify, uslug_mode_transform } from './lib/uslug.js';

const removelist = [ 'sign', 'cross', 'of', 'symbol', 'staff', 'hand', 'black', 'white' ]
      .map(function (word) {
        return new RegExp(word, 'gi');
      });

const normModes = { NFC: 'NFC', NFKC: 'NFKC', NFD: 'NFD', NFKD: 'NFKD' };

function symbols(code) {
  return unicode_symbols[code];
}

function slug(content, opts) {
  if (content === null || content === undefined) {
    throw new Error('Slug input must be castable to string');
  }
  let string = content.toString();

  if (typeof opts === 'string') {
    opts = { replacement: opts };
  }
  opts = Object.assign({}, opts);
  let defaults = slug.defaults.modes[opts.mode || slug.defaults.mode];
  opts = Object.assign({}, defaults, opts);
  if (typeof opts.symbols === 'undefined') {
    opts.symbols = defaults.symbols;
  }

  let lengths = [];
  for (let key in opts.multicharmap) {
    if (!opts.multicharmap.hasOwnProperty(key)) {
      continue;
    }

    let len = key.length;
    if (lengths.indexOf(len) === -1) {
      lengths.push(len);
    }
  }

  console.error(`RAW: '${string}'`);

  //string = unorm.nfkc(string);
  if (opts.normalize) {
    string = string.normalize(normModes[opts.normalize] || 'NFC');
  }
  console.error(`nfkc: '${string}', mode:${normModes[opts.normalize]}`);

  if (opts.pinyin) {
    string = pinyin(string, { style:pinyin.STYLE_NORMAL }).join(' ');
  }
  console.error(`pinyin: '${string}'`);

  let result = '';
  for (let i = 0, l = string.length; i < l; i++) {
    let char;

    if (!lengths.some(function (len) {
      let str = string.substr(i, len);
      if (opts.multicharmap[str]) {
        i += len - 1;
        char = opts.multicharmap[str];
        return true;
      }
      return false;
    })) {
      let code = string.codePointAt(i);
      console.error(`codePoint: c:'${string[i]}' code: 0x${code.toString(16)} slice:'${string.slice(i, i + 2)}'`);

      if (code >= 0x10000) {
        char = String.fromCodePoint(code);
        i++;
      } else {
        char = string[i];
      }

      if (opts.transform) {
        char = opts.transform(char) || '';
      }
      console.error(`transform: '${char}'`);

      if (opts.charmap && opts.charmap[char]) {
        char = opts.charmap[char];
      }
      console.error(`charmap: '${char}'`);

      if (opts.symbols) {
        code = char.codePointAt(0);

        let unicode = symbols(code);
        if (unicode) {
          char = unicode.name.toLowerCase();
          for (let j = 0, rl = removelist.length; j < rl; j++) {
            char = char.replace(removelist[j], '');
          }
          char = char.trim();
        }
      }
      console.error(`symbols: '${char}'`);

      if (opts.unemojify) {
        char = unemojify(char);
      }
      console.error(`unumojify: '${char}'`);
    }

    if (opts.remove) {
      char = char.replace(opts.remove, ''); // add flavour
    }
    console.error(`removed: '${char}'`);
    if (opts.allowed) {
      char = char.replace(opts.allowed, ' '); // check for not-allowed characters
    }
    console.error(`allowed: '${char}'`);
    result += char;
  }
  console.error(`result before trim, etc: '${result}'`);
  result = result.trim(); // trim leading/trailing spaces
  result = result.replace(/\s+/g, ' '); // treat any whitespace sequence as a single space
  console.error(`result after trim: '${result}'`);

  if (opts.limit) {
    let split_array = result.split(' ');
    split_array.splice(opts.limit, split_array.length - opts.limit);
    result = split_array.join(' ');
  }
  console.error(`result after limit: '${result}'`);

  result = result.replace(/[-\s]+/g, opts.replacement); // convert spaces
  console.error(`result after replacement: '${result}'`);
  result = result.replace(new RegExp(`(?:${opts.replacement})+$`), ''); // remove trailing separator(s)
  console.error(`result after replacement tightening: '${result}'`);
  if (opts.lower) {
    result = result.toLowerCase();
  }
  console.error(`result after lowercasing: '${result}'`);
  return result;
}

slug.defaults = {
  mode: 'pretty'
};

// https://code.djangoproject.com/browser/django/trunk/django/contrib/admin/media/js/urlify.js
slug.multicharmap = slug.defaults.multicharmap = {
  '<3': 'love', '&&': 'and', '||': 'or', 'w/': 'with'
};


const languagesCharmap = {
    // latin
  À: 'A', Á: 'A', Â: 'A', Ã: 'A', Ä: 'A', Å: 'A', Æ: 'AE',
  Ç: 'C', È: 'E', É: 'E', Ê: 'E', Ë: 'E', Ì: 'I', Í: 'I',
  Î: 'I', Ï: 'I', Ð: 'D', Ñ: 'N', Ò: 'O', Ó: 'O', Ô: 'O',
  Õ: 'O', Ö: 'O', Ő: 'O', Ø: 'O', Ù: 'U', Ú: 'U', Û: 'U',
  Ü: 'U', Ű: 'U', Ý: 'Y', Þ: 'TH', ß: 'ss', à:'a', á:'a',
  â: 'a', ã: 'a', ä: 'a', å: 'a', æ: 'ae', ç: 'c', è: 'e',
  é: 'e', ê: 'e', ë: 'e', ì: 'i', í: 'i', î: 'i', ï: 'i',
  ð: 'd', ñ: 'n', ò: 'o', ó: 'o', ô: 'o', õ: 'o', ö: 'o',
  ő: 'o', ø: 'o', ù: 'u', ú: 'u', û: 'u', ü: 'u', ű: 'u',
  ý: 'y', þ: 'th', ÿ: 'y', ẞ: 'SS',
    // greek
  α:'a', β:'b', γ:'g', δ:'d', ε:'e', ζ:'z', η:'h', θ:'8',
  ι:'i', κ:'k', λ:'l', μ:'m', ν:'n', ξ:'3', ο:'o', π:'p',
  ρ:'r', σ:'s', τ:'t', υ:'y', φ:'f', χ:'x', ψ:'ps', ω:'w',
  ά:'a', έ:'e', ί:'i', ό:'o', ύ:'y', ή:'h', ώ:'w', ς:'s',
  ϊ:'i', ΰ:'y', ϋ:'y', ΐ:'i',
  Α:'A', Β:'B', Γ:'G', Δ:'D', Ε:'E', Ζ:'Z', Η:'H', Θ:'8',
  Ι:'I', Κ:'K', Λ:'L', Μ:'M', Ν:'N', Ξ:'3', Ο:'O', Π:'P',
  Ρ:'R', Σ:'S', Τ:'T', Υ:'Y', Φ:'F', Χ:'X', Ψ:'PS', Ω:'W',
  Ά:'A', Έ:'E', Ί:'I', Ό:'O', Ύ:'Y', Ή:'H', Ώ:'W', Ϊ:'I',
  Ϋ:'Y',
    // turkish
  ş:'s', Ş:'S', ı:'i', İ:'I',
  ğ:'g', Ğ:'G',
    // russian
  а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ё:'yo', ж:'zh',
  з:'z', и:'i', й:'j', к:'k', л:'l', м:'m', н:'n', о:'o',
  п:'p', р:'r', с:'s', т:'t', у:'u', ф:'f', х:'h', ц:'c',
  ч:'ch', ш:'sh', щ:'sh', ъ:'u', ы:'y', ь:'', э:'e', ю:'yu',
  я:'ya',
  А:'A', Б:'B', В:'V', Г:'G', Д:'D', Е:'E', Ё:'Yo', Ж:'Zh',
  З:'Z', И:'I', Й:'J', К:'K', Л:'L', М:'M', Н:'N', О:'O',
  П:'P', Р:'R', С:'S', Т:'T', У:'U', Ф:'F', Х:'H', Ц:'C',
  Ч:'Ch', Ш:'Sh', Щ:'Sh', Ъ:'U', Ы:'Y', Ь:'', Э:'E', Ю:'Yu',
  Я:'Ya',
    // ukranian
  Є:'Ye', І:'I', Ї:'Yi', Ґ:'G', є:'ye', і:'i', ї:'yi', ґ:'g',
    // czech
  č:'c', ď:'d', ě:'e', ň: 'n', ř:'r', š:'s', ť:'t', ů:'u',
  ž:'z', Č:'C', Ď:'D', Ě:'E', Ň: 'N', Ř:'R', Š:'S', Ť:'T',
  Ů:'U', Ž:'Z',
    // slovak
  ĺ:'l', ľ:'l', ŕ:'r', Ĺ:'L', Ľ:'L', Ŕ:'R',
    // polish
  ą:'a', ć:'c', ę:'e', ł:'l', ń:'n', ś:'s', ź:'z',
  ż:'z', Ą:'A', Ć:'C', Ę:'E', Ł:'L', Ń:'N', Ś:'S',
  Ź:'Z', Ż:'Z',
    // latvian
  ā:'a', ē:'e', ģ:'g', ī:'i', ķ:'k', ļ:'l', ņ:'n',
  ū:'u', Ā:'A', Ē:'E', Ģ:'G', Ī:'I',
  Ķ:'K', Ļ:'L', Ņ:'N', Ū:'U',
    // lithuanian
  ė:'e', į:'i', ų:'u', Ė: 'E', Į: 'I', Ų:'U',
    // romanian
  ț:'t', Ț:'T', ţ:'t', Ţ:'T', ș:'s', Ș:'S', ă:'a', Ă:'A',
    // vietnamese
  Ạ: 'A', Ả: 'A', Ầ: 'A', Ấ: 'A', Ậ: 'A', Ẩ: 'A', Ẫ: 'A',
  Ằ: 'A', Ắ: 'A', Ặ: 'A', Ẳ: 'A', Ẵ: 'A', Ẹ: 'E', Ẻ: 'E',
  Ẽ: 'E', Ề: 'E', Ế: 'E', Ệ: 'E', Ể: 'E', Ễ: 'E', Ị: 'I',
  Ỉ: 'I', Ĩ: 'I', Ọ: 'O', Ỏ: 'O', Ồ: 'O', Ố: 'O', Ộ: 'O',
  Ổ: 'O', Ỗ: 'O', Ơ: 'O', Ờ: 'O', Ớ: 'O', Ợ: 'O', Ở: 'O',
  Ỡ: 'O', Ụ: 'U', Ủ: 'U', Ũ: 'U', Ư: 'U', Ừ: 'U', Ứ: 'U',
  Ự: 'U', Ử: 'U', Ữ: 'U', Ỳ: 'Y', Ỵ: 'Y', Ỷ: 'Y', Ỹ: 'Y',
  Đ: 'D', ạ: 'a', ả: 'a', ầ: 'a', ấ: 'a', ậ: 'a', ẩ: 'a',
  ẫ: 'a', ằ: 'a', ắ: 'a', ặ: 'a', ẳ: 'a', ẵ: 'a', ẹ: 'e',
  ẻ: 'e', ẽ: 'e', ề: 'e', ế: 'e', ệ: 'e', ể: 'e', ễ: 'e',
  ị: 'i', ỉ: 'i', ĩ: 'i', ọ: 'o', ỏ: 'o', ồ: 'o', ố: 'o',
  ộ: 'o', ổ: 'o', ỗ: 'o', ơ: 'o', ờ: 'o', ớ: 'o', ợ: 'o',
  ở: 'o', ỡ: 'o', ụ: 'u', ủ: 'u', ũ: 'u', ư: 'u', ừ: 'u',
  ứ: 'u', ự: 'u', ử: 'u', ữ: 'u', ỳ: 'y', ỵ: 'y', ỷ: 'y',
  ỹ: 'y', đ: 'd',
    // georgian
  ა: 'a', ბ: 'b', გ: 'g', დ: 'd', ე: 'e', ვ: 'v', ზ: 'z',
  თ: 't', ი: 'i', კ: 'k', ლ: 'l', მ: 'm', ნ: 'n', ო: 'o',
  პ: 'p', ჟ: 'zh', რ: 'r', ს: 's', ტ: 't', უ: 'u', ფ: 'f',
  ქ: 'q', ღ: 'gh', ყ: 'k', შ: 'sh', ჩ: 'ch', ც: 'ts', ძ: 'dz',
  წ: 'ts', ჭ: 'ch', ხ: 'kh', ჯ: 'j', ჰ: 'h',
     // arabic
  أ: 'أ', ب: 'ب', ت: 'ت', ث: 'ث', ج: 'ج', ح: 'ح', خ: 'خ',
  د: 'د', ذ: 'ذ', ر: 'ر', ز: 'ز', س: 'س', ش: 'ش', ص: 'ص',
  ض: 'ض', ط: 'ط', ظ: 'ظ', ع: 'ع', غ: 'غ', ف: 'ف', ق: 'ق',
  ك: 'ك', ل: 'ل', م: 'م', ن: 'ن', ه: 'ه', و: 'و', ي: 'ي',
  ا: 'ا', ى: 'ى', ئ: 'ئ', إ: 'إ', ؤ: 'ؤ', ة: 'ة', آ: 'آ'
};

const miscSymbolsCharmap = {
    // currency
  '€': ' euro ', '₢': ' cruzeiro ', '₣': ' french franc ', '£': ' pound ',
  '₤': ' lira ', '₥': ' mill ', '₦': ' naira ', '₧': ' peseta ', '₨': ' rupee ',
  '₩': ' won ', '₪': ' new shequel ', '₫': ' dong ', '₭': 'kip ', '₮': ' tugrik ',
  '₯': ' drachma ', '₰': ' penny ', '₱': ' peso ', '₲': ' guarani ', '₳': ' austral ',
  '₴': ' hryvnia ', '₵': ' cedi ', '¢': ' cent ', '¥': ' yen ', 元: ' yuan ',
  円: ' yen ', '﷼': ' rial ', '₠': ' ecu ', '¤': ' currency ', '฿': ' baht ',
  $: ' dollar ', '₹': ' indian rupee ',
    // symbols
  '©':'(c)', œ: 'oe', Œ: 'OE', '∑': ' sum ', '®': '(r)', '†': '+',
  '“': '"', '”': '"', '‘': "'", '’': "'", '∂': 'd', ƒ: 'f', '™': '(tm)',
  '℠': '(sm)', '…': '...', '˚': 'o', º: 'o', ª: 'a', '•': '*',
  '∆': 'delta', '∞': ' infinity ', '♥': ' love ', '&': ' and ', '|': ' or ',
  '<': ' less ', '>': ' greater ', '×': 'x'
};

slug.charmap = slug.defaults.charmap = Object.assign({}, languagesCharmap, miscSymbolsCharmap);


slug.allowed = slug.defaults.allowed = /[^\w\s\d\-._~]/g;
// allow Hebrew, Arabic, Chinese, Japanese, Georgian, Greek and Cyrilic
//slug.allowed = slug.defaults.allowed = /[^\w\s\\d-._~\u0590-\u05FF\u10A0-\u10FF\u0370-\u03FF\u0600-\u06FF\u0400-\u04FF\u4E00-\u9FCC\u3000-\u303F|\u3040-\u309F|\u30A0-\u30FF|\uFF00-\uFFEF|\u4E00-\u9FAF|\u2605-\u2606|\u2190-\u2195|\u203B]/g;

slug.defaults.modes = {
  rfc3986: {
    replacement: '-',
    symbols: true,
    unemojify: true,
    normalize: 'NFKC',
    remove: /['"]/g,
    lower: true,
    pinyin: true,
    transform: null,
    allowed: slug.defaults.allowed,
    charmap: slug.defaults.charmap,
    multicharmap: slug.defaults.multicharmap
  },
  pretty: {
    replacement: '-',
    symbols: true,
    unemojify: true,
    normalize: 'NFKC',
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
    normalize: 'NFKC',
    remove: null,
    allowed: /[^\p{L}\p{M}\p{N}_~\-]/gu,
    lower: false,
    pinyin: false,
    transform: uslug_mode_transform,
    charmap: miscSymbolsCharmap,
    multicharmap: slug.defaults.multicharmap
  }
};

export default slug;
