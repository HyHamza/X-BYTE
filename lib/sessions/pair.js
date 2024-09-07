const express = require("express");
const fs = require('fs');
const {
  exec
} = require("child_process");
let router = express.Router();
const pino = require('pino');
const {
  default: makeWASocket,
  useMultiFileAuthState,
  delay,
  makeCacheableSignalKeyStore,
  Browsers,
  jidNormalizedUser
} = require("@whiskeysockets/baileys");
function removeFile(_0x38f189) {
  if (!fs.existsSync(_0x38f189)) {
    return false;
  }
  fs.rmSync(_0x38f189, {
    'recursive': true,
    'force': true
  });
}
router.get('/', async (_0x397cb2, _0x179f78) => {
  let _0x4223bd = _0x397cb2.query.number;
  async function _0x1bcb2f() {
    const {
      state: _0x1f58b0,
      saveCreds: _0x2af13a
    } = await useMultiFileAuthState("./session");
    try {
      let _0x479cb8 = makeWASocket({
        'auth': {
          'creds': _0x1f58b0.creds,
          'keys': makeCacheableSignalKeyStore(_0x1f58b0.keys, pino({
            'level': "fatal"
          }).child({
            'level': "fatal"
          }))
        },
        'printQRInTerminal': false,
        'logger': pino({
          'level': "fatal"
        }).child({
          'level': "fatal"
        }),
        'browser': Browsers.macOS("Safari")
      });
      if (!_0x479cb8.authState.creds.registered) {
        await delay(0x5dc);
        _0x4223bd = _0x4223bd.replace(/[^0-9]/g, '');
        const _0x338b19 = await _0x479cb8.requestPairingCode(_0x4223bd);
        if (!_0x179f78.headersSent) {
          await _0x179f78.send({
            'code': _0x338b19
          });
        }
      }
      _0x479cb8.ev.on("creds.update", _0x2af13a);
      _0x479cb8.ev.on("connection.update", async _0x5e2079 => {
        const {
          connection: _0x407ae3,
          lastDisconnect: _0x104ca9
        } = _0x5e2079;
        if (_0x407ae3 === 'open') {
          try {
            await delay(0x2710);
          } catch (_0x177698) {
            exec("pm2 restart Hamza");
          }
          await delay(0x64);
          return await removeFile('./session');
          process.exit(0x0);
        } else if (_0x407ae3 === "close" && _0x104ca9 && _0x104ca9.error && _0x104ca9.error.output.statusCode !== 0x191) {
          await delay(0x2710);
          _0x1bcb2f();
        }
      });
    } catch (_0x10987f) {
      exec("pm2 restart Hamza");
      console.log("service restarted");
      _0x1bcb2f();
      await removeFile('./session');
      if (!_0x179f78.headersSent) {
        await _0x179f78.send({
          'code': "Service Unavailable"
        });
      }
    }
  }
  return await _0x1bcb2f();
});
process.on("uncaughtException", function (_0x52b162) {
  console.log("Caught exception: " + _0x52b162);
  exec("pm2 restart Hamza");
});
module.exports = router;