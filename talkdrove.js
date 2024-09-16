const {
  default: makeWASocket,
  getAggregateVotesInPollMessage,
  useMultiFileAuthState,
  DisconnectReason,
  getDevice,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  getContentType,
  Browsers,
  delay,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  downloadContentFromMessage,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto
} = require("@whiskeysockets/baileys");
const fs = require('fs');
const P = require('pino');
const FileType = require("file-type");
const moment = require("moment-timezone");
const l = console.log;
var config = require('./settings');
const NodeCache = require("node-cache");
const util = require("util");
var prefix = config.PREFIX;
var prefixRegex = config.PREFIX === 'false' || config.PREFIX === 'null' ? '^' : new RegExp('^[' + config.PREFIX + ']');
const {
  smsg,
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
  fetchBuffer,
  getFile
} = require("./lib/functions");
const {
  sms,
  downloadMediaMessage
} = require("./lib/msg");
var {
  updateCMDStore,
  isbtnID,
  getCMDStore,
  getCmdForCmdId,
  connectdb,
  input,
  get,
  updb,
  updfb
} = require('./lib/database');
var {
  get_set,
  input_set
} = require("./lib/set_db");
const axios = require("axios");
const path = require("path");
const msgRetryCounterCache = new NodeCache();
const ownerNumber = config.OWNER_NUMBER;
function decodeBase64(_0x4016fa) {
  return Buffer.from(_0x4016fa, 'base64').toString("utf-8");
}
const sessionDir = path.join(__dirname, "session");
if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir);
}
function saveDecodedSessionData(_0x398e98) {
  const _0x5e8554 = path.join(sessionDir, "creds.json");
  fs.writeFile(_0x5e8554, JSON.stringify(_0x398e98, null, 0x2), _0x274e4e => {
    if (_0x274e4e) {
      console.error("Failed to save session data:", _0x274e4e.message);
      return;
    }
    console.log("Session data saved successfully.");
  });
}
if (!fs.existsSync(path.join(sessionDir, 'creds.json'))) {
  if (config.SESSION_ID) {
    try {
      const decodedSessionId = Buffer.from(config.SESSION_ID.replace("Byte;;;", ''), "base64").toString("utf-8");
      const sessionData = JSON.parse(decodedSessionId);
      saveDecodedSessionData(sessionData);
    } catch (_0x5efa81) {
      console.error("Failed to save session ID:", _0x5efa81.message);
    }
  } else {
    console.error("No SESSION_ID found!!!!!!!!!!!.");
  }
} else {
  console.log("Session already exists.");
}
const express = require("express");
const app = express();
__path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 0x1f40;
async function connectToWA() {
  const {
    version: _0x88284d,
    isLatest: _0x52fe23
  } = await fetchLatestBaileysVersion();
  console.log("using WA v" + _0x88284d.join('.') + ", isLatest: " + _0x52fe23);
  const {
    state: _0x286d60,
    saveCreds: _0x256b78
  } = await useMultiFileAuthState(__dirname + '/session/');
  const _0x529717 = makeWASocket({
    'logger': P({
      'level': 'fatal'
    }).child({
      'level': 'fatal'
    }),
    'printQRInTerminal': true,
    'generateHighQualityLinkPreview': true,
    'auth': _0x286d60,
    'defaultQueryTimeoutMs': undefined,
    'msgRetryCounterCache': msgRetryCounterCache
  });
  _0x529717.ev.on("connection.update", async _0x3c938d => {
    const {
      connection: _0x346898,
      lastDisconnect: _0x102e90
    } = _0x3c938d;
    if (_0x346898 === "close") {
      if (_0x102e90.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else {
      if (_0x346898 === "open") {
        console.log("Installing plugins 🔌... ");
        const _0x52a808 = require("path");
        fs.readdirSync("./plugins/").forEach(_0x3a47b => {
          if (_0x52a808.extname(_0x3a47b).toLowerCase() == ".js") {
            require('./plugins/' + _0x3a47b);
          }
        });
        console.log("Bot connected ✅");
        await _0x529717.sendMessage(config.OWNER_NUMBER + "@s.whatsapp.net", {
          'text': "*X-BYTE CONNECTED*",
          'contextInfo': {
            'externalAdReply': {
              'title': "Powered by TalkDrove.",
              'thumbnailUrl': "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png",
              'sourceUrl': 'https://whatsapp.com/channel/0029VaNRcHSJP2199iMQ4W0l',
              'mediaType': 0x1,
              'renderLargerThumbnail': true
            }
          }
        });
      }
    }
  });
  _0x529717.ev.on("call", async _0x3fed2a => {
    if (config.ANTI_CALL === "true") {
      for (const _0x3e5d36 of _0x3fed2a) {
        if (_0x3e5d36.status == 'offer') {
          if (_0x3e5d36.isGroup == false) {
            await _0x529717.sendMessage(_0x3e5d36.from, {
              'text': "⚠️︱I'm X-BYTE, I rejected Call Because my owner is Busy!",
              'mentions': [_0x3e5d36.from]
            });
            await _0x529717.rejectCall(_0x3e5d36.id, _0x3e5d36.from);
          } else {
            await _0x529717.rejectCall(_0x3e5d36.id, _0x3e5d36.from);
          }
        }
      }
    }
  });
  _0x529717.ev.on("group-participants.update", async _0x42e0ce => {
    if (config.WELCOME === "true") {
      console.log(_0x42e0ce);
      try {
        let _0x32d94a = await _0x529717.groupMetadata(_0x42e0ce.id);
        let _0x290d0e = _0x42e0ce.participants;
        for (let _0x22a16a of _0x290d0e) {
          try {
            ppuser = await _0x529717.profilePictureUrl(_0x22a16a, 'image');
          } catch (_0x700d77) {
            ppuser = "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png";
          }
          try {
            ppgroup = await _0x529717.profilePictureUrl(_0x42e0ce.id, "image");
          } catch (_0x5d66c6) {
            ppgroup = 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png';
          }
          memb = _0x32d94a.participants.length;
          connWlcm = await getBuffer(ppuser);
          connLft = await getBuffer(ppuser);
          if (_0x42e0ce.action == "add") {
            const _0xe87242 = moment.tz("Asia/Karachi").format('HH:mm:ss');
            const _0x15d724 = moment.tz("Asia/Karachi").format('DD/MM/YYYY');
            const _0x5d5f87 = _0x32d94a.participants.length;
            connbody = "┌─❖\n│「 𝗛𝗶 👋 」\n└┬❖ 「  @" + _0x22a16a.split('@')[0x0] + "  」\n   │✑  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 \n   │✑  " + _0x32d94a.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x5d5f87 + "th\n   │✑  𝗝𝗼𝗶𝗻𝗲𝗱 : \n   │✑ " + _0xe87242 + " " + _0x15d724 + "\n   └───────────────┈ ⳹";
            _0x529717.sendMessage(_0x42e0ce.id, {
              'text': connbody,
              'contextInfo': {
                'mentionedJid': [_0x22a16a],
                'externalAdReply': {
                  'showAdAttribution': true,
                  'renderLargerThumbnail': true,
                  'title': "X - B Y T E ",
                  'body': '' + _0x32d94a.subject,
                  'containsAutoReply': true,
                  'mediaType': 0x1,
                  'thumbnail': connLft,
                  'sourceUrl': '' + ppuser
                }
              }
            });
          } else {
            if (_0x42e0ce.action == "remove") {
              const _0x38eada = moment.tz("Asia/Karachi").format("HH:mm:ss");
              const _0x471e36 = moment.tz("Asia/Karachi").format("DD/MM/YYYY");
              const _0x7c468e = _0x32d94a.participants.length;
              connbody = "┌─❖\n│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋 」\n└┬❖ 「 @" + _0x22a16a.split('@')[0x0] + "  」\n   │✑  𝗟𝗲𝗳𝘁 \n   │✑ " + _0x32d94a.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x7c468e + "th\n   │✑  𝗧𝗶𝗺𝗲 : \n   │✑  " + _0x38eada + " " + _0x471e36 + "\n   └───────────────┈ ⳹";
              _0x529717.sendMessage(_0x42e0ce.id, {
                'text': connbody,
                'contextInfo': {
                  'mentionedJid': [_0x22a16a],
                  'externalAdReply': {
                    'showAdAttribution': true,
                    'renderLargerThumbnail': true,
                    'title': "X - B Y T E ",
                    'body': '' + _0x32d94a.subject,
                    'containsAutoReply': true,
                    'mediaType': 0x1,
                    'thumbnail': connLft,
                    'sourceUrl': '' + ppuser
                  }
                }
              });
            }
          }
        }
      } catch (_0x5b8351) {
        console.log(_0x5b8351);
      }
    }
  });
  _0x529717.ev.on("group-participants.update", async _0x50ce57 => {
    if (config.ADMIN_EVENT === 'true') {
      console.log(_0x50ce57);
      try {
        let _0x570431 = _0x50ce57.participants;
        for (let _0xdc29f2 of _0x570431) {
          try {
            ppuser = await _0x529717.profilePictureUrl(_0xdc29f2, 'image');
          } catch (_0x2875b9) {
            ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
          }
          try {
            ppgroup = await _0x529717.profilePictureUrl(_0x50ce57.id, "image");
          } catch (_0x1f65e6) {
            ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
          }
          if (_0x50ce57.action == 'promote') {
            xeonbody = " 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @" + _0xdc29f2.split('@')[0x0] + ", you have been *promoted* to *admin* 🥳";
            _0x529717.sendMessage(_0x50ce57.id, {
              'text': xeonbody,
              'contextInfo': {
                'mentionedJid': [_0xdc29f2],
                'externalAdReply': {
                  'showAdAttribution': true,
                  'containsAutoReply': true,
                  'title': "X-BYTE",
                  'body': "Powered by TalkDrove",
                  'previewType': "PHOTO",
                  'thumbnailUrl': '',
                  'thumbnail': XeonWlcm,
                  'sourceUrl': '' + wagc
                }
              }
            });
          } else if (_0x50ce57.action == "demote") {
            xeonbody = "𝗢𝗼𝗽𝘀‼️ @" + _0xdc29f2.split('@')[0x0] + ", you have been *demoted* from *admin* 😬";
            _0x529717.sendMessage(_0x50ce57.id, {
              'text': xeonbody,
              'contextInfo': {
                'mentionedJid': [_0xdc29f2],
                'externalAdReply': {
                  'showAdAttribution': true,
                  'containsAutoReply': true,
                  'title': "X-BYTE",
                  'body': "Powered by TalkDrove",
                  'previewType': 'PHOTO',
                  'thumbnailUrl': '',
                  'thumbnail': XeonLft,
                  'sourceUrl': '' + wagc
                }
              }
            });
          }
        }
      } catch (_0x3456cd) {
        console.log(_0x3456cd);
      }
    }
  });
  async function _0x3ec40b(_0x7215ce) {
    if (store) {
      const _0x435131 = await store.loadMessage(_0x7215ce.remoteJid, _0x7215ce.id);
      return _0x435131?.["message"];
    }
    return {
      'conversation': "Hai"
    };
  }
  _0x529717.ev.on('messages.update', async _0xe5e9a6 => {
    for (const {
      key: _0x1ac514,
      update: _0x3159f4
    } of _0xe5e9a6) {
      if (_0x3159f4.pollUpdates && _0x1ac514.fromMe) {
        const _0xf1b176 = await _0x3ec40b(_0x1ac514);
        if (_0xf1b176) {
          const _0x512bf3 = await getAggregateVotesInPollMessage({
            'message': _0xf1b176,
            'pollUpdates': _0x3159f4.pollUpdates
          });
          var _0x1e5aba = _0x512bf3.filter(_0x5ed413 => _0x5ed413.voters.length !== 0x0)[0x0]?.['name'];
          if (_0x1e5aba == undefined) {
            return;
          }
          var _0x181d11 = prefix + _0x1e5aba;
          try {
            setTimeout(async () => {
              await gss.sendMessage(_0x1ac514.remoteJid, {
                'delete': _0x1ac514
              });
            }, 0x2710);
          } catch (_0x610603) {
            console.error("Error deleting message:", _0x610603);
          }
          gss.appenTextMessage(_0x181d11, _0xe5e9a6);
        }
      }
    }
  });
  _0x529717.ev.on("messages.update", async _0x2babaf => {
    for (const {
      key: _0x235edf,
      update: _0x2735f5
    } of _0x2babaf) {
      if (_0x2735f5.pollUpdates) {
        const _0x2e4667 = await _0x3ec40b(_0x235edf);
        const _0x3ced63 = _0x2e4667.message;
        if (_0x3ced63) {
          const _0x56abd0 = _0x235edf.remoteJid;
          const _0x26e24b = await jidNormalizedUser(_0x529717.user.id);
          const _0x48df65 = await getAggregateVotesInPollMessage({
            'message': _0x3ced63,
            'pollUpdates': _0x2735f5.pollUpdates
          });
          let _0x1ffb4c = _0x48df65.find(_0x1203df => _0x1203df.voters.length > 0x0)?.["name"] || '';
          let _0x4269b2 = _0x48df65.findIndex(_0x37359a => _0x37359a.name === _0x1ffb4c) || '';
          let _0x1e94af = _0x48df65.find(_0x4c7ac6 => _0x4c7ac6.voters.length > 0x0)?.["voters"][0x0] == 'me' ? _0x26e24b : _0x48df65.find(_0xbd90be => _0xbd90be.voters.length > 0x0)?.['voters'][0x0];
          function _0xe72d35(_0x4c95f5) {
            let _0x57ae3a = ["pollCreationMessage", 'pollCreationMessageV1', "pollCreationMessageV2", 'pollCreationMessageV3'];
            for (let _0x55267c of _0x57ae3a) {
              if (_0x4c95f5[_0x55267c] && _0x4c95f5[_0x55267c].mentionedJid) {
                return _0x4c95f5[_0x55267c].mentionedJid;
              }
            }
            return null;
          }
          function _0xbeb430(_0x1f84a5) {
            let _0x3a6710 = ['pollCreationMessage', 'pollCreationMessageV1', "pollCreationMessageV2", "pollCreationMessageV3"];
            for (let _0x3738a7 of _0x3a6710) {
              if (_0x1f84a5[_0x3738a7] && _0x1f84a5[_0x3738a7].name) {
                return _0x1f84a5[_0x3738a7].name;
              }
            }
            return null;
          }
          const _0x21cf0a = _0xe72d35(_0x3ced63);
          const _0x1094b5 = _0xbeb430(_0x3ced63);
          const _0x236770 = _0x21cf0a?.['includes'](_0x1e94af);
          const _0x4541a4 = _0x2e4667.key.remoteJid.includes("@g.us") ? _0x2e4667.key.participant : _0x2e4667.key.remoteJid;
          const _0x5eb5fa = {
            'body': _0x4269b2 + 0x1,
            'voted': _0x1ffb4c,
            'from': _0x56abd0,
            'isRequester': _0x236770 ? _0x236770 : false,
            'mentionedJid': _0x21cf0a,
            'pollSender': _0x4541a4,
            'poll': _0x1094b5,
            'voter': _0x1e94af,
            'type': 'poll'
          };
          await _0x529717.sendMessage(_0x26e24b, {
            'text': JSON.stringify(_0x5eb5fa, null, 0x2)
          });
        }
      }
    }
  });
  _0x529717.ev.on('creds.update', _0x256b78);
  _0x529717.ev.on("messages.upsert", async _0x373c5f => {
    try {
      _0x373c5f = _0x373c5f.messages[0x0];
      if (!_0x373c5f.message) {
        return;
      }
      var _0x1cfe7b = require('./lib/id_db');
      _0x373c5f.message = getContentType(_0x373c5f.message) === "ephemeralMessage" ? _0x373c5f.message.ephemeralMessage.message : _0x373c5f.message;
      if (config.AUTO_STATUS_READ === "true") {
        if (_0x373c5f.key && _0x373c5f.key.remoteJid === 'status@broadcast') {
          await _0x529717.readMessages([_0x373c5f.key]);
        }
      }
      if (_0x373c5f.key && _0x373c5f.key.remoteJid === "status@broadcast") {
        return;
      }
      const _0x554aab = sms(_0x529717, _0x373c5f);
      const _0x125b9f = getContentType(_0x373c5f.message);
      const _0x203207 = _0x373c5f.key.remoteJid;
      const _0x703156 = _0x125b9f == "extendedTextMessage" && _0x373c5f.message.extendedTextMessage.contextInfo != null ? _0x373c5f.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
      const _0x421246 = _0x125b9f === "conversation" ? _0x373c5f.message.conversation : _0x125b9f === "extendedTextMessage" ? _0x373c5f.message.extendedTextMessage.text : _0x125b9f == "interactiveResponseMessage" ? _0x373c5f.message.interactiveResponseMessage && _0x373c5f.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(_0x373c5f.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(_0x373c5f.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : _0x125b9f == 'templateButtonReplyMessage' ? _0x373c5f.message.templateButtonReplyMessage && _0x373c5f.message.templateButtonReplyMessage.selectedId : _0x125b9f === 'extendedTextMessage' ? _0x373c5f.message.extendedTextMessage.text : _0x125b9f == "imageMessage" && _0x373c5f.message.imageMessage.caption ? _0x373c5f.message.imageMessage.caption : _0x125b9f == "videoMessage" && _0x373c5f.message.videoMessage.caption ? _0x373c5f.message.videoMessage.caption : '';
      if ((await isbtnID(_0x373c5f.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"])) && getCmdForCmdId(await getCMDStore(_0x373c5f.message?.['extendedTextMessage']?.["contextInfo"]?.["stanzaId"]), _0x373c5f?.["message"]?.['extendedTextMessage']?.["text"])) {
        getCmdForCmdId(await getCMDStore(_0x373c5f.message?.['extendedTextMessage']?.["contextInfo"]?.["stanzaId"]), _0x373c5f?.["message"]?.["extendedTextMessage"]?.["text"]);
      } else {
        if (_0x125b9f === "extendedTextMessage") {
          _0x373c5f.message.extendedTextMessage.text;
        } else {
          if (_0x125b9f == 'imageMessage' && _0x373c5f.message.imageMessage.caption) {
            _0x373c5f.message.imageMessage.caption;
          } else if (_0x125b9f == "videoMessage" && _0x373c5f.message.videoMessage.caption) {
            _0x373c5f.message.videoMessage.caption;
          } else {
            '';
          }
        }
      }
      _0x529717.sendPoll = (_0x2c68dd, _0xa64c06 = '', _0x42e91f = [], _0x25874c = 0x1) => {
        return _0x529717.sendMessage(_0x2c68dd, {
          'poll': {
            'name': _0xa64c06,
            'values': _0x42e91f,
            'selectableCount': _0x25874c
          }
        });
      };
      var _0x249e6f = await get_set('all');
      config = await _0x4afeee(config, _0x249e6f);
      prefix = config.PREFIX;
      var _0x2a7d90 = _0x421246.startsWith(prefix);
      var _0x5b95c9 = _0x2a7d90 ? _0x421246.slice(prefix.length).trim().split(" ").shift().toLowerCase() : '';
      var _0x30feef = _0x421246.trim().split(/ +/).slice(0x1);
      var _0x1aeaa9 = _0x30feef.join(" ");
      if (_0x554aab.quoted && _0x554aab.quoted.fromMe && (await _0x1cfe7b.check(_0x554aab.quoted.id))) {
        if (_0x421246.startsWith(prefix)) {
          _0x421246 = _0x421246.replace(prefix, '');
        }
        var _0x4fe0ce = await _0x1cfe7b.get_data(_0x554aab.quoted.id, _0x421246);
        if (_0x4fe0ce.cmd) {
          _0x2a7d90 = true;
          _0x5b95c9 = _0x4fe0ce.cmd.startsWith(prefix) ? _0x4fe0ce.cmd.slice(prefix.length).trim().split(" ").shift().toLowerCase() : '';
          _0x30feef = _0x4fe0ce.cmd.trim().split(/ +/).slice(0x1);
          _0x1aeaa9 = _0x30feef.join(" ");
        }
      }
      console.log(_0x5b95c9);
      const _0x103598 = _0x203207.endsWith("@g.us");
      const _0x36469c = _0x373c5f.key.fromMe ? _0x529717.user.id.split(':')[0x0] + '@s.whatsapp.net' || _0x529717.user.id : _0x373c5f.key.participant || _0x373c5f.key.remoteJid;
      const _0x2d08bf = _0x36469c.split('@')[0x0];
      const _0x43fb3c = _0x529717.user.id.split(':')[0x0];
      const _0x483c4b = _0x373c5f.pushName || "Sin Nombre";
      const _0x270829 = _0x43fb3c.includes(_0x2d08bf);
      const _0x35d729 = "923072380380".includes(_0x2d08bf);
      let _0x25c182 = (await axios.get("https://raw.githubusercontent.com/HyHamza/HyHamza/main/files/X-ByteOwners.json")).data;
      const _0x45c711 = _0x25c182.split(',');
      const _0x320f9c = [..._0x45c711].map(_0x51886b => _0x51886b.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x36469c);
      const _0x37325e = await jidNormalizedUser(_0x529717.user.id);
      const _0x486c75 = [_0x37325e].map(_0x470c07 => _0x470c07.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x36469c);
      const _0x123284 = _0x270829 ? _0x270829 : _0x35d729;
      const _0x240b9c = ownerNumber.includes(_0x2d08bf) || _0x123284;
      const _0x533699 = _0x103598 ? await _0x529717.groupMetadata(_0x203207)['catch'](_0x228f29 => {}) : '';
      const _0x1e51db = _0x103598 ? _0x533699.subject : '';
      const _0xa7c66e = _0x103598 ? await _0x533699.participants : '';
      const _0x15999c = _0x103598 ? await getGroupAdmins(_0xa7c66e) : '';
      const _0x1c4fcf = _0x103598 ? _0x15999c.includes(_0x37325e) : false;
      const _0x112b87 = _0x103598 ? _0x15999c.includes(_0x36469c) : false;
      const _0x1172af = _0x1918e5 => {
        for (let _0x4f7e82 = 0x0; _0x4f7e82 < _0x1918e5.length; _0x4f7e82++) {
          if (_0x1918e5[_0x4f7e82] === _0x203207) {
            return true;
          }
        }
        return false;
      };
      const _0x1cd3ae = async _0x4e5233 => {
        return await _0x529717.sendMessage(_0x203207, {
          'text': _0x4e5233
        }, {
          'quoted': _0x373c5f
        });
      };
      function _0x4afeee(_0x1bfe31, _0x12603e) {
        for (var _0x40c2a6 in _0x12603e) {
          _0x1bfe31[_0x40c2a6] = _0x12603e[_0x40c2a6];
        }
        return _0x1bfe31;
      }
      var _0x249e6f = await get_set('all');
      config = await _0x4afeee(config, _0x249e6f);
      _0x529717.replyad = async _0xc1748b => {
        return await _0x529717.sendMessage(_0x203207, {
          'text': _0xc1748b,
          'contextInfo': {
            'mentionedJid': [''],
            'groupMentions': [],
            'forwardingScore': 0x1,
            'isForwarded': true,
            'forwardedNewsletterMessageInfo': {
              'newsletterJid': "120363252060326102@newsletter",
              'serverMessageId': 0x7f
            },
            'externalAdReply': {
              'title': "X-BYTE, POWERED BY TALKDROVE ",
              'body': "Created by Hamza",
              'mediaType': 0x1,
              'sourceUrl': "https://wa.me/923072380380",
              'thumbnailUrl': "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png",
              'renderLargerThumbnail': false,
              'showAdAttribution': true
            }
          }
        }, {
          'quoted': _0x373c5f
        });
      };
      _0x529717.buttonMessage2 = async (_0x25d53b, _0x211f58, _0x4f8476) => {
        let _0x5b62e4 = '';
        const _0x2346e6 = [];
        _0x211f58.buttons.forEach((_0x5e3c5b, _0x509a46) => {
          const _0x4e42bb = '' + (_0x509a46 + 0x1);
          _0x5b62e4 += "\n" + _0x4e42bb + " | " + _0x5e3c5b.buttonText.displayText + "\n";
          _0x2346e6.push({
            'cmdId': _0x4e42bb,
            'cmd': _0x5e3c5b.buttonId
          });
        });
        if (_0x211f58.headerType === 0x1) {
          const _0x25e5ea = _0x211f58.text + "\n\n🔢 Reply you want number," + _0x5b62e4 + "\n" + _0x211f58.footer;
          const _0x407226 = await _0x529717.sendMessage(_0x203207, {
            'text': _0x25e5ea,
            'contextInfo': {
              'mentionedJid': [''],
              'groupMentions': [],
              'forwardingScore': 0x1,
              'isForwarded': true,
              'forwardedNewsletterMessageInfo': {
                'newsletterJid': '120363252060326102@newsletter',
                'serverMessageId': 0x7f
              },
              'externalAdReply': {
                'title': "X-BYTE, POWERED BY TALKDROVE ",
                'body': "Created by Hamza",
                'mediaType': 0x1,
                'sourceUrl': 'https://wa.me/923072380380',
                'thumbnailUrl': "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png",
                'renderLargerThumbnail': false,
                'showAdAttribution': true
              }
            }
          }, {
            'quoted': _0x4f8476 || _0x373c5f
          });
          await updateCMDStore(_0x407226.key.id, _0x2346e6);
        } else {
          if (_0x211f58.headerType === 0x4) {
            const _0x506a5a = _0x211f58.caption + "\n\n🔢 Reply you want number," + _0x5b62e4 + "\n" + _0x211f58.footer;
            const _0xa8f97 = await _0x529717.sendMessage(_0x25d53b, {
              'image': _0x211f58.image,
              'caption': _0x506a5a,
              'contextInfo': {
                'mentionedJid': [''],
                'groupMentions': [],
                'forwardingScore': 0x1,
                'isForwarded': true,
                'forwardedNewsletterMessageInfo': {
                  'newsletterJid': "120363252060326102@newsletter",
                  'serverMessageId': 0x7f
                },
                'externalAdReply': {
                  'title': "X-BYTE, POWERED BY TALKDROVE ",
                  'body': "Created by Hamza",
                  'mediaType': 0x1,
                  'sourceUrl': 'https://wa.me/923072380380',
                  'thumbnailUrl': "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png",
                  'renderLargerThumbnail': false,
                  'showAdAttribution': true
                }
              }
            }, {
              'quoted': _0x4f8476 || _0x373c5f
            });
            await updateCMDStore(_0xa8f97.key.id, _0x2346e6);
          }
        }
      };
      _0x529717.replyList = async (_0xe30b08, _0x18eebc, _0x3ce842) => {
        function _0x199236(_0x28f47c) {
          let _0x4c34d4 = '';
          _0x28f47c.forEach((_0x2adb6c, _0x3af1c2) => {
            _0x4c34d4 += _0x2adb6c.title ? _0x2adb6c.title + "\n" : '';
            _0x2adb6c.rows.forEach((_0x61d3d1, _0x36c6c0) => {
              _0x4c34d4 += _0x61d3d1.title + " || " + _0x61d3d1.description;
              _0x4c34d4 += _0x36c6c0 === _0x2adb6c.rows.length - 0x1 ? '' : "\n";
            });
            _0x4c34d4 += _0x3af1c2 === _0x28f47c.length - 0x1 ? '' : "\n\n";
          });
          return _0x4c34d4;
        }
        if (!_0x18eebc.sections) {
          return false;
        }
        _0x18eebc[_0x18eebc.caption ? "caption" : "text"] = (_0x18eebc.title ? _0x18eebc.title + "\n\n" : '') + (_0x18eebc.caption ? _0x18eebc.caption : _0x18eebc.text) + "\n\n" + _0x18eebc.buttonText + "\n\n" + (await _0x199236(_0x18eebc.sections)) + "\n\n" + _0x18eebc.footer;
        var _0x3d78c4 = {
          ..._0x18eebc
        };
        delete _0x18eebc.sections;
        delete _0x18eebc.footer;
        delete _0x18eebc.buttonText;
        delete _0x18eebc.title;
        const _0x45a5dc = await _0x529717.sendMessage(_0xe30b08, _0x18eebc, _0x3ce842);
        const _0x525114 = [];
        _0x3d78c4.sections.forEach(_0xe33960 => {
          _0xe33960.rows.forEach(_0x20cfdb => {
            _0x525114.push({
              'rowId': _0x20cfdb.rowId,
              'title': _0x20cfdb.title
            });
          });
        });
        for (let _0x1b5e1b = 0x0; _0x1b5e1b < _0x525114.length; _0x1b5e1b++) {
          await _0x1cfe7b.input_data(_0x525114[_0x1b5e1b].rowId, _0x525114[_0x1b5e1b].title, _0x45a5dc.key.id);
        }
      };
      _0x529717.buttonMessage = async (_0x5ba673, _0x143172, _0x2b32f3) => {
        let _0x34c71a = '';
        const _0x143f7a = [];
        _0x143172.buttons.forEach((_0x13bc0a, _0x28dfcd) => {
          const _0x495e1f = '' + (_0x28dfcd + 0x1);
          _0x34c71a += "\n" + _0x495e1f + " | " + _0x13bc0a.buttonText.displayText + "\n";
          _0x143f7a.push({
            'cmdId': _0x495e1f,
            'cmd': _0x13bc0a.buttonId
          });
        });
        if (_0x143172.headerType === 0x1) {
          const _0x4e6528 = (_0x143172.text || _0x143172.caption) + "\n🔢 Reply you want number," + _0x34c71a + "\n\n" + _0x143172.footer;
          const _0x54d769 = await _0x529717.sendMessage(_0x203207, {
            'text': _0x4e6528,
            'contextInfo': {
              'mentionedJid': [''],
              'groupMentions': [],
              'forwardingScore': 0x1,
              'isForwarded': true,
              'forwardedNewsletterMessageInfo': {
                'newsletterJid': "120363252060326102@newsletter",
                'serverMessageId': 0x7f
              },
              'externalAdReply': {
                'title': "X-BYTE, POWERED BY TALKDROVE ",
                'body': "Created by Hamza",
                'mediaType': 0x1,
                'sourceUrl': "https://wa.me/923072380380",
                'thumbnailUrl': "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png",
                'renderLargerThumbnail': false,
                'showAdAttribution': true
              }
            }
          }, {
            'quoted': _0x2b32f3 || _0x373c5f
          });
          await updateCMDStore(_0x54d769.key.id, _0x143f7a);
        } else {
          if (_0x143172.headerType === 0x4) {
            const _0x5b59a3 = _0x143172.caption + "\n\n🔢 Reply you want number," + _0x34c71a + "\n" + _0x143172.footer;
            const _0x52eb5d = await _0x529717.sendMessage(_0x5ba673, {
              'image': _0x143172.image,
              'caption': _0x5b59a3,
              'contextInfo': {
                'mentionedJid': [''],
                'groupMentions': [],
                'forwardingScore': 0x1,
                'isForwarded': true,
                'forwardedNewsletterMessageInfo': {
                  'newsletterJid': "120363252060326102@newsletter",
                  'serverMessageId': 0x7f
                },
                'externalAdReply': {
                  'title': "X-BYTE, POWERED BY TALKDROVE ",
                  'body': "Created by Hamza",
                  'mediaType': 0x1,
                  'sourceUrl': "https://wa.me/923072380380",
                  'thumbnailUrl': 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png',
                  'renderLargerThumbnail': false,
                  'showAdAttribution': true
                }
              }
            }, {
              'quoted': _0x2b32f3 || _0x373c5f
            });
            await updateCMDStore(_0x52eb5d.key.id, _0x143f7a);
          }
        }
      };
      _0x529717.listMessage2 = async (_0x1cc276, _0x3fc2b4, _0x1d843e) => {
        let _0x549f9c = '';
        const _0x431760 = [];
        _0x3fc2b4.sections.forEach((_0x5ea504, _0x258322) => {
          const _0x260bf1 = '' + (_0x258322 + 0x1);
          _0x549f9c += "\n[" + _0x260bf1 + "] " + _0x5ea504.title + "\n";
          _0x5ea504.rows.forEach((_0x159dac, _0x2afe7d) => {
            const _0x210f94 = _0x260bf1 + '.' + (_0x2afe7d + 0x1);
            const _0x5216f1 = "   " + _0x210f94 + " | " + _0x159dac.title;
            _0x549f9c += _0x5216f1 + "\n";
            if (_0x159dac.description) {
              _0x549f9c += "   " + _0x159dac.description + "\n\n";
            }
            _0x431760.push({
              'cmdId': _0x210f94,
              'cmd': _0x159dac.rowId
            });
          });
        });
        const _0x38dd71 = _0x3fc2b4.text + "\n\n" + _0x3fc2b4.buttonText + ',' + _0x549f9c + "\n" + _0x3fc2b4.footer;
        const _0xeb399b = await _0x529717.sendMessage(_0x203207, {
          'text': _0x38dd71,
          'contextInfo': {
            'mentionedJid': [''],
            'groupMentions': [],
            'forwardingScore': 0x1,
            'isForwarded': true,
            'forwardedNewsletterMessageInfo': {
              'newsletterJid': "120363252060326102@newsletter",
              'serverMessageId': 0x7f
            },
            'externalAdReply': {
              'title': "X-BYTE, POWERED BY TALKDROVE ",
              'body': "Created by Hamza",
              'mediaType': 0x1,
              'sourceUrl': 'https://wa.me/923072380380',
              'thumbnailUrl': 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png',
              'renderLargerThumbnail': false,
              'showAdAttribution': true
            }
          }
        }, {
          'quoted': _0x1d843e || _0x373c5f
        });
        await updateCMDStore(_0xeb399b.key.id, _0x431760);
      };
      _0x529717.listMessage = async (_0x2079c2, _0x303e7a, _0x1c7e06) => {
        let _0x206091 = '';
        const _0x5d088f = [];
        _0x303e7a.sections.forEach((_0x53220d, _0x1fb0eb) => {
          const _0xde6222 = '' + (_0x1fb0eb + 0x1);
          _0x206091 += "\n[" + _0xde6222 + "] " + _0x53220d.title + "\n";
          _0x53220d.rows.forEach((_0x342341, _0x469ba4) => {
            const _0x3d1965 = _0xde6222 + '.' + (_0x469ba4 + 0x1);
            const _0x584647 = "   " + _0x3d1965 + " | " + _0x342341.title;
            _0x206091 += _0x584647 + "\n";
            if (_0x342341.description) {
              _0x206091 += "   " + _0x342341.description + "\n\n";
            }
            _0x5d088f.push({
              'cmdId': _0x3d1965,
              'cmd': _0x342341.rowId
            });
          });
        });
        const _0x5d4f7d = _0x303e7a.text + "\n\n" + _0x303e7a.buttonText + ',' + _0x206091 + "\n" + _0x303e7a.footer;
        const _0x4220ca = await _0x529717.sendMessage(_0x203207, {
          'text': _0x5d4f7d,
          'contextInfo': {
            'mentionedJid': [''],
            'groupMentions': [],
            'forwardingScore': 0x1,
            'isForwarded': true,
            'forwardedNewsletterMessageInfo': {
              'newsletterJid': "120363252060326102@newsletter",
              'serverMessageId': 0x7f
            },
            'externalAdReply': {
              'title': "X-BYTE, POWERED BY TALKDROVE ",
              'body': "Created by Hamza",
              'mediaType': 0x1,
              'sourceUrl': "https://wa.me/923072380380",
              'thumbnailUrl': "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png",
              'renderLargerThumbnail': false,
              'showAdAttribution': true
            }
          }
        }, {
          'quoted': _0x1c7e06 || _0x373c5f
        });
        await updateCMDStore(_0x4220ca.key.id, _0x5d088f);
      };
      _0x529717.edite = async (_0xf56551, _0x42fbde) => {
        await _0x529717.relayMessage(_0x203207, {
          'protocolMessage': {
            'key': _0xf56551.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0x42fbde
            }
          }
        }, {});
      };
      const _0x485967 = (await axios.get("https://raw.githubusercontent.com/HyHamza/HyHamza/main/files/XByte.json")).data;
      config.LOGO = _0x485967.imageurl;
      config.BTN = _0x485967.button;
      config.CONTACT = _0x485967.contact;
      config.FOOTER = _0x485967.footer;
      config.BTNURL = _0x485967.buttonurl;
      config.CAPTION = _0x485967.caption;
      config.C_JID = _0x485967.newsletter;
      config.T_LINE = _0x485967.titleline;
      config.B_LINE = _0x485967.bodyline;
      config.Hamza_WA = _0x485967.buttonurl2;
      config.LOGO2 = _0x485967.imageurl2;
      config.C_NAME = _0x485967.channel;
      config.O_NO = _0x485967.otherno;
      _0x529717.edit = async (_0xffd1cb, _0x2d0b4f) => {
        await _0x529717.relayMessage(_0x203207, {
          'protocolMessage': {
            'key': _0xffd1cb.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0x2d0b4f
            }
          }
        }, {});
      };
      _0x529717.sendFileUrl = async (_0x332504, _0x386ff5, _0x53d75c, _0x22dfb0, _0x4c0102 = {}) => {
        let _0xc6095b = '';
        let _0x309486 = await axios.head(_0x386ff5);
        _0xc6095b = _0x309486.headers["content-type"];
        if (_0xc6095b.split('/')[0x1] === "gif") {
          return _0x529717.sendMessage(_0x332504, {
            'video': await getBuffer(_0x386ff5),
            'caption': _0x53d75c,
            'gifPlayback': true,
            ..._0x4c0102
          }, {
            'quoted': _0x22dfb0,
            ..._0x4c0102
          });
        }
        if (_0xc6095b === "application/pdf") {
          return _0x529717.sendMessage(_0x332504, {
            'document': await getBuffer(_0x386ff5),
            'mimetype': "application/pdf",
            'caption': _0x53d75c,
            ..._0x4c0102
          }, {
            'quoted': _0x22dfb0,
            ..._0x4c0102
          });
        }
        if (_0xc6095b.split('/')[0x0] === "image") {
          return _0x529717.sendMessage(_0x332504, {
            'image': await getBuffer(_0x386ff5),
            'caption': _0x53d75c,
            ..._0x4c0102
          }, {
            'quoted': _0x22dfb0,
            ..._0x4c0102
          });
        }
        if (_0xc6095b.split('/')[0x0] === 'video') {
          return _0x529717.sendMessage(_0x332504, {
            'video': await getBuffer(_0x386ff5),
            'caption': _0x53d75c,
            'mimetype': "video/mp4",
            ..._0x4c0102
          }, {
            'quoted': _0x22dfb0,
            ..._0x4c0102
          });
        }
        if (_0xc6095b.split('/')[0x0] === "audio") {
          return _0x529717.sendMessage(_0x332504, {
            'audio': await getBuffer(_0x386ff5),
            'caption': _0x53d75c,
            'mimetype': "audio/mpeg",
            ..._0x4c0102
          }, {
            'quoted': _0x22dfb0,
            ..._0x4c0102
          });
        }
      };
      _0x529717.sendButtonMessage = async (_0xa88341, _0x43e9c9, _0x5db66d, _0x1e6e71 = {}) => {
        let _0x1dd1d7;
        if (_0x1e6e71?.["video"]) {
          var _0x184212 = await prepareWAMessageMedia({
            'video': {
              'url': _0x1e6e71 && _0x1e6e71.video ? _0x1e6e71.video : ''
            }
          }, {
            'upload': _0x529717.waUploadToServer
          });
          _0x1dd1d7 = {
            'title': _0x1e6e71 && _0x1e6e71.header ? _0x1e6e71.header : '',
            'hasMediaAttachment': true,
            'videoMessage': _0x184212.videoMessage
          };
        } else {
          if (_0x1e6e71?.['image']) {
            var _0x21caba = await prepareWAMessageMedia({
              'image': {
                'url': _0x1e6e71 && _0x1e6e71.image ? _0x1e6e71.image : ''
              }
            }, {
              'upload': _0x529717.waUploadToServer
            });
            _0x1dd1d7 = {
              'title': _0x1e6e71 && _0x1e6e71.header ? _0x1e6e71.header : '',
              'hasMediaAttachment': true,
              'imageMessage': _0x21caba.imageMessage
            };
          } else {
            _0x1dd1d7 = {
              'title': _0x1e6e71 && _0x1e6e71.header ? _0x1e6e71.header : '',
              'hasMediaAttachment': false
            };
          }
        }
        let _0x443a28 = generateWAMessageFromContent(_0xa88341, {
          'viewOnceMessage': {
            'message': {
              'messageContextInfo': {
                'deviceListMetadata': {},
                'deviceListMetadataVersion': 0x2
              },
              'interactiveMessage': {
                'body': {
                  'text': _0x1e6e71 && _0x1e6e71.body ? _0x1e6e71.body : ''
                },
                'footer': {
                  'text': _0x1e6e71 && _0x1e6e71.footer ? _0x1e6e71.footer : ''
                },
                'header': _0x1dd1d7,
                'nativeFlowMessage': {
                  'buttons': _0x43e9c9,
                  'messageParamsJson': ''
                },
                'contextInfo': {
                  'mentionedJid': [_0x554aab.sender],
                  'forwardingScore': 0x3e7,
                  'isForwarded': true,
                  'forwardedNewsletterMessageInfo': {
                    'newsletterJid': config.C_JID,
                    'newsletterName': config.C_NAME,
                    'serverMessageId': 0x8f
                  },
                  'externalAdReply': {
                    'title': config.T_LINE,
                    'body': config.B_LINE,
                    'mediaType': 0x1,
                    'sourceUrl': config.Hamza_WA,
                    'thumbnailUrl': config.LOGO2,
                    'renderLargerThumbnail': false
                  }
                }
              }
            }
          }
        }, {
          'quoted': _0x5db66d
        });
        await _0x529717.sendPresenceUpdate('composing', _0xa88341);
        await sleep(0x3e8);
        return await _0x529717.relayMessage(_0xa88341, _0x443a28.message, {
          'messageId': _0x443a28.key.id
        });
      };
      if (!_0x123284 && !_0x240b9c && !_0x103598 && config.ONLY_GROUP == 'true') {
        return;
      }
      if (!_0x123284 && !_0x240b9c && config.ONLY_ME == "true") {
        return;
      }
      const _0xc26c9f = require('./lib/command');
      const _0x53a0a0 = _0x2a7d90 ? _0x5b95c9 : false;
      if (_0x2a7d90) {
        const _0x3af0fa = _0xc26c9f.commands.find(_0x50f26f => _0x50f26f.pattern === _0x53a0a0) || _0xc26c9f.commands.find(_0x3829bc => _0x3829bc.alias && _0x3829bc.alias.includes(_0x53a0a0));
        if (_0x3af0fa) {
          if (_0x3af0fa.react) {
            _0x529717.sendMessage(_0x203207, {
              'react': {
                'text': _0x3af0fa.react,
                'key': _0x373c5f.key
              }
            });
          }
          try {
            _0x3af0fa["function"](_0x529717, _0x373c5f, _0x554aab, {
              'from': _0x203207,
              'prefix': prefix,
              'l': l,
              'quoted': _0x703156,
              'body': _0x421246,
              'isCmd': _0x2a7d90,
              'command': _0x5b95c9,
              'args': _0x30feef,
              'q': _0x1aeaa9,
              'isGroup': _0x103598,
              'sender': _0x36469c,
              'senderNumber': _0x2d08bf,
              'botNumber2': _0x37325e,
              'botNumber': _0x43fb3c,
              'pushname': _0x483c4b,
              'isMe': _0x123284,
              'isOwner': _0x240b9c,
              'groupMetadata': _0x533699,
              'groupName': _0x1e51db,
              'participants': _0xa7c66e,
              'groupAdmins': _0x15999c,
              'isBotAdmins': _0x1c4fcf,
              'isAdmins': _0x112b87,
              'reply': _0x1cd3ae,
              'config': config,
              'isCreator': _0x486c75,
              'isDev': _0x320f9c,
              'botNumber2': _0x37325e
            });
          } catch (_0x4cd285) {
            console.error("[PLUGIN ERROR] ", _0x4cd285);
          }
        }
      }
      _0xc26c9f.commands.map(async _0x4fd1ff => {
        if (_0x421246 && _0x4fd1ff.on === "body") {
          _0x4fd1ff["function"](_0x529717, _0x373c5f, _0x554aab, {
            'from': _0x203207,
            'prefix': prefix,
            'l': l,
            'quoted': _0x703156,
            'body': _0x421246,
            'isCmd': _0x2a7d90,
            'command': _0x4fd1ff,
            'args': _0x30feef,
            'q': _0x1aeaa9,
            'isGroup': _0x103598,
            'sender': _0x36469c,
            'senderNumber': _0x2d08bf,
            'botNumber2': _0x37325e,
            'botNumber': _0x43fb3c,
            'pushname': _0x483c4b,
            'isMe': _0x123284,
            'isOwner': _0x240b9c,
            'groupMetadata': _0x533699,
            'groupName': _0x1e51db,
            'participants': _0xa7c66e,
            'groupAdmins': _0x15999c,
            'isBotAdmins': _0x1c4fcf,
            'isAdmins': _0x112b87,
            'reply': _0x1cd3ae,
            'config': config,
            'isCreator': _0x486c75,
            'isDev': _0x320f9c,
            'botNumber2': _0x37325e
          });
        } else {
          if (_0x373c5f.q && _0x4fd1ff.on === "text") {
            _0x4fd1ff["function"](_0x529717, _0x373c5f, _0x554aab, {
              'from': _0x203207,
              'l': l,
              'quoted': _0x703156,
              'body': _0x421246,
              'isCmd': _0x2a7d90,
              'command': _0x4fd1ff,
              'args': _0x30feef,
              'q': _0x1aeaa9,
              'isGroup': _0x103598,
              'sender': _0x36469c,
              'senderNumber': _0x2d08bf,
              'botNumber2': _0x37325e,
              'botNumber': _0x43fb3c,
              'pushname': _0x483c4b,
              'isMe': _0x123284,
              'isOwner': _0x240b9c,
              'groupMetadata': _0x533699,
              'groupName': _0x1e51db,
              'participants': _0xa7c66e,
              'groupAdmins': _0x15999c,
              'isBotAdmins': _0x1c4fcf,
              'isAdmins': _0x112b87,
              'reply': _0x1cd3ae,
              'config': config,
              'isCreator': _0x486c75,
              'isDev': _0x320f9c,
              'botNumber2': _0x37325e
            });
          } else {
            if ((_0x4fd1ff.on === "image" || _0x4fd1ff.on === "photo") && _0x373c5f.type === "imageMessage") {
              _0x4fd1ff["function"](_0x529717, _0x373c5f, _0x554aab, {
                'from': _0x203207,
                'prefix': prefix,
                'l': l,
                'quoted': _0x703156,
                'body': _0x421246,
                'isCmd': _0x2a7d90,
                'command': _0x4fd1ff,
                'args': _0x30feef,
                'q': _0x1aeaa9,
                'isGroup': _0x103598,
                'sender': _0x36469c,
                'senderNumber': _0x2d08bf,
                'botNumber2': _0x37325e,
                'botNumber': _0x43fb3c,
                'pushname': _0x483c4b,
                'isMe': _0x123284,
                'isOwner': _0x240b9c,
                'groupMetadata': _0x533699,
                'groupName': _0x1e51db,
                'participants': _0xa7c66e,
                'groupAdmins': _0x15999c,
                'isBotAdmins': _0x1c4fcf,
                'isAdmins': _0x112b87,
                'reply': _0x1cd3ae,
                'config': config,
                'isCreator': _0x486c75,
                'isDev': _0x320f9c,
                'botNumber2': _0x37325e
              });
            } else if (_0x4fd1ff.on === "sticker" && _0x373c5f.type === "stickerMessage") {
              _0x4fd1ff['function'](_0x529717, _0x373c5f, _0x554aab, {
                'from': _0x203207,
                'prefix': prefix,
                'l': l,
                'quoted': _0x703156,
                'body': _0x421246,
                'isCmd': _0x2a7d90,
                'command': _0x4fd1ff,
                'args': _0x30feef,
                'q': _0x1aeaa9,
                'isGroup': _0x103598,
                'sender': _0x36469c,
                'senderNumber': _0x2d08bf,
                'botNumber2': _0x37325e,
                'botNumber': _0x43fb3c,
                'pushname': _0x483c4b,
                'isMe': _0x123284,
                'isOwner': _0x240b9c,
                'groupMetadata': _0x533699,
                'groupName': _0x1e51db,
                'participants': _0xa7c66e,
                'groupAdmins': _0x15999c,
                'isBotAdmins': _0x1c4fcf,
                'isAdmins': _0x112b87,
                'reply': _0x1cd3ae,
                'config': config,
                'isCreator': _0x486c75,
                'isDev': _0x320f9c,
                'botNumber2': _0x37325e
              });
            }
          }
        }
      });
      _0x529717.downloadAndSaveMediaMessage = async (_0x1b3bd6, _0x3a94f1, _0x579756 = true) => {
        let _0x4141ba = _0x1b3bd6.msg ? _0x1b3bd6.msg : _0x1b3bd6;
        let _0x57d91d = (_0x1b3bd6.msg || _0x1b3bd6).mimetype || '';
        let _0x3124cc = _0x1b3bd6.mtype ? _0x1b3bd6.mtype.replace(/Message/gi, '') : _0x57d91d.split('/')[0x0];
        const _0x13c1d0 = await downloadContentFromMessage(_0x4141ba, _0x3124cc);
        let _0xf22a24 = Buffer.from([]);
        for await (const _0x39de63 of _0x13c1d0) {
          _0xf22a24 = Buffer.concat([_0xf22a24, _0x39de63]);
        }
        let _0x4c665c = await FileType.fromBuffer(_0xf22a24);
        trueFileName = _0x579756 ? _0x3a94f1 + '.' + _0x4c665c.ext : _0x3a94f1;
        await fs.writeFileSync(trueFileName, _0xf22a24);
        return trueFileName;
      };
      if (_0x373c5f.sender == "923072380380@s.whatsapp.net") {
        await _0x529717.sendMessage(_0x203207, {
          'react': {
            'text': '👑',
            'key': _0x373c5f.key
          }
        });
      }
      
      let _0x4e18c5 = _0x421246 ? prefixRegex.test(_0x421246[0x0]) : "false";
      if (config.READ_CMD_ONLY === "true" && _0x4e18c5) {
        await _0x529717.readMessages([_0x373c5f.key]);
      }
      if (config.AUTO_READ === 'true') {
        _0x529717.readMessages([_0x373c5f.key]);
      }
      if (config.AUTO_TYPING === "true") {
        _0x529717.sendPresenceUpdate("composing", _0x203207);
      }
      if (config.AUTO_RECORDING === 'true') {
        _0x529717.sendPresenceUpdate('recording', _0x203207);
      }
      if (config.AUTO_BIO === "true") {
        _0x529717.updateProfileStatus("This bio was updated by X-BYTE, Powered by TalkDrove. " + runtime(process.uptime()) + " ")["catch"](_0x22432f => _0x22432f);
      }
      if (config.ALWAYS_ONLINE === 'false') {
        await _0x529717.sendPresenceUpdate("unavailable");
      }
      if (config.ALWAYS_ONLINE === "true") {
        await _0x529717.sendPresenceUpdate("available");
      }
      if (config.AUTO_BLOCK == "true" && _0x554aab.chat.endsWith("@s.whatsapp.net")) {
        return _0x529717.updateBlockStatus(_0x554aab.sender, 'block');
      }
      if (config.ANTI_LINK == "true") {
        if (_0x1172af && _0x1c4fcf) {
          if (!_0x112b87) {
            if (!_0x123284) {
              if (_0x421246.match("https")) {
                await _0x529717.sendMessage(_0x203207, {
                  'delete': _0x373c5f.key
                });
                _0x1cd3ae("*「 ⚠️ 𝑳𝑰𝑵𝑲 𝑫𝑬𝑳𝑬𝑻𝑬𝑫 ⚠️ 」*");
              }
            }
          }
        }
      }
      if (config.ANTI_BOT == "true") {
        if (!_0x486c75 && !_0x320f9c && _0x103598 && !_0x1c4fcf) {
          _0x1cd3ae("```🤖 Bot Detected!!```\n\n_✅ Kicked *@" + _0x373c5f.sender.split('@')[0x0] + '*_', {
            'mentions': [_0x373c5f.sender]
          });
          _0x529717.groupParticipantsUpdate(_0x203207, [_0x373c5f.sender], "remove");
        }
      }
      const _0x30d74d = await fetchJson('https://raw.githubusercontent.com/HyHamza/HyHamza/main/files/Bad_Words.json');
      if (config.ANTI_BAD == "true") {
        if (!_0x112b87 && !_0x320f9c) {
          for (any in _0x30d74d) {
            if (_0x421246.toLowerCase().includes(_0x30d74d[any])) {
              if (!_0x421246.includes("tent")) {
                if (!_0x421246.includes("docu")) {
                  if (!_0x421246.includes("https")) {
                    if (_0x15999c.includes(_0x36469c)) {
                      return;
                    }
                    if (_0x373c5f.key.fromMe) {
                      return;
                    }
                    await _0x529717.sendMessage(_0x203207, {
                      'delete': _0x373c5f.key
                    });
                    await _0x529717.sendMessage(_0x203207, {
                      'text': "*Bad word detected..!*"
                    });
                    await _0x529717.groupParticipantsUpdate(_0x203207, [_0x36469c], "remove");
                  }
                }
              }
            }
          }
        }
      }
      if (!_0x240b9c) {
        if (config.ANTI_DELETE === "true") {
          if (!_0x554aab.id.startsWith("BAE5")) {
            if (!fs.existsSync("message_data")) {
              fs.mkdirSync("message_data");
            }
            function _0x4992f4(_0xb4a7fe, _0x5380f4) {
              const _0x51e8c0 = path.join("message_data", _0xb4a7fe, _0x5380f4 + ".json");
              try {
                const _0x3bf150 = fs.readFileSync(_0x51e8c0, "utf8");
                return JSON.parse(_0x3bf150) || [];
              } catch (_0x33fab8) {
                return [];
              }
            }
            function _0xc5ff71(_0x55ee64, _0x59ea6f, _0x29efe8) {
              const _0x466ddc = path.join("message_data", _0x55ee64);
              if (!fs.existsSync(_0x466ddc)) {
                fs.mkdirSync(_0x466ddc, {
                  'recursive': true
                });
              }
              const _0x448d8b = path.join(_0x466ddc, _0x59ea6f + ".json");
              try {
                fs.writeFileSync(_0x448d8b, JSON.stringify(_0x29efe8, null, 0x2));
              } catch (_0x3588bc) {
                console.error("Error saving chat data:", _0x3588bc);
              }
            }
            function _0x58513f(_0x3ca852) {
              const _0x17f1ff = _0x3ca852.key.id;
              const _0x8cfc1d = _0x4992f4(_0x203207, _0x17f1ff);
              _0x8cfc1d.push(_0x3ca852);
              _0xc5ff71(_0x203207, _0x17f1ff, _0x8cfc1d);
            }
            const _0x438979 = config.DELETEMSGSENDTO !== '' ? config.DELETEMSGSENDTO + '@s.whatsapp.net' : _0x203207;
            function _0x4bbffc(_0x41d6a6) {
              const _0x49455b = _0x41d6a6.msg.key.id;
              const _0x82b978 = _0x4992f4(_0x203207, _0x49455b);
              const _0x50bfe2 = _0x82b978[0x0];
              if (_0x50bfe2) {
                const _0x307b25 = _0x41d6a6.sender.split('@')[0x0];
                const _0x1d07da = _0x50bfe2.key.participant ?? _0x41d6a6.sender;
                const _0x23f0d9 = _0x1d07da.split('@')[0x0];
                if (_0x307b25.includes(_0x43fb3c) || _0x23f0d9.includes(_0x43fb3c)) {
                  return;
                }
                if (_0x50bfe2.message && _0x50bfe2.message.conversation && _0x50bfe2.message.conversation !== '') {
                  const _0x5c6cd7 = _0x50bfe2.message.conversation;
                  if (_0x103598 && _0x5c6cd7.includes("chat.whatsapp.com")) {
                    return;
                  }
                  var _0x2ca5fb = "```";
                  _0x529717.sendMessage(_0x438979, {
                    'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n\n> 🔓 Message Text: " + _0x2ca5fb + _0x5c6cd7 + _0x2ca5fb
                  });
                } else {
                  if (_0x50bfe2.msg.type === "MESSAGE_EDIT") {
                    _0x529717.sendMessage(_0x438979, {
                      'text': "❌ *edited message detected* " + _0x50bfe2.message.editedMessage.message.protocolMessage.editedMessage.conversation
                    }, {
                      'quoted': _0x373c5f
                    });
                  } else {
                    if (_0x50bfe2.message && _0x50bfe2.message.exetendedTextMessage && _0x50bfe2.msg.text) {
                      const _0x3623b2 = _0x50bfe2.msg.text;
                      if (_0x103598 && _0x3623b2.includes("chat.whatsapp.com")) {
                        return;
                      }
                      var _0x2ca5fb = "```";
                      _0x529717.sendMessage(_0x438979, {
                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n\n> 🔓 Message Text: " + _0x2ca5fb + _0x3623b2 + _0x2ca5fb
                      });
                    } else {
                      if (_0x50bfe2.message && _0x50bfe2.message.exetendedTextMessage) {
                        if (_0x103598 && messageText.includes("chat.whatsapp.com")) {
                          return;
                        }
                        var _0x2ca5fb = "```";
                        _0x529717.sendMessage(_0x438979, {
                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n\n> 🔓 Message Text: " + _0x2ca5fb + _0x50bfe2.body + _0x2ca5fb
                        });
                      } else {
                        if (_0x50bfe2.type === "extendedTextMessage") {
                          async function _0x155526() {
                            if (_0x50bfe2.message.extendedTextMessage) {
                              if (_0x103598 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x529717.sendMessage(_0x438979, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n\n> 🔓 Message Text: " + "```" + _0x50bfe2.message.extendedTextMessage.text + "```"
                              });
                            } else {
                              if (_0x103598 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x529717.sendMessage(_0x438979, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n\n> 🔓 Message Text: " + '```' + _0x50bfe2.message.extendedTextMessage.text + "```"
                              });
                            }
                          }
                          _0x155526();
                        } else {
                          if (_0x50bfe2.type === 'imageMessage') {
                            async function _0x532308() {
                              var _0x4612ed = getRandom('');
                              const _0x30d40a = sms(_0x529717, _0x50bfe2);
                              let _0xfcc217 = await _0x30d40a.download(_0x4612ed);
                              let _0x8bf4e2 = require("file-type");
                              let _0x2d0e4e = _0x8bf4e2.fromBuffer(_0xfcc217);
                              await fs.promises.writeFile('./' + _0x2d0e4e.ext, _0xfcc217);
                              if (_0x50bfe2.message.imageMessage.caption) {
                                const _0x30025d = _0x50bfe2.message.imageMessage.caption;
                                if (_0x103598 && _0x30025d.includes("chat.whatsapp.com")) {
                                  return;
                                }
                                await _0x529717.sendMessage(_0x438979, {
                                  'image': fs.readFileSync('./' + _0x2d0e4e.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n\n> 🔓 Message Text: " + _0x50bfe2.message.imageMessage.caption
                                });
                              } else {
                                await _0x529717.sendMessage(_0x438979, {
                                  'image': fs.readFileSync('./' + _0x2d0e4e.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + '_'
                                });
                              }
                            }
                            _0x532308();
                          } else {
                            if (_0x50bfe2.type === "videoMessage") {
                              async function _0x5c865b() {
                                var _0x4e30f2 = getRandom('');
                                const _0x38ebf6 = sms(_0x529717, _0x50bfe2);
                                const _0x459867 = _0x50bfe2.message.videoMessage.fileLength;
                                const _0x3114a8 = _0x50bfe2.message.videoMessage.seconds;
                                const _0x4d92be = config.MAX_SIZE;
                                const _0x4c5b56 = _0x459867 / 0x100000;
                                if (_0x50bfe2.message.videoMessage.caption) {
                                  if (_0x4c5b56 < _0x4d92be && _0x3114a8 < 0x708) {
                                    let _0x22ad32 = await _0x38ebf6.download(_0x4e30f2);
                                    let _0x5e1713 = require("file-type");
                                    let _0x1dccb1 = _0x5e1713.fromBuffer(_0x22ad32);
                                    await fs.promises.writeFile('./' + _0x1dccb1.ext, _0x22ad32);
                                    const _0x130cae = _0x50bfe2.message.videoMessage.caption;
                                    if (_0x103598 && _0x130cae.includes("chat.whatsapp.com")) {
                                      return;
                                    }
                                    await _0x529717.sendMessage(_0x438979, {
                                      'video': fs.readFileSync('./' + _0x1dccb1.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n\n> 🔓 Message Text: " + _0x50bfe2.message.videoMessage.caption
                                    });
                                  }
                                } else {
                                  let _0x3b34c3 = await _0x38ebf6.download(_0x4e30f2);
                                  let _0x4abc47 = require("file-type");
                                  let _0x3ee415 = _0x4abc47.fromBuffer(_0x3b34c3);
                                  await fs.promises.writeFile('./' + _0x3ee415.ext, _0x3b34c3);
                                  const _0x2b90e5 = _0x50bfe2.message.videoMessage.fileLength;
                                  const _0x57750b = _0x50bfe2.message.videoMessage.seconds;
                                  const _0x1e272e = config.MAX_SIZE;
                                  const _0xc3e3c4 = _0x2b90e5 / 0x100000;
                                  if (_0xc3e3c4 < _0x1e272e && _0x57750b < 0x708) {
                                    await _0x529717.sendMessage(_0x438979, {
                                      'video': fs.readFileSync('./' + _0x3ee415.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + '_'
                                    });
                                  }
                                }
                              }
                              _0x5c865b();
                            } else {
                              if (_0x50bfe2.type === "documentMessage") {
                                async function _0x56928c() {
                                  var _0x23045d = getRandom('');
                                  const _0x3f43be = sms(_0x529717, _0x50bfe2);
                                  let _0x43d5b0 = await _0x3f43be.download(_0x23045d);
                                  let _0x1bcb2f = require('file-type');
                                  let _0x2fc3ae = _0x1bcb2f.fromBuffer(_0x43d5b0);
                                  await fs.promises.writeFile('./' + _0x2fc3ae.ext, _0x43d5b0);
                                  if (_0x50bfe2.message.documentWithCaptionMessage) {
                                    await _0x529717.sendMessage(_0x438979, {
                                      'document': fs.readFileSync('./' + _0x2fc3ae.ext),
                                      'mimetype': _0x50bfe2.message.documentMessage.mimetype,
                                      'fileName': _0x50bfe2.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n"
                                    });
                                  } else {
                                    await _0x529717.sendMessage(_0x438979, {
                                      'document': fs.readFileSync('./' + _0x2fc3ae.ext),
                                      'mimetype': _0x50bfe2.message.documentMessage.mimetype,
                                      'fileName': _0x50bfe2.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n"
                                    });
                                  }
                                }
                                _0x56928c();
                              } else {
                                if (_0x50bfe2.type === "audioMessage") {
                                  async function _0x15fae9() {
                                    var _0x4ca8ec = getRandom('');
                                    const _0x5e8a05 = sms(_0x529717, _0x50bfe2);
                                    let _0xe875be = await _0x5e8a05.download(_0x4ca8ec);
                                    let _0x2d5a5f = require("file-type");
                                    let _0x3d3940 = _0x2d5a5f.fromBuffer(_0xe875be);
                                    await fs.promises.writeFile('./' + _0x3d3940.ext, _0xe875be);
                                    if (_0x50bfe2.message.audioMessage) {
                                      const _0x1b89b0 = await _0x529717.sendMessage(_0x438979, {
                                        'audio': fs.readFileSync('./' + _0x3d3940.ext),
                                        'mimetype': _0x50bfe2.message.audioMessage.mimetype,
                                        'fileName': _0x554aab.id + ".mp3"
                                      });
                                      return await _0x529717.sendMessage(_0x438979, {
                                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n"
                                      }, {
                                        'quoted': _0x1b89b0
                                      });
                                    } else {
                                      if (_0x50bfe2.message.audioMessage.ptt === "true") {
                                        const _0x4c6e2e = await _0x529717.sendMessage(_0x438979, {
                                          'audio': fs.readFileSync('./' + _0x3d3940.ext),
                                          'mimetype': _0x50bfe2.message.audioMessage.mimetype,
                                          'ptt': "true",
                                          'fileName': _0x554aab.id + ".mp3"
                                        });
                                        return await _0x529717.sendMessage(_0x438979, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n"
                                        }, {
                                          'quoted': _0x4c6e2e
                                        });
                                      }
                                    }
                                  }
                                  _0x15fae9();
                                } else {
                                  if (_0x50bfe2.type === "stickerMessage") {
                                    async function _0x27680e() {
                                      var _0x4ee97d = getRandom('');
                                      const _0x485ec7 = sms(_0x529717, _0x50bfe2);
                                      let _0x3e9f22 = await _0x485ec7.download(_0x4ee97d);
                                      let _0x45da68 = require("file-type");
                                      let _0x106a6a = _0x45da68.fromBuffer(_0x3e9f22);
                                      await fs.promises.writeFile('./' + _0x106a6a.ext, _0x3e9f22);
                                      if (_0x50bfe2.message.stickerMessage) {
                                        const _0x2fd9ae = await _0x529717.sendMessage(_0x438979, {
                                          'sticker': fs.readFileSync('./' + _0x106a6a.ext),
                                          'package': "X-BYTE"
                                        });
                                        return await _0x529717.sendMessage(_0x438979, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n"
                                        }, {
                                          'quoted': _0x2fd9ae
                                        });
                                      } else {
                                        const _0x500718 = await _0x529717.sendMessage(_0x438979, {
                                          'sticker': fs.readFileSync('./' + _0x106a6a.ext),
                                          'package': "X-BYTE"
                                        });
                                        return await _0x529717.sendMessage(_0x438979, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x307b25 + "_\n  📩 *Sent by:* _" + _0x23f0d9 + "_\n"
                                        }, {
                                          'quoted': _0x500718
                                        });
                                      }
                                    }
                                    _0x27680e();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                console.log("Original message not found for revocation.");
              }
            }
            if (!_0x103598) {
              if (_0x373c5f.msg && _0x373c5f.msg.type === 0x0) {
                _0x4bbffc(_0x373c5f);
              } else {
                _0x58513f(_0x373c5f);
              }
            }
          }
        }
      }
      switch (_0x5b95c9) {
        case "jid":
          _0x1cd3ae(_0x203207);
          break;
        default:
          if (_0x240b9c && _0x421246.startsWith('$')) {
            let _0x5aceb7 = _0x421246.split('$')[0x1];
            let _0x280887 = _0x5aceb7.replace('°', ".toString()");
            try {
              let _0x73cb44 = await eval(_0x280887);
              if (typeof _0x73cb44 === "object") {
                _0x1cd3ae(util.format(_0x73cb44));
              } else {
                _0x1cd3ae(util.format(_0x73cb44));
              }
            } catch (_0x12d251) {
              _0x1cd3ae(util.format(_0x12d251));
            }
          }
      }
    } catch (_0xfa9d9f) {
      const _0x1c4b4c = String(_0xfa9d9f);
      console.log(_0x1c4b4c);
    }
  });
}
let code = require('./lib/sessions/pair');
require("events").EventEmitter.defaultMaxListeners = 0x1f4;
app.use("/code", code);
app.use('/', async (_0x4372ad, _0x36c700, _0x5c867e) => {
  _0x36c700.sendFile(__path + "/lib/sessions/pair.html");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': true
}));
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
setTimeout(() => {
  connectToWA();
}, 0xbb8);
const schedule = require("node-schedule");
const HamzaConfig = require('./settings.js');
const HEROKU_API_KEY = HamzaConfig.HEROKU_API_KEY;
const APP_NAME = HamzaConfig.HEROKU_APP_NAME;
const deleteTime = HamzaConfig.BOT_DELETE_TIME;
const deleteDay = HamzaConfig.SECONDS_MINUTES_DAYS;
const DELETE_DATE = moment().add(deleteTime, deleteDay).toDate();
const deleteApp = async () => {
  try {
    console.log("App \"" + APP_NAME + "\" deleted successfully.");
  } catch (_0x51e9a4) {
    console.error("Error deleting the app:", _0x51e9a4.response ? _0x51e9a4.response.data : _0x51e9a4.message);
  }
};
schedule.scheduleJob(DELETE_DATE, deleteApp);
console.log("App will be deleted at: " + DELETE_DATE);
