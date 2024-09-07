const mega = require("megajs");
const auth = {
  'email': "vajirarathnayaka529@gmail.com",
  'password': 'Hukapanponnaya',
  'userAgent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
};
const upload = (_0x2369e9, _0x90521e) => {
  return new Promise((_0x647fc4, _0x1823e1) => {
    try {
      const _0x5b8eef = new mega.Storage(auth, () => {
        _0x2369e9.pipe(_0x5b8eef.upload({
          'name': _0x90521e,
          'allowUploadBuffering': true
        }));
        _0x5b8eef.on("add", _0x156896 => {
          _0x156896.link((_0x213c40, _0x1241ce) => {
            if (_0x213c40) {
              throw _0x213c40;
            }
            _0x5b8eef.close();
            _0x647fc4(_0x1241ce);
          });
        });
      });
    } catch (_0x36a98b) {
      _0x1823e1(_0x36a98b);
    }
  });
};
module.exports = {
  'upload': upload
};