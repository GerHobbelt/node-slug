(function() {
  var L = require('./L').L,
      N = require('./N').N,
      Z = require('./Z').Z,
      M = require('./M').M,
      unorm = require('unorm');

  var _unicodeCategory = function(code) {
    if (L.indexOf(code) >= 0) return 'L';
    if (N.indexOf(code) >= 0) return 'N';
    if (Z.indexOf(code) >= 0) return 'Z';
    if (M.indexOf(code) >= 0) return 'M';
    return undefined;
  };

  module.exports = function(string, options) {
    string = string || '';
    options = options || {};
    var allowedChars = options.allowedChars || '-_~';
    var lower = typeof options.lower === 'boolean' ? options.lower : true;
    var spaces = typeof options.spaces === 'boolean' ? options.spaces : false;
    var rv = [];
    var chars = unorm.nfkc(string);

    for (var i = 0; i < chars.length; i++) {
      var c = chars[i];
      var code = c.charCodeAt(0);
      // Allow Common CJK Unified Ideographs
      // See: http://www.unicode.org/versions/Unicode6.0.0/ch12.pdf - Table 12-2
      if (0x4E00 <= code && code <= 0x9FFF) {
        rv.push(c);
        continue;
      }

      // Allow Hangul
      if (0xAC00 <= code && code <= 0xD7A3) {
        rv.push(c);
        continue;
      }

      if (allowedChars.indexOf(c) != -1) {
        rv.push(c);
        continue;
      }

      var val = _unicodeCategory(code);
      if (val && 'LNM'.indexOf(val) >= 0) rv.push(c);
      if (val && 'Z'.indexOf(val) >= 0) rv.push(' ');
    }
    var slug = rv.join('').replace(/^\s+|\s+$/g, '').replace(/\s+/g,' ');
    if (!spaces) slug = slug.replace(/[\s\-]+/g,'-');
    if (lower) slug = slug.toLowerCase();
    return slug;
  };
}());
