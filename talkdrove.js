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
} = require('@whiskeysockets/baileys');
const fs = require('fs');
const P = require('pino');
const FileType = require("file-type");
const moment = require("moment-timezone");
const l = console.log;
var config = require("./settings");
const NodeCache = require('node-cache');
const util = require("util");
var prefix = config.PREFIX;
var prefixRegex = config.PREFIX === "false" || config.PREFIX === "null" ? '^' : new RegExp('^[' + config.PREFIX + ']');
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
} = require("./lib/database");
var {
  get_set,
  input_set
} = require("./lib/set_db");
const axios = require("axios");
const path = require("path");
const msgRetryCounterCache = new NodeCache();
const ownerNumber = config.OWNER_NUMBER;
function decodeBase64(_0x393a8f) {
  return Buffer.from(_0x393a8f, "base64").toString('utf-8');
}
const sessionDir = path.join(__dirname, 'session');
if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir);
}
function saveDecodedSessionData(_0x1315eb) {
  const _0x41a8c0 = path.join(sessionDir, 'creds.json');
  fs.writeFile(_0x41a8c0, JSON.stringify(_0x1315eb, null, 0x2), _0x24ff28 => {
    if (_0x24ff28) {
      console.error("Failed to save session data:", _0x24ff28.message);
      return;
    }
    console.log("Session data saved successfully.");
  });
}
if (!fs.existsSync(path.join(sessionDir, "creds.json"))) {
  if (config.SESSION_ID) {
    try {
      const decodedSessionId = Buffer.from(config.SESSION_ID.replace("Byte;;;", ''), "base64").toString('utf-8');
      const sessionData = JSON.parse(decodedSessionId);
      saveDecodedSessionData(sessionData);
    } catch (_0x3fb39d) {
      console.error("Failed to save session ID:", _0x3fb39d.message);
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
    version: _0x4c9970,
    isLatest: _0x1df635
  } = await fetchLatestBaileysVersion();
  console.log("using WA v" + _0x4c9970.join('.') + ", isLatest: " + _0x1df635);
  const {
    state: _0x4ebde4,
    saveCreds: _0x59be8b
  } = await useMultiFileAuthState(__dirname + '/session/');
  const _0x498e7a = makeWASocket({
    'logger': P({
      'level': "fatal"
    }).child({
      'level': "fatal"
    }),
    'printQRInTerminal': true,
    'generateHighQualityLinkPreview': true,
    'auth': _0x4ebde4,
    'defaultQueryTimeoutMs': undefined,
    'msgRetryCounterCache': msgRetryCounterCache
  });
  _0x498e7a.ev.on("connection.update", async _0x13b829 => {
    const {
      connection: _0x154fd0,
      lastDisconnect: _0x4ba285
    } = _0x13b829;
    if (_0x154fd0 === "close") {
      if (_0x4ba285.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else {
      if (_0x154fd0 === "open") {
        console.log("Installing plugins 🔌... ");
        const _0x83fef6 = require("path");
        fs.readdirSync("./plugins/").forEach(_0x30dd5d => {
          if (_0x83fef6.extname(_0x30dd5d).toLowerCase() == ".js") {
            require('./plugins/' + _0x30dd5d);
          }
        });
        console.log("Bot connected ✅");
        await _0x498e7a.sendMessage(config.OWNER_NUMBER + "@s.whatsapp.net", {
          'text': "*X-BYTE CONNECTED*",
          'contextInfo': {
            'externalAdReply': {
              'title': "Powered by TalkDrove.",
              'thumbnailUrl': "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png",
              'sourceUrl': "https://whatsapp.com/channel/0029VaNRcHSJP2199iMQ4W0l",
              'mediaType': 0x1,
              'renderLargerThumbnail': true
            }
          }
        });
      }
    }
  });
  _0x498e7a.ev.on("call", async _0x3176bc => {
    if (config.ANTI_CALL === "true") {
      for (const _0x4bd882 of _0x3176bc) {
        if (_0x4bd882.status == 'offer') {
          if (_0x4bd882.isGroup == false) {
            await _0x498e7a.sendMessage(_0x4bd882.from, {
              'text': "⚠️︱I'm X-BYTE, I rejected Call Because my owner is Busy!",
              'mentions': [_0x4bd882.from]
            });
            await _0x498e7a.rejectCall(_0x4bd882.id, _0x4bd882.from);
          } else {
            await _0x498e7a.rejectCall(_0x4bd882.id, _0x4bd882.from);
          }
        }
      }
    }
  });
  _0x498e7a.ev.on("group-participants.update", async _0x29e691 => {
    if (config.WELCOME === "true") {
      console.log(_0x29e691);
      try {
        let _0x2d3d77 = await _0x498e7a.groupMetadata(_0x29e691.id);
        let _0x3b8eda = _0x29e691.participants;
        for (let _0x125657 of _0x3b8eda) {
          try {
            ppuser = await _0x498e7a.profilePictureUrl(_0x125657, "image");
          } catch (_0x610c01) {
            ppuser = "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png";
          }
          try {
            ppgroup = await _0x498e7a.profilePictureUrl(_0x29e691.id, "image");
          } catch (_0x13c4d9) {
            ppgroup = "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png";
          }
          memb = _0x2d3d77.participants.length;
          connWlcm = await getBuffer(ppuser);
          connLft = await getBuffer(ppuser);
          if (_0x29e691.action == "add") {
            const _0x21cd76 = moment.tz("Asia/Karachi").format("HH:mm:ss");
            const _0x155039 = moment.tz("Asia/Karachi").format("DD/MM/YYYY");
            const _0x4ecb8f = _0x2d3d77.participants.length;
            connbody = "┌─❖\n│「 𝗛𝗶 👋 」\n└┬❖ 「  @" + _0x125657.split('@')[0x0] + "  」\n   │✑  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 \n   │✑  " + _0x2d3d77.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x4ecb8f + "th\n   │✑  𝗝𝗼𝗶𝗻𝗲𝗱 : \n   │✑ " + _0x21cd76 + " " + _0x155039 + "\n   └───────────────┈ ⳹";
            _0x498e7a.sendMessage(_0x29e691.id, {
              'text': connbody,
              'contextInfo': {
                'mentionedJid': [_0x125657],
                'externalAdReply': {
                  'showAdAttribution': true,
                  'renderLargerThumbnail': true,
                  'title': "X - B Y T E ",
                  'body': '' + _0x2d3d77.subject,
                  'containsAutoReply': true,
                  'mediaType': 0x1,
                  'thumbnail': connLft,
                  'sourceUrl': '' + ppuser
                }
              }
            });
          } else {
            if (_0x29e691.action == "remove") {
              const _0x5c6684 = moment.tz('Asia/Karachi').format("HH:mm:ss");
              const _0x233b35 = moment.tz("Asia/Karachi").format("DD/MM/YYYY");
              const _0x4cac5a = _0x2d3d77.participants.length;
              connbody = "┌─❖\n│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋 」\n└┬❖ 「 @" + _0x125657.split('@')[0x0] + "  」\n   │✑  𝗟𝗲𝗳𝘁 \n   │✑ " + _0x2d3d77.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x4cac5a + "th\n   │✑  𝗧𝗶𝗺𝗲 : \n   │✑  " + _0x5c6684 + " " + _0x233b35 + "\n   └───────────────┈ ⳹";
              _0x498e7a.sendMessage(_0x29e691.id, {
                'text': connbody,
                'contextInfo': {
                  'mentionedJid': [_0x125657],
                  'externalAdReply': {
                    'showAdAttribution': true,
                    'renderLargerThumbnail': true,
                    'title': "X - B Y T E ",
                    'body': '' + _0x2d3d77.subject,
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
      } catch (_0x4916b1) {
        console.log(_0x4916b1);
      }
    }
  });
  _0x498e7a.ev.on("group-participants.update", async _0x41f060 => {
    if (config.ADMIN_EVENT === "true") {
      console.log(_0x41f060);
      try {
        let _0x490cb5 = _0x41f060.participants;
        for (let _0xfac355 of _0x490cb5) {
          try {
            ppuser = await _0x498e7a.profilePictureUrl(_0xfac355, "image");
          } catch (_0x15018b) {
            ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
          }
          try {
            ppgroup = await _0x498e7a.profilePictureUrl(_0x41f060.id, "image");
          } catch (_0x5a1db0) {
            ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
          }
          if (_0x41f060.action == "promote") {
            xeonbody = " 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @" + _0xfac355.split('@')[0x0] + ", you have been *promoted* to *admin* 🥳";
            _0x498e7a.sendMessage(_0x41f060.id, {
              'text': xeonbody,
              'contextInfo': {
                'mentionedJid': [_0xfac355],
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
          } else if (_0x41f060.action == "demote") {
            xeonbody = "𝗢𝗼𝗽𝘀‼️ @" + _0xfac355.split('@')[0x0] + ", you have been *demoted* from *admin* 😬";
            _0x498e7a.sendMessage(_0x41f060.id, {
              'text': xeonbody,
              'contextInfo': {
                'mentionedJid': [_0xfac355],
                'externalAdReply': {
                  'showAdAttribution': true,
                  'containsAutoReply': true,
                  'title': 'X-BYTE',
                  'body': "Powered by TalkDrove",
                  'previewType': "PHOTO",
                  'thumbnailUrl': '',
                  'thumbnail': XeonLft,
                  'sourceUrl': '' + wagc
                }
              }
            });
          }
        }
      } catch (_0x1ce437) {
        console.log(_0x1ce437);
      }
    }
  });
  async function _0x4f0add(_0x50ba90) {
    if (store) {
      const _0x30df4b = await store.loadMessage(_0x50ba90.remoteJid, _0x50ba90.id);
      return _0x30df4b?.['message'];
    }
    return {
      'conversation': "Hai"
    };
  }
  _0x498e7a.ev.on("messages.update", async _0xc71dd4 => {
    for (const {
      key: _0x659fec,
      update: _0x3af1d8
    } of _0xc71dd4) {
      if (_0x3af1d8.pollUpdates && _0x659fec.fromMe) {
        const _0x1cc672 = await _0x4f0add(_0x659fec);
        if (_0x1cc672) {
          const _0x2cf6ff = await getAggregateVotesInPollMessage({
            'message': _0x1cc672,
            'pollUpdates': _0x3af1d8.pollUpdates
          });
          var _0x5935dc = _0x2cf6ff.filter(_0x33f079 => _0x33f079.voters.length !== 0x0)[0x0]?.["name"];
          if (_0x5935dc == undefined) {
            return;
          }
          var _0x950130 = prefix + _0x5935dc;
          try {
            setTimeout(async () => {
              await gss.sendMessage(_0x659fec.remoteJid, {
                'delete': _0x659fec
              });
            }, 0x2710);
          } catch (_0x5a0cee) {
            console.error("Error deleting message:", _0x5a0cee);
          }
          gss.appenTextMessage(_0x950130, _0xc71dd4);
        }
      }
    }
  });
  _0x498e7a.ev.on("messages.update", async _0x15514d => {
    for (const {
      key: _0x2b1eee,
      update: _0x218963
    } of _0x15514d) {
      if (_0x218963.pollUpdates) {
        const _0x1604fc = await _0x4f0add(_0x2b1eee);
        const _0x576c7b = _0x1604fc.message;
        if (_0x576c7b) {
          const _0x2208c5 = _0x2b1eee.remoteJid;
          const _0x177288 = await jidNormalizedUser(_0x498e7a.user.id);
          const _0x222b37 = await getAggregateVotesInPollMessage({
            'message': _0x576c7b,
            'pollUpdates': _0x218963.pollUpdates
          });
          let _0x4d2861 = _0x222b37.find(_0x3f3409 => _0x3f3409.voters.length > 0x0)?.["name"] || '';
          let _0x16924f = _0x222b37.findIndex(_0x2acf0e => _0x2acf0e.name === _0x4d2861) || '';
          let _0x5b1253 = _0x222b37.find(_0x179f2c => _0x179f2c.voters.length > 0x0)?.["voters"][0x0] == 'me' ? _0x177288 : _0x222b37.find(_0x2ab713 => _0x2ab713.voters.length > 0x0)?.['voters'][0x0];
          function _0x30f9a0(_0x36e5b6) {
            let _0xbf658a = ['pollCreationMessage', "pollCreationMessageV1", "pollCreationMessageV2", "pollCreationMessageV3"];
            for (let _0x563daf of _0xbf658a) {
              if (_0x36e5b6[_0x563daf] && _0x36e5b6[_0x563daf].mentionedJid) {
                return _0x36e5b6[_0x563daf].mentionedJid;
              }
            }
            return null;
          }
          function _0x4ffb2b(_0x5e1b4b) {
            let _0x29cc82 = ['pollCreationMessage', "pollCreationMessageV1", 'pollCreationMessageV2', "pollCreationMessageV3"];
            for (let _0x1766bf of _0x29cc82) {
              if (_0x5e1b4b[_0x1766bf] && _0x5e1b4b[_0x1766bf].name) {
                return _0x5e1b4b[_0x1766bf].name;
              }
            }
            return null;
          }
          const _0x458e0f = _0x30f9a0(_0x576c7b);
          const _0x2eb233 = _0x4ffb2b(_0x576c7b);
          const _0x4c4706 = _0x458e0f?.["includes"](_0x5b1253);
          const _0x121e66 = _0x1604fc.key.remoteJid.includes("@g.us") ? _0x1604fc.key.participant : _0x1604fc.key.remoteJid;
          const _0x1c5c4e = {
            'body': _0x16924f + 0x1,
            'voted': _0x4d2861,
            'from': _0x2208c5,
            'isRequester': _0x4c4706 ? _0x4c4706 : false,
            'mentionedJid': _0x458e0f,
            'pollSender': _0x121e66,
            'poll': _0x2eb233,
            'voter': _0x5b1253,
            'type': "poll"
          };
          await _0x498e7a.sendMessage(_0x177288, {
            'text': JSON.stringify(_0x1c5c4e, null, 0x2)
          });
        }
      }
    }
  });
  _0x498e7a.ev.on("creds.update", _0x59be8b);
  _0x498e7a.ev.on("messages.upsert", async _0x275a24 => {
    try {
      _0x275a24 = _0x275a24.messages[0x0];
      if (!_0x275a24.message) {
        return;
      }
      var _0x539440 = require("./lib/id_db");
      _0x275a24.message = getContentType(_0x275a24.message) === "ephemeralMessage" ? _0x275a24.message.ephemeralMessage.message : _0x275a24.message;
      if (config.AUTO_STATUS_READ === 'true') {
        if (_0x275a24.key && _0x275a24.key.remoteJid === "status@broadcast") {
          await _0x498e7a.readMessages([_0x275a24.key]);
        }
      }
      if (_0x275a24.key && _0x275a24.key.remoteJid === "status@broadcast") {
        return;
      }
      const _0x45c746 = sms(_0x498e7a, _0x275a24);
      const _0x1c4a2e = getContentType(_0x275a24.message);
      const _0x6d8f09 = _0x275a24.key.remoteJid;
      const _0xb77ee3 = _0x1c4a2e == "extendedTextMessage" && _0x275a24.message.extendedTextMessage.contextInfo != null ? _0x275a24.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
      const _0x5658a4 = _0x1c4a2e === "conversation" ? _0x275a24.message.conversation : _0x1c4a2e === "extendedTextMessage" ? _0x275a24.message.extendedTextMessage.text : _0x1c4a2e == "interactiveResponseMessage" ? _0x275a24.message.interactiveResponseMessage && _0x275a24.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(_0x275a24.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(_0x275a24.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : _0x1c4a2e == "templateButtonReplyMessage" ? _0x275a24.message.templateButtonReplyMessage && _0x275a24.message.templateButtonReplyMessage.selectedId : _0x1c4a2e === 'extendedTextMessage' ? _0x275a24.message.extendedTextMessage.text : _0x1c4a2e == 'imageMessage' && _0x275a24.message.imageMessage.caption ? _0x275a24.message.imageMessage.caption : _0x1c4a2e == 'videoMessage' && _0x275a24.message.videoMessage.caption ? _0x275a24.message.videoMessage.caption : '';
      if ((await isbtnID(_0x275a24.message?.['extendedTextMessage']?.['contextInfo']?.["stanzaId"])) && getCmdForCmdId(await getCMDStore(_0x275a24.message?.["extendedTextMessage"]?.['contextInfo']?.['stanzaId']), _0x275a24?.["message"]?.["extendedTextMessage"]?.["text"])) {
        getCmdForCmdId(await getCMDStore(_0x275a24.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"]), _0x275a24?.['message']?.["extendedTextMessage"]?.["text"]);
      } else {
        if (_0x1c4a2e === 'extendedTextMessage') {
          _0x275a24.message.extendedTextMessage.text;
        } else {
          if (_0x1c4a2e == "imageMessage" && _0x275a24.message.imageMessage.caption) {
            _0x275a24.message.imageMessage.caption;
          } else if (_0x1c4a2e == "videoMessage" && _0x275a24.message.videoMessage.caption) {
            _0x275a24.message.videoMessage.caption;
          } else {
            '';
          }
        }
      }
      _0x498e7a.sendPoll = (_0xc92b48, _0x45351d = '', _0x3e07a5 = [], _0x52561b = 0x1) => {
        return _0x498e7a.sendMessage(_0xc92b48, {
          'poll': {
            'name': _0x45351d,
            'values': _0x3e07a5,
            'selectableCount': _0x52561b
          }
        });
      };
      var _0x50e978 = await get_set("all");
      config = await _0xa43efe(config, _0x50e978);
      prefix = config.PREFIX;
      var _0x2f41c5 = _0x5658a4.startsWith(prefix);
      var _0x1b83b1 = _0x2f41c5 ? _0x5658a4.slice(prefix.length).trim().split(" ").shift().toLowerCase() : '';
      var _0x3fd46f = _0x5658a4.trim().split(/ +/).slice(0x1);
      var _0x49f4e0 = _0x3fd46f.join(" ");
      if (_0x45c746.quoted && _0x45c746.quoted.fromMe && (await _0x539440.check(_0x45c746.quoted.id))) {
        if (_0x5658a4.startsWith(prefix)) {
          _0x5658a4 = _0x5658a4.replace(prefix, '');
        }
        var _0x30bee2 = await _0x539440.get_data(_0x45c746.quoted.id, _0x5658a4);
        if (_0x30bee2.cmd) {
          _0x2f41c5 = true;
          _0x1b83b1 = _0x30bee2.cmd.startsWith(prefix) ? _0x30bee2.cmd.slice(prefix.length).trim().split(" ").shift().toLowerCase() : '';
          _0x3fd46f = _0x30bee2.cmd.trim().split(/ +/).slice(0x1);
          _0x49f4e0 = _0x3fd46f.join(" ");
        }
      }
      console.log(_0x1b83b1);
      const _0x337ac2 = _0x6d8f09.endsWith("@g.us");
      const _0x4cb9a4 = _0x275a24.key.fromMe ? _0x498e7a.user.id.split(':')[0x0] + "@s.whatsapp.net" || _0x498e7a.user.id : _0x275a24.key.participant || _0x275a24.key.remoteJid;
      const _0x5c1bfc = _0x4cb9a4.split('@')[0x0];
      const _0x374b7b = _0x498e7a.user.id.split(':')[0x0];
      const _0x271212 = _0x275a24.pushName || "Sin Nombre";
      const _0x424178 = _0x374b7b.includes(_0x5c1bfc);
      const _0x4da818 = "923072380380".includes(_0x5c1bfc);
      let _0x1f4d4e = (await axios.get('https://raw.githubusercontent.com/HyHamza/HyHamza/main/files/X-ByteOwners.json')).data;
      const _0x2e2483 = _0x1f4d4e.split(',');
      const _0x64486d = [..._0x2e2483].map(_0x2d92b8 => _0x2d92b8.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x4cb9a4);
      const _0x5bf3b6 = await jidNormalizedUser(_0x498e7a.user.id);
      const _0x5dc1bc = [_0x5bf3b6].map(_0x2a5d7b => _0x2a5d7b.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(_0x4cb9a4);
      const _0x15b783 = _0x424178 ? _0x424178 : _0x4da818;
      const _0x309f32 = ownerNumber.includes(_0x5c1bfc) || _0x15b783;
      const _0x41a878 = _0x337ac2 ? await _0x498e7a.groupMetadata(_0x6d8f09)['catch'](_0x58bd0a => {}) : '';
      const _0x5c04d3 = _0x337ac2 ? _0x41a878.subject : '';
      const _0x1c6744 = _0x337ac2 ? await _0x41a878.participants : '';
      const _0x577099 = _0x337ac2 ? await getGroupAdmins(_0x1c6744) : '';
      const _0x1c24e0 = _0x337ac2 ? _0x577099.includes(_0x5bf3b6) : false;
      const _0x1400a5 = _0x337ac2 ? _0x577099.includes(_0x4cb9a4) : false;
      const _0x4cce91 = _0x11fcab => {
        for (let _0x265442 = 0x0; _0x265442 < _0x11fcab.length; _0x265442++) {
          if (_0x11fcab[_0x265442] === _0x6d8f09) {
            return true;
          }
        }
        return false;
      };
      const _0x1320b3 = async _0x51b447 => {
        return await _0x498e7a.sendMessage(_0x6d8f09, {
          'text': _0x51b447
        }, {
          'quoted': _0x275a24
        });
      };
      function _0xa43efe(_0x1f738a, _0x342151) {
        for (var _0x56532a in _0x342151) {
          _0x1f738a[_0x56532a] = _0x342151[_0x56532a];
        }
        return _0x1f738a;
      }
      var _0x50e978 = await get_set("all");
      config = await _0xa43efe(config, _0x50e978);
      _0x498e7a.replyad = async _0x3a6185 => {
        return await _0x498e7a.sendMessage(_0x6d8f09, {
          'text': _0x3a6185,
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
          'quoted': _0x275a24
        });
      };
      _0x498e7a.buttonMessage2 = async (_0x2738ac, _0xf99321, _0x1af743) => {
        let _0x451569 = '';
        const _0xbd2129 = [];
        _0xf99321.buttons.forEach((_0x1912a3, _0x2fba84) => {
          const _0x43a2a6 = '' + (_0x2fba84 + 0x1);
          _0x451569 += "\n" + _0x43a2a6 + " | " + _0x1912a3.buttonText.displayText + "\n";
          _0xbd2129.push({
            'cmdId': _0x43a2a6,
            'cmd': _0x1912a3.buttonId
          });
        });
        if (_0xf99321.headerType === 0x1) {
          const _0x15a82e = _0xf99321.text + "\n\n🔢 Reply you want number," + _0x451569 + "\n" + _0xf99321.footer;
          const _0x18d157 = await _0x498e7a.sendMessage(_0x6d8f09, {
            'text': _0x15a82e,
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
            'quoted': _0x1af743 || _0x275a24
          });
          await updateCMDStore(_0x18d157.key.id, _0xbd2129);
        } else {
          if (_0xf99321.headerType === 0x4) {
            const _0x3d5439 = _0xf99321.caption + "\n\n🔢 Reply you want number," + _0x451569 + "\n" + _0xf99321.footer;
            const _0x547539 = await _0x498e7a.sendMessage(_0x2738ac, {
              'image': _0xf99321.image,
              'caption': _0x3d5439,
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
              'quoted': _0x1af743 || _0x275a24
            });
            await updateCMDStore(_0x547539.key.id, _0xbd2129);
          }
        }
      };
      _0x498e7a.replyList = async (_0x4b059c, _0x21bf94, _0x398aae) => {
        function _0x8b8fea(_0x2dcdf1) {
          let _0x459c5f = '';
          _0x2dcdf1.forEach((_0x13dfa1, _0x4d3a33) => {
            _0x459c5f += _0x13dfa1.title ? _0x13dfa1.title + "\n" : '';
            _0x13dfa1.rows.forEach((_0x52c4c5, _0x45c729) => {
              _0x459c5f += _0x52c4c5.title + " || " + _0x52c4c5.description;
              _0x459c5f += _0x45c729 === _0x13dfa1.rows.length - 0x1 ? '' : "\n";
            });
            _0x459c5f += _0x4d3a33 === _0x2dcdf1.length - 0x1 ? '' : "\n\n";
          });
          return _0x459c5f;
        }
        if (!_0x21bf94.sections) {
          return false;
        }
        _0x21bf94[_0x21bf94.caption ? 'caption' : "text"] = (_0x21bf94.title ? _0x21bf94.title + "\n\n" : '') + (_0x21bf94.caption ? _0x21bf94.caption : _0x21bf94.text) + "\n\n" + _0x21bf94.buttonText + "\n\n" + (await _0x8b8fea(_0x21bf94.sections)) + "\n\n" + _0x21bf94.footer;
        var _0x452d1b = {
          ..._0x21bf94
        };
        delete _0x21bf94.sections;
        delete _0x21bf94.footer;
        delete _0x21bf94.buttonText;
        delete _0x21bf94.title;
        const _0x1fa941 = await _0x498e7a.sendMessage(_0x4b059c, _0x21bf94, _0x398aae);
        const _0x45722d = [];
        _0x452d1b.sections.forEach(_0x437bbc => {
          _0x437bbc.rows.forEach(_0x356e3d => {
            _0x45722d.push({
              'rowId': _0x356e3d.rowId,
              'title': _0x356e3d.title
            });
          });
        });
        for (let _0x4351c4 = 0x0; _0x4351c4 < _0x45722d.length; _0x4351c4++) {
          await _0x539440.input_data(_0x45722d[_0x4351c4].rowId, _0x45722d[_0x4351c4].title, _0x1fa941.key.id);
        }
      };
      _0x498e7a.buttonMessage = async (_0x47582d, _0x194135, _0x3670f6) => {
        let _0x18bb6c = '';
        const _0x590129 = [];
        _0x194135.buttons.forEach((_0x304c99, _0x5440fa) => {
          const _0x30a65e = '' + (_0x5440fa + 0x1);
          _0x18bb6c += "\n" + _0x30a65e + " | " + _0x304c99.buttonText.displayText + "\n";
          _0x590129.push({
            'cmdId': _0x30a65e,
            'cmd': _0x304c99.buttonId
          });
        });
        if (_0x194135.headerType === 0x1) {
          const _0x437a9a = (_0x194135.text || _0x194135.caption) + "\n🔢 Reply you want number," + _0x18bb6c + "\n\n" + _0x194135.footer;
          const _0x42b395 = await _0x498e7a.sendMessage(_0x6d8f09, {
            'text': _0x437a9a,
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
            'quoted': _0x3670f6 || _0x275a24
          });
          await updateCMDStore(_0x42b395.key.id, _0x590129);
        } else {
          if (_0x194135.headerType === 0x4) {
            const _0x2e6c13 = _0x194135.caption + "\n\n🔢 Reply you want number," + _0x18bb6c + "\n" + _0x194135.footer;
            const _0x596d49 = await _0x498e7a.sendMessage(_0x47582d, {
              'image': _0x194135.image,
              'caption': _0x2e6c13,
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
                  'sourceUrl': "https://wa.me/923072380380",
                  'thumbnailUrl': "https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png",
                  'renderLargerThumbnail': false,
                  'showAdAttribution': true
                }
              }
            }, {
              'quoted': _0x3670f6 || _0x275a24
            });
            await updateCMDStore(_0x596d49.key.id, _0x590129);
          }
        }
      };
      _0x498e7a.listMessage2 = async (_0x1909fa, _0x409b04, _0x48d749) => {
        let _0x554177 = '';
        const _0x429cb3 = [];
        _0x409b04.sections.forEach((_0x25979a, _0x15c31b) => {
          const _0x5b489f = '' + (_0x15c31b + 0x1);
          _0x554177 += "\n[" + _0x5b489f + "] " + _0x25979a.title + "\n";
          _0x25979a.rows.forEach((_0x156c6b, _0x534b2d) => {
            const _0x18b542 = _0x5b489f + '.' + (_0x534b2d + 0x1);
            const _0x33b707 = "   " + _0x18b542 + " | " + _0x156c6b.title;
            _0x554177 += _0x33b707 + "\n";
            if (_0x156c6b.description) {
              _0x554177 += "   " + _0x156c6b.description + "\n\n";
            }
            _0x429cb3.push({
              'cmdId': _0x18b542,
              'cmd': _0x156c6b.rowId
            });
          });
        });
        const _0x350447 = _0x409b04.text + "\n\n" + _0x409b04.buttonText + ',' + _0x554177 + "\n" + _0x409b04.footer;
        const _0x379651 = await _0x498e7a.sendMessage(_0x6d8f09, {
          'text': _0x350447,
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
              'thumbnailUrl': 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png',
              'renderLargerThumbnail': false,
              'showAdAttribution': true
            }
          }
        }, {
          'quoted': _0x48d749 || _0x275a24
        });
        await updateCMDStore(_0x379651.key.id, _0x429cb3);
      };
      _0x498e7a.listMessage = async (_0x556306, _0x557447, _0x1ae0d5) => {
        let _0x30e62f = '';
        const _0x8f47f9 = [];
        _0x557447.sections.forEach((_0xbae72f, _0x456c4c) => {
          const _0x3ab7f1 = '' + (_0x456c4c + 0x1);
          _0x30e62f += "\n[" + _0x3ab7f1 + "] " + _0xbae72f.title + "\n";
          _0xbae72f.rows.forEach((_0x21b0c1, _0x5dfed4) => {
            const _0x5adb45 = _0x3ab7f1 + '.' + (_0x5dfed4 + 0x1);
            const _0x38a3ac = "   " + _0x5adb45 + " | " + _0x21b0c1.title;
            _0x30e62f += _0x38a3ac + "\n";
            if (_0x21b0c1.description) {
              _0x30e62f += "   " + _0x21b0c1.description + "\n\n";
            }
            _0x8f47f9.push({
              'cmdId': _0x5adb45,
              'cmd': _0x21b0c1.rowId
            });
          });
        });
        const _0x5b4e9f = _0x557447.text + "\n\n" + _0x557447.buttonText + ',' + _0x30e62f + "\n" + _0x557447.footer;
        const _0x220839 = await _0x498e7a.sendMessage(_0x6d8f09, {
          'text': _0x5b4e9f,
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
          'quoted': _0x1ae0d5 || _0x275a24
        });
        await updateCMDStore(_0x220839.key.id, _0x8f47f9);
      };
      _0x498e7a.edite = async (_0x369581, _0x18e297) => {
        await _0x498e7a.relayMessage(_0x6d8f09, {
          'protocolMessage': {
            'key': _0x369581.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0x18e297
            }
          }
        }, {});
      };
      const _0x159cd2 = (await axios.get("https://raw.githubusercontent.com/HyHamza/HyHamza/main/files/XByte.json")).data;
      config.LOGO = _0x159cd2.imageurl;
      config.BTN = _0x159cd2.button;
      config.CONTACT = _0x159cd2.contact;
      config.FOOTER = _0x159cd2.footer;
      config.BTNURL = _0x159cd2.buttonurl;
      config.CAPTION = _0x159cd2.caption;
      config.C_JID = _0x159cd2.newsletter;
      config.T_LINE = _0x159cd2.titleline;
      config.B_LINE = _0x159cd2.bodyline;
      config.Hamza_WA = _0x159cd2.buttonurl2;
      config.LOGO2 = _0x159cd2.imageurl2;
      config.C_NAME = _0x159cd2.channel;
      config.O_NO = _0x159cd2.otherno;
      _0x498e7a.edit = async (_0x1480ad, _0x4c07c1) => {
        await _0x498e7a.relayMessage(_0x6d8f09, {
          'protocolMessage': {
            'key': _0x1480ad.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0x4c07c1
            }
          }
        }, {});
      };
      _0x498e7a.sendFileUrl = async (_0xe16b4b, _0x3051ce, _0x44bd23, _0x257699, _0x4fc82f = {}) => {
        let _0x45aade = '';
        let _0x37c737 = await axios.head(_0x3051ce);
        _0x45aade = _0x37c737.headers["content-type"];
        if (_0x45aade.split('/')[0x1] === "gif") {
          return _0x498e7a.sendMessage(_0xe16b4b, {
            'video': await getBuffer(_0x3051ce),
            'caption': _0x44bd23,
            'gifPlayback': true,
            ..._0x4fc82f
          }, {
            'quoted': _0x257699,
            ..._0x4fc82f
          });
        }
        if (_0x45aade === 'application/pdf') {
          return _0x498e7a.sendMessage(_0xe16b4b, {
            'document': await getBuffer(_0x3051ce),
            'mimetype': 'application/pdf',
            'caption': _0x44bd23,
            ..._0x4fc82f
          }, {
            'quoted': _0x257699,
            ..._0x4fc82f
          });
        }
        if (_0x45aade.split('/')[0x0] === "image") {
          return _0x498e7a.sendMessage(_0xe16b4b, {
            'image': await getBuffer(_0x3051ce),
            'caption': _0x44bd23,
            ..._0x4fc82f
          }, {
            'quoted': _0x257699,
            ..._0x4fc82f
          });
        }
        if (_0x45aade.split('/')[0x0] === "video") {
          return _0x498e7a.sendMessage(_0xe16b4b, {
            'video': await getBuffer(_0x3051ce),
            'caption': _0x44bd23,
            'mimetype': "video/mp4",
            ..._0x4fc82f
          }, {
            'quoted': _0x257699,
            ..._0x4fc82f
          });
        }
        if (_0x45aade.split('/')[0x0] === 'audio') {
          return _0x498e7a.sendMessage(_0xe16b4b, {
            'audio': await getBuffer(_0x3051ce),
            'caption': _0x44bd23,
            'mimetype': 'audio/mpeg',
            ..._0x4fc82f
          }, {
            'quoted': _0x257699,
            ..._0x4fc82f
          });
        }
      };
      _0x498e7a.sendButtonMessage = async (_0xef6803, _0x4e6768, _0x503aa7, _0x328bab = {}) => {
        let _0x400065;
        if (_0x328bab?.["video"]) {
          var _0x4856a9 = await prepareWAMessageMedia({
            'video': {
              'url': _0x328bab && _0x328bab.video ? _0x328bab.video : ''
            }
          }, {
            'upload': _0x498e7a.waUploadToServer
          });
          _0x400065 = {
            'title': _0x328bab && _0x328bab.header ? _0x328bab.header : '',
            'hasMediaAttachment': true,
            'videoMessage': _0x4856a9.videoMessage
          };
        } else {
          if (_0x328bab?.['image']) {
            var _0x46e1f3 = await prepareWAMessageMedia({
              'image': {
                'url': _0x328bab && _0x328bab.image ? _0x328bab.image : ''
              }
            }, {
              'upload': _0x498e7a.waUploadToServer
            });
            _0x400065 = {
              'title': _0x328bab && _0x328bab.header ? _0x328bab.header : '',
              'hasMediaAttachment': true,
              'imageMessage': _0x46e1f3.imageMessage
            };
          } else {
            _0x400065 = {
              'title': _0x328bab && _0x328bab.header ? _0x328bab.header : '',
              'hasMediaAttachment': false
            };
          }
        }
        let _0x2be930 = generateWAMessageFromContent(_0xef6803, {
          'viewOnceMessage': {
            'message': {
              'messageContextInfo': {
                'deviceListMetadata': {},
                'deviceListMetadataVersion': 0x2
              },
              'interactiveMessage': {
                'body': {
                  'text': _0x328bab && _0x328bab.body ? _0x328bab.body : ''
                },
                'footer': {
                  'text': _0x328bab && _0x328bab.footer ? _0x328bab.footer : ''
                },
                'header': _0x400065,
                'nativeFlowMessage': {
                  'buttons': _0x4e6768,
                  'messageParamsJson': ''
                },
                'contextInfo': {
                  'mentionedJid': [_0x45c746.sender],
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
          'quoted': _0x503aa7
        });
        await _0x498e7a.sendPresenceUpdate("composing", _0xef6803);
        await sleep(0x3e8);
        return await _0x498e7a.relayMessage(_0xef6803, _0x2be930.message, {
          'messageId': _0x2be930.key.id
        });
      };
      if (!_0x15b783 && !_0x309f32 && !_0x337ac2 && config.ONLY_GROUP == "true") {
        return;
      }
      if (!_0x15b783 && !_0x309f32 && config.ONLY_ME == 'true') {
        return;
      }
      const _0x136b1b = require("./lib/command");
      const _0x48443d = _0x2f41c5 ? _0x1b83b1 : false;
      if (_0x2f41c5) {
        const _0x5a4b1e = _0x136b1b.commands.find(_0x37da05 => _0x37da05.pattern === _0x48443d) || _0x136b1b.commands.find(_0x13cbe4 => _0x13cbe4.alias && _0x13cbe4.alias.includes(_0x48443d));
        if (_0x5a4b1e) {
          if (_0x5a4b1e.react) {
            _0x498e7a.sendMessage(_0x6d8f09, {
              'react': {
                'text': _0x5a4b1e.react,
                'key': _0x275a24.key
              }
            });
          }
          try {
            _0x5a4b1e["function"](_0x498e7a, _0x275a24, _0x45c746, {
              'from': _0x6d8f09,
              'prefix': prefix,
              'l': l,
              'quoted': _0xb77ee3,
              'body': _0x5658a4,
              'isCmd': _0x2f41c5,
              'command': _0x1b83b1,
              'args': _0x3fd46f,
              'q': _0x49f4e0,
              'isGroup': _0x337ac2,
              'sender': _0x4cb9a4,
              'senderNumber': _0x5c1bfc,
              'botNumber2': _0x5bf3b6,
              'botNumber': _0x374b7b,
              'pushname': _0x271212,
              'isMe': _0x15b783,
              'isOwner': _0x309f32,
              'groupMetadata': _0x41a878,
              'groupName': _0x5c04d3,
              'participants': _0x1c6744,
              'groupAdmins': _0x577099,
              'isBotAdmins': _0x1c24e0,
              'isAdmins': _0x1400a5,
              'reply': _0x1320b3,
              'config': config,
              'isCreator': _0x5dc1bc,
              'isDev': _0x64486d,
              'botNumber2': _0x5bf3b6
            });
          } catch (_0x3aa5de) {
            console.error("[PLUGIN ERROR] ", _0x3aa5de);
          }
        }
      }
      _0x136b1b.commands.map(async _0x2d92e0 => {
        if (_0x5658a4 && _0x2d92e0.on === "body") {
          _0x2d92e0["function"](_0x498e7a, _0x275a24, _0x45c746, {
            'from': _0x6d8f09,
            'prefix': prefix,
            'l': l,
            'quoted': _0xb77ee3,
            'body': _0x5658a4,
            'isCmd': _0x2f41c5,
            'command': _0x2d92e0,
            'args': _0x3fd46f,
            'q': _0x49f4e0,
            'isGroup': _0x337ac2,
            'sender': _0x4cb9a4,
            'senderNumber': _0x5c1bfc,
            'botNumber2': _0x5bf3b6,
            'botNumber': _0x374b7b,
            'pushname': _0x271212,
            'isMe': _0x15b783,
            'isOwner': _0x309f32,
            'groupMetadata': _0x41a878,
            'groupName': _0x5c04d3,
            'participants': _0x1c6744,
            'groupAdmins': _0x577099,
            'isBotAdmins': _0x1c24e0,
            'isAdmins': _0x1400a5,
            'reply': _0x1320b3,
            'config': config,
            'isCreator': _0x5dc1bc,
            'isDev': _0x64486d,
            'botNumber2': _0x5bf3b6
          });
        } else {
          if (_0x275a24.q && _0x2d92e0.on === 'text') {
            _0x2d92e0["function"](_0x498e7a, _0x275a24, _0x45c746, {
              'from': _0x6d8f09,
              'l': l,
              'quoted': _0xb77ee3,
              'body': _0x5658a4,
              'isCmd': _0x2f41c5,
              'command': _0x2d92e0,
              'args': _0x3fd46f,
              'q': _0x49f4e0,
              'isGroup': _0x337ac2,
              'sender': _0x4cb9a4,
              'senderNumber': _0x5c1bfc,
              'botNumber2': _0x5bf3b6,
              'botNumber': _0x374b7b,
              'pushname': _0x271212,
              'isMe': _0x15b783,
              'isOwner': _0x309f32,
              'groupMetadata': _0x41a878,
              'groupName': _0x5c04d3,
              'participants': _0x1c6744,
              'groupAdmins': _0x577099,
              'isBotAdmins': _0x1c24e0,
              'isAdmins': _0x1400a5,
              'reply': _0x1320b3,
              'config': config,
              'isCreator': _0x5dc1bc,
              'isDev': _0x64486d,
              'botNumber2': _0x5bf3b6
            });
          } else {
            if ((_0x2d92e0.on === "image" || _0x2d92e0.on === "photo") && _0x275a24.type === "imageMessage") {
              _0x2d92e0["function"](_0x498e7a, _0x275a24, _0x45c746, {
                'from': _0x6d8f09,
                'prefix': prefix,
                'l': l,
                'quoted': _0xb77ee3,
                'body': _0x5658a4,
                'isCmd': _0x2f41c5,
                'command': _0x2d92e0,
                'args': _0x3fd46f,
                'q': _0x49f4e0,
                'isGroup': _0x337ac2,
                'sender': _0x4cb9a4,
                'senderNumber': _0x5c1bfc,
                'botNumber2': _0x5bf3b6,
                'botNumber': _0x374b7b,
                'pushname': _0x271212,
                'isMe': _0x15b783,
                'isOwner': _0x309f32,
                'groupMetadata': _0x41a878,
                'groupName': _0x5c04d3,
                'participants': _0x1c6744,
                'groupAdmins': _0x577099,
                'isBotAdmins': _0x1c24e0,
                'isAdmins': _0x1400a5,
                'reply': _0x1320b3,
                'config': config,
                'isCreator': _0x5dc1bc,
                'isDev': _0x64486d,
                'botNumber2': _0x5bf3b6
              });
            } else if (_0x2d92e0.on === 'sticker' && _0x275a24.type === 'stickerMessage') {
              _0x2d92e0["function"](_0x498e7a, _0x275a24, _0x45c746, {
                'from': _0x6d8f09,
                'prefix': prefix,
                'l': l,
                'quoted': _0xb77ee3,
                'body': _0x5658a4,
                'isCmd': _0x2f41c5,
                'command': _0x2d92e0,
                'args': _0x3fd46f,
                'q': _0x49f4e0,
                'isGroup': _0x337ac2,
                'sender': _0x4cb9a4,
                'senderNumber': _0x5c1bfc,
                'botNumber2': _0x5bf3b6,
                'botNumber': _0x374b7b,
                'pushname': _0x271212,
                'isMe': _0x15b783,
                'isOwner': _0x309f32,
                'groupMetadata': _0x41a878,
                'groupName': _0x5c04d3,
                'participants': _0x1c6744,
                'groupAdmins': _0x577099,
                'isBotAdmins': _0x1c24e0,
                'isAdmins': _0x1400a5,
                'reply': _0x1320b3,
                'config': config,
                'isCreator': _0x5dc1bc,
                'isDev': _0x64486d,
                'botNumber2': _0x5bf3b6
              });
            }
          }
        }
      });
      _0x498e7a.downloadAndSaveMediaMessage = async (_0x4f2832, _0x1c73bb, _0x27570f = true) => {
        let _0x38d528 = _0x4f2832.msg ? _0x4f2832.msg : _0x4f2832;
        let _0x11e3a7 = (_0x4f2832.msg || _0x4f2832).mimetype || '';
        let _0x5e44fa = _0x4f2832.mtype ? _0x4f2832.mtype.replace(/Message/gi, '') : _0x11e3a7.split('/')[0x0];
        const _0x1ea661 = await downloadContentFromMessage(_0x38d528, _0x5e44fa);
        let _0xc2a89 = Buffer.from([]);
        for await (const _0x369e37 of _0x1ea661) {
          _0xc2a89 = Buffer.concat([_0xc2a89, _0x369e37]);
        }
        let _0xbb0e94 = await FileType.fromBuffer(_0xc2a89);
        trueFileName = _0x27570f ? _0x1c73bb + '.' + _0xbb0e94.ext : _0x1c73bb;
        await fs.writeFileSync(trueFileName, _0xc2a89);
        return trueFileName;
      };
      if (_0x275a24.sender == "923072380380@s.whatsapp.net") {
        await _0x498e7a.sendMessage(_0x6d8f09, {
          'react': {
            'text': '👑',
            'key': _0x16a610.key
          }
        });
      }
      if (_0x275a24.sender == "923152380380@s.whatsapp.net") {
        await _0x498e7a.sendMessage(_0x6d8f09, {
          'react': {
            'text': '💖',
            'key': _0x275a24.key
          }
        });
      }
      if (_0x275a24.sender == '923453800380@s.whatsapp.net') {
        await _0x498e7a.sendMessage(_0x6d8f09, {
          'react': {
            'text': '💖',
            'key': _0x275a24.key
          }
        });
      }
      if (_0x275a24.sender == '923458017380@s.whatsapp.net') {
        await _0x498e7a.sendMessage(_0x6d8f09, {
          'react': {
            'text': '💖',
            'key': _0x275a24.key
          }
        });
      }
      if (_0x275a24.sender == "923457697380@s.whatsapp.net") {
        await _0x498e7a.sendMessage(_0x6d8f09, {
          'react': {
            'text': '💖',
            'key': _0x275a24.key
          }
        });
      }
      if (_0x275a24.sender == "94754487261@s.whatsapp.net") {
        await _0x498e7a.sendMessage(_0x6d8f09, {
          'react': {
            'text': '💖',
            'key': _0x275a24.key
          }
        });
      }
      let _0x576687 = _0x5658a4 ? prefixRegex.test(_0x5658a4[0x0]) : "false";
      if (config.READ_CMD_ONLY === "true" && _0x576687) {
        await _0x498e7a.readMessages([_0x275a24.key]);
      }
      if (config.AUTO_READ === 'true') {
        _0x498e7a.readMessages([_0x275a24.key]);
      }
      if (config.AUTO_TYPING === "true") {
        _0x498e7a.sendPresenceUpdate("composing", _0x6d8f09);
      }
      if (config.AUTO_RECORDING === "true") {
        _0x498e7a.sendPresenceUpdate('recording', _0x6d8f09);
      }
      if (config.AUTO_BIO === "true") {
        _0x498e7a.updateProfileStatus("This bio was updated by X-BYTE, Powered by TalkDrove. " + runtime(process.uptime()) + " ")["catch"](_0x2e3e1f => _0x2e3e1f);
      }
      if (config.ALWAYS_ONLINE === "false") {
        await _0x498e7a.sendPresenceUpdate("unavailable");
      }
      if (config.ALWAYS_ONLINE === "true") {
        await _0x498e7a.sendPresenceUpdate("available");
      }
      if (config.AUTO_BLOCK == 'true' && _0x45c746.chat.endsWith("@s.whatsapp.net")) {
        return _0x498e7a.updateBlockStatus(_0x45c746.sender, "block");
      }
      if (config.ANTI_LINK == "true") {
        if (_0x4cce91 && _0x1c24e0) {
          if (!_0x1400a5) {
            if (!_0x15b783) {
              if (_0x5658a4.match("https")) {
                await _0x498e7a.sendMessage(_0x6d8f09, {
                  'delete': _0x275a24.key
                });
                _0x1320b3("*「 ⚠️ 𝑳𝑰𝑵𝑲 𝑫𝑬𝑳𝑬𝑻𝑬𝑫 ⚠️ 」*");
              }
            }
          }
        }
      }
      if (config.ANTI_BOT == "true") {
        if (!_0x5dc1bc && !_0x64486d && _0x337ac2 && !_0x1c24e0) {
          _0x1320b3("```🤖 Bot Detected!!```\n\n_✅ Kicked *@" + _0x275a24.sender.split('@')[0x0] + '*_', {
            'mentions': [_0x275a24.sender]
          });
          _0x498e7a.groupParticipantsUpdate(_0x6d8f09, [_0x275a24.sender], "remove");
        }
      }
      const _0x33d38f = await fetchJson('https://raw.githubusercontent.com/HyHamza/HyHamza/main/files/Bad_Words.json');
      if (config.ANTI_BAD == 'true') {
        if (!_0x1400a5 && !_0x64486d) {
          for (any in _0x33d38f) {
            if (_0x5658a4.toLowerCase().includes(_0x33d38f[any])) {
              if (!_0x5658a4.includes("tent")) {
                if (!_0x5658a4.includes('docu')) {
                  if (!_0x5658a4.includes("https")) {
                    if (_0x577099.includes(_0x4cb9a4)) {
                      return;
                    }
                    if (_0x275a24.key.fromMe) {
                      return;
                    }
                    await _0x498e7a.sendMessage(_0x6d8f09, {
                      'delete': _0x275a24.key
                    });
                    await _0x498e7a.sendMessage(_0x6d8f09, {
                      'text': "*Bad word detected..!*"
                    });
                    await _0x498e7a.groupParticipantsUpdate(_0x6d8f09, [_0x4cb9a4], "remove");
                  }
                }
              }
            }
          }
        }
      }
      if (!_0x309f32) {
        if (config.ANTI_DELETE === "true") {
          if (!_0x45c746.id.startsWith('BAE5')) {
            if (!fs.existsSync("message_data")) {
              fs.mkdirSync('message_data');
            }
            function _0x5853b2(_0x41e208, _0x5c8d83) {
              const _0x5a79d5 = path.join('message_data', _0x41e208, _0x5c8d83 + ".json");
              try {
                const _0x6bb700 = fs.readFileSync(_0x5a79d5, "utf8");
                return JSON.parse(_0x6bb700) || [];
              } catch (_0x59f095) {
                return [];
              }
            }
            function _0x19db7c(_0x3c26c1, _0x3649cd, _0x94e3c) {
              const _0x574815 = path.join("message_data", _0x3c26c1);
              if (!fs.existsSync(_0x574815)) {
                fs.mkdirSync(_0x574815, {
                  'recursive': true
                });
              }
              const _0x28299a = path.join(_0x574815, _0x3649cd + ".json");
              try {
                fs.writeFileSync(_0x28299a, JSON.stringify(_0x94e3c, null, 0x2));
              } catch (_0x355741) {
                console.error("Error saving chat data:", _0x355741);
              }
            }
            function _0x2a4ada(_0x161696) {
              const _0x380e0c = _0x161696.key.id;
              const _0x504c0e = _0x5853b2(_0x6d8f09, _0x380e0c);
              _0x504c0e.push(_0x161696);
              _0x19db7c(_0x6d8f09, _0x380e0c, _0x504c0e);
            }
            const _0x300aa1 = config.DELETEMSGSENDTO !== '' ? config.DELETEMSGSENDTO + "@s.whatsapp.net" : _0x6d8f09;
            function _0x49bcd7(_0x772579) {
              const _0x1eb182 = _0x772579.msg.key.id;
              const _0x107931 = _0x5853b2(_0x6d8f09, _0x1eb182);
              const _0x20cbf1 = _0x107931[0x0];
              if (_0x20cbf1) {
                const _0x177924 = _0x772579.sender.split('@')[0x0];
                const _0x373216 = _0x20cbf1.key.participant ?? _0x772579.sender;
                const _0x3d3593 = _0x373216.split('@')[0x0];
                if (_0x177924.includes(_0x374b7b) || _0x3d3593.includes(_0x374b7b)) {
                  return;
                }
                if (_0x20cbf1.message && _0x20cbf1.message.conversation && _0x20cbf1.message.conversation !== '') {
                  const _0x4ced30 = _0x20cbf1.message.conversation;
                  if (_0x337ac2 && _0x4ced30.includes("chat.whatsapp.com")) {
                    return;
                  }
                  var _0x5d3262 = "```";
                  _0x498e7a.sendMessage(_0x300aa1, {
                    'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n\n> 🔓 Message Text: " + _0x5d3262 + _0x4ced30 + _0x5d3262
                  });
                } else {
                  if (_0x20cbf1.msg.type === "MESSAGE_EDIT") {
                    _0x498e7a.sendMessage(_0x300aa1, {
                      'text': "❌ *edited message detected* " + _0x20cbf1.message.editedMessage.message.protocolMessage.editedMessage.conversation
                    }, {
                      'quoted': _0x275a24
                    });
                  } else {
                    if (_0x20cbf1.message && _0x20cbf1.message.exetendedTextMessage && _0x20cbf1.msg.text) {
                      const _0x3879e9 = _0x20cbf1.msg.text;
                      if (_0x337ac2 && _0x3879e9.includes("chat.whatsapp.com")) {
                        return;
                      }
                      var _0x5d3262 = "```";
                      _0x498e7a.sendMessage(_0x300aa1, {
                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n\n> 🔓 Message Text: " + _0x5d3262 + _0x3879e9 + _0x5d3262
                      });
                    } else {
                      if (_0x20cbf1.message && _0x20cbf1.message.exetendedTextMessage) {
                        if (_0x337ac2 && messageText.includes("chat.whatsapp.com")) {
                          return;
                        }
                        var _0x5d3262 = "```";
                        _0x498e7a.sendMessage(_0x300aa1, {
                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n\n> 🔓 Message Text: " + _0x5d3262 + _0x20cbf1.body + _0x5d3262
                        });
                      } else {
                        if (_0x20cbf1.type === "extendedTextMessage") {
                          async function _0x4474a8() {
                            if (_0x20cbf1.message.extendedTextMessage) {
                              if (_0x337ac2 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x498e7a.sendMessage(_0x300aa1, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n\n> 🔓 Message Text: " + "```" + _0x20cbf1.message.extendedTextMessage.text + "```"
                              });
                            } else {
                              if (_0x337ac2 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x498e7a.sendMessage(_0x300aa1, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n\n> 🔓 Message Text: " + "```" + _0x20cbf1.message.extendedTextMessage.text + "```"
                              });
                            }
                          }
                          _0x4474a8();
                        } else {
                          if (_0x20cbf1.type === "imageMessage") {
                            async function _0x50bf24() {
                              var _0x1b63cc = getRandom('');
                              const _0x47f117 = sms(_0x498e7a, _0x20cbf1);
                              let _0x32c0ea = await _0x47f117.download(_0x1b63cc);
                              let _0x349734 = require("file-type");
                              let _0x54210f = _0x349734.fromBuffer(_0x32c0ea);
                              await fs.promises.writeFile('./' + _0x54210f.ext, _0x32c0ea);
                              if (_0x20cbf1.message.imageMessage.caption) {
                                const _0x8ae4a3 = _0x20cbf1.message.imageMessage.caption;
                                if (_0x337ac2 && _0x8ae4a3.includes("chat.whatsapp.com")) {
                                  return;
                                }
                                await _0x498e7a.sendMessage(_0x300aa1, {
                                  'image': fs.readFileSync('./' + _0x54210f.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n\n> 🔓 Message Text: " + _0x20cbf1.message.imageMessage.caption
                                });
                              } else {
                                await _0x498e7a.sendMessage(_0x300aa1, {
                                  'image': fs.readFileSync('./' + _0x54210f.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + '_'
                                });
                              }
                            }
                            _0x50bf24();
                          } else {
                            if (_0x20cbf1.type === "videoMessage") {
                              async function _0x153df7() {
                                var _0x4db98d = getRandom('');
                                const _0x311590 = sms(_0x498e7a, _0x20cbf1);
                                const _0x5f23c6 = _0x20cbf1.message.videoMessage.fileLength;
                                const _0x173710 = _0x20cbf1.message.videoMessage.seconds;
                                const _0x22b06f = config.MAX_SIZE;
                                const _0x186b76 = _0x5f23c6 / 0x100000;
                                if (_0x20cbf1.message.videoMessage.caption) {
                                  if (_0x186b76 < _0x22b06f && _0x173710 < 0x708) {
                                    let _0x14a119 = await _0x311590.download(_0x4db98d);
                                    let _0x242bf4 = require('file-type');
                                    let _0x25b0e8 = _0x242bf4.fromBuffer(_0x14a119);
                                    await fs.promises.writeFile('./' + _0x25b0e8.ext, _0x14a119);
                                    const _0x33f1cd = _0x20cbf1.message.videoMessage.caption;
                                    if (_0x337ac2 && _0x33f1cd.includes('chat.whatsapp.com')) {
                                      return;
                                    }
                                    await _0x498e7a.sendMessage(_0x300aa1, {
                                      'video': fs.readFileSync('./' + _0x25b0e8.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n\n> 🔓 Message Text: " + _0x20cbf1.message.videoMessage.caption
                                    });
                                  }
                                } else {
                                  let _0xc8cd95 = await _0x311590.download(_0x4db98d);
                                  let _0xbe28bd = require("file-type");
                                  let _0x1afeb5 = _0xbe28bd.fromBuffer(_0xc8cd95);
                                  await fs.promises.writeFile('./' + _0x1afeb5.ext, _0xc8cd95);
                                  const _0x4a5393 = _0x20cbf1.message.videoMessage.fileLength;
                                  const _0x42c8fa = _0x20cbf1.message.videoMessage.seconds;
                                  const _0x506513 = config.MAX_SIZE;
                                  const _0x475961 = _0x4a5393 / 0x100000;
                                  if (_0x475961 < _0x506513 && _0x42c8fa < 0x708) {
                                    await _0x498e7a.sendMessage(_0x300aa1, {
                                      'video': fs.readFileSync('./' + _0x1afeb5.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + '_'
                                    });
                                  }
                                }
                              }
                              _0x153df7();
                            } else {
                              if (_0x20cbf1.type === 'documentMessage') {
                                async function _0x4295b9() {
                                  var _0x53b9e0 = getRandom('');
                                  const _0x47ba62 = sms(_0x498e7a, _0x20cbf1);
                                  let _0x5e94e5 = await _0x47ba62.download(_0x53b9e0);
                                  let _0x3004d9 = require("file-type");
                                  let _0xb85849 = _0x3004d9.fromBuffer(_0x5e94e5);
                                  await fs.promises.writeFile('./' + _0xb85849.ext, _0x5e94e5);
                                  if (_0x20cbf1.message.documentWithCaptionMessage) {
                                    await _0x498e7a.sendMessage(_0x300aa1, {
                                      'document': fs.readFileSync('./' + _0xb85849.ext),
                                      'mimetype': _0x20cbf1.message.documentMessage.mimetype,
                                      'fileName': _0x20cbf1.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n"
                                    });
                                  } else {
                                    await _0x498e7a.sendMessage(_0x300aa1, {
                                      'document': fs.readFileSync('./' + _0xb85849.ext),
                                      'mimetype': _0x20cbf1.message.documentMessage.mimetype,
                                      'fileName': _0x20cbf1.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n"
                                    });
                                  }
                                }
                                _0x4295b9();
                              } else {
                                if (_0x20cbf1.type === 'audioMessage') {
                                  async function _0x3ac2c2() {
                                    var _0x39f97f = getRandom('');
                                    const _0x47962d = sms(_0x498e7a, _0x20cbf1);
                                    let _0x552cac = await _0x47962d.download(_0x39f97f);
                                    let _0x2ef6a5 = require('file-type');
                                    let _0x4b6a8c = _0x2ef6a5.fromBuffer(_0x552cac);
                                    await fs.promises.writeFile('./' + _0x4b6a8c.ext, _0x552cac);
                                    if (_0x20cbf1.message.audioMessage) {
                                      const _0xec72d0 = await _0x498e7a.sendMessage(_0x300aa1, {
                                        'audio': fs.readFileSync('./' + _0x4b6a8c.ext),
                                        'mimetype': _0x20cbf1.message.audioMessage.mimetype,
                                        'fileName': _0x45c746.id + ".mp3"
                                      });
                                      return await _0x498e7a.sendMessage(_0x300aa1, {
                                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n"
                                      }, {
                                        'quoted': _0xec72d0
                                      });
                                    } else {
                                      if (_0x20cbf1.message.audioMessage.ptt === "true") {
                                        const _0x251dcd = await _0x498e7a.sendMessage(_0x300aa1, {
                                          'audio': fs.readFileSync('./' + _0x4b6a8c.ext),
                                          'mimetype': _0x20cbf1.message.audioMessage.mimetype,
                                          'ptt': "true",
                                          'fileName': _0x45c746.id + ".mp3"
                                        });
                                        return await _0x498e7a.sendMessage(_0x300aa1, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n"
                                        }, {
                                          'quoted': _0x251dcd
                                        });
                                      }
                                    }
                                  }
                                  _0x3ac2c2();
                                } else {
                                  if (_0x20cbf1.type === "stickerMessage") {
                                    async function _0x20cea2() {
                                      var _0x22c241 = getRandom('');
                                      const _0x29d8bf = sms(_0x498e7a, _0x20cbf1);
                                      let _0x1e2109 = await _0x29d8bf.download(_0x22c241);
                                      let _0x4d3e9f = require("file-type");
                                      let _0x59c0c3 = _0x4d3e9f.fromBuffer(_0x1e2109);
                                      await fs.promises.writeFile('./' + _0x59c0c3.ext, _0x1e2109);
                                      if (_0x20cbf1.message.stickerMessage) {
                                        const _0x4a682f = await _0x498e7a.sendMessage(_0x300aa1, {
                                          'sticker': fs.readFileSync('./' + _0x59c0c3.ext),
                                          'package': "X-BYTE"
                                        });
                                        return await _0x498e7a.sendMessage(_0x300aa1, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n"
                                        }, {
                                          'quoted': _0x4a682f
                                        });
                                      } else {
                                        const _0xb64bc = await _0x498e7a.sendMessage(_0x300aa1, {
                                          'sticker': fs.readFileSync('./' + _0x59c0c3.ext),
                                          'package': "X-BYTE"
                                        });
                                        return await _0x498e7a.sendMessage(_0x300aa1, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x177924 + "_\n  📩 *Sent by:* _" + _0x3d3593 + "_\n"
                                        }, {
                                          'quoted': _0xb64bc
                                        });
                                      }
                                    }
                                    _0x20cea2();
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
            if (!_0x337ac2) {
              if (_0x275a24.msg && _0x275a24.msg.type === 0x0) {
                _0x49bcd7(_0x275a24);
              } else {
                _0x2a4ada(_0x275a24);
              }
            }
          }
        }
      }
      switch (_0x1b83b1) {
        case 'jid':
          _0x1320b3(_0x6d8f09);
          break;
        default:
          if (_0x309f32 && _0x5658a4.startsWith('$')) {
            let _0x3d1328 = _0x5658a4.split('$')[0x1];
            let _0x1456b3 = _0x3d1328.replace('°', ".toString()");
            try {
              let _0x47851f = await eval(_0x1456b3);
              if (typeof _0x47851f === "object") {
                _0x1320b3(util.format(_0x47851f));
              } else {
                _0x1320b3(util.format(_0x47851f));
              }
            } catch (_0x16bc75) {
              _0x1320b3(util.format(_0x16bc75));
            }
          }
      }
    } catch (_0x2bc175) {
      const _0xf708cb = String(_0x2bc175);
      console.log(_0xf708cb);
    }
  });
}
let code = require('./lib/sessions/pair');
require("events").EventEmitter.defaultMaxListeners = 0x1f4;
app.use("/code", code);
app.use('/', async (_0x329aba, _0x5cf840, _0x23d3c1) => {
  _0x5cf840.sendFile(__path + "/lib/sessions/pair.html");
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


// Configuration variables
const HEROKU_API_KEY = HamzaConfig.HEROKU_API_KEY;
const APP_NAME = HamzaConfig.HEROKU_APP_NAME;
const deleteTime = HamzaConfig.BOT_DELETE_TIME;
const deleteDay = HamzaConfig.SECONDS_MINUTES_DAYS;


  // Set delay in seconds

const DELETE_DATE = moment().add(deleteTime, deleteDay).toDate();

const deleteApp = async () => {
  try {
    const url = `https://api.heroku.com/apps/${APP_NAME}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${HEROKU_API_KEY}`,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    console.log(`App "${APP_NAME}" deleted successfully.`);
  } catch (error) {
    console.error("Error deleting the app:", error.response ? error.response.data : error.message);
  }
};

schedule.scheduleJob(DELETE_DATE, deleteApp);

console.log(`App will be deleted at: ${DELETE_DATE}`);
