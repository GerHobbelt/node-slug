
import L from './L.js';
import N from './N.js';
import Z from './Z.js';
import M from './M.js';

import nodeEmoji from 'node-emoji';


let _unicodeCategory = function (code) {
  const charCode = String.fromCodePoint(code);
  if (L.exec(charCode)) return 'L';
  if (N.exec(charCode)) return 'N';
  if (Z.exec(charCode)) return 'Z';
  if (M.exec(charCode)) return 'M';
  return undefined;
};

export function unemojify(string) {
  return nodeEmoji.unemojify(string);
}

export function uslug_mode_transform(c) {
  let code = c.codePointAt(0);

      // Allow Common CJK Unified Ideographs
      // See: http://www.unicode.org/versions/Unicode6.0.0/ch12.pdf - Table 12-2
  if (0x4E00 <= code && code <= 0x9FFF) {
    return c;
  }

      // Allow Hangul
  if (0xAC00 <= code && code <= 0xD7A3) {
    return c;
  }

      // Japanese ideographic punctuation
  if ((0x3000 <= code && code <= 0x3002) || (0xFF01 <= code && code <= 0xFF02)) {
    return ' ';
  }

  let val = _unicodeCategory(code);
  if (val && ~'LNM'.indexOf(val))  {
    return c;
  }
  if (val && ~'Z'.indexOf(val)) {
    return ' ';
  }

  // let the rest be filtered by the other slug settings
  return c;
}
