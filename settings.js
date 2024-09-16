const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
return text === fault ? true : false;
}

module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUhpcTZUQ21QRGZoVzlPZlp3WXZSZ2xaMjlQZWo5N01mdHdldUZFOCtVUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXQySldONGZnazRYZ2JHaXlmY2Z3V0d6MTY3MVdLL0tJeXhSMlR0STFIWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTDcwYjd3TU51c1FyVE10L3JhRllKL1hDbkQ2aHkyMkpQczhtaDhzNUhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4OUdYWExvOFVVaDZpVmVtSGNQUzNMZ1FwSW5DUjdGMjB0Ty9raUZzTFNNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldENEYzalQzSjhsVjNwTXROaDZIanZ4K3BoSWRpQVBUWENkNEtQbmlNVW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVibkE1eitsamY2ZWgyRytyenNVdjloL1U2bGY4c2lsSFFBMmFyZ2k5QVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ04yMjVwZ2V4VVNxS2tqUTMzbWlPdHl1ZEdITVpkSEU4WDZWUXU3ZmRGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibCtMRG9nUE16RkdwZS9IVVhqNXZJVUdxM0IwSktuMHNWSmg4MktnSEhEST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZZOHJ2am1YcjNWYzYyVG9PQzF4YkJjYnM4WHkwZDFYMEVWUHQ2TG9MenFGOVZhNXJuNGdwWFNmS2RycFpaMml0NlV0L1B2NThTbmtvaXh1SDE2S0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzQsImFkdlNlY3JldEtleSI6Ilc3Z2ZOQ3dLdjg5N2hjcm1HMnluc1NPM1l3Q3V0ZGdWQ21oT1lMcUNLZXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjI4OTM2NTg5NTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjRGMjAyNkQ1NjlDNDk2Mjg1QkJCMDM0RkY2QTlFNzEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjUwMDM2Nn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjI4OTM2NTg5NTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTMzMDhCMUQ0MDlDNDU2MTA4NTdEMUE5MUMyNjNDRDAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjUwMDM3Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiY1h5Snh5XzJTM2VWb1RuV3g4VVZFQSIsInBob25lSWQiOiIwNDJkZWFjNC1jMDE3LTQ0ZGYtOTI2ZS0xMDEwZTMyZGVhNDYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTEJOK1c0SjRRcno0S2U0ZCtGK241OVNLLzJzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkIyaXVwRUd3UmVFYTN4VmFnNnI4UDNFc2R1cz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJUNThZQTE0TCIsIm1lIjp7ImlkIjoiMjI4OTM2NTg5NTE6MTRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoid29uZGVyIHdpc2UifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pHZ3dNOEJFUHFib2JjR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Imw4OGtmK004VytoaXlEOE52d1FiUnBGNmVMK0lqTThnSEVQbGQvZ3BneE09IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik1DQXlreEtCNUcrTmZkaERjM1htM2NMRXdjUTRzODZ5TEoxTHp4TjVOc0dvZHFWdXpJY3kraTRDSys2dzRvVC9tZmlkWkNrdkZDYVJsdEdXbyt3R0R3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJuMDNJbVBMbkUxNEs2TmxmODYyL3E1MmVSZyt6MjJsWXQ1UFRWbXJpS2lDczllSitZOVAzdEZVNVFnOHlMTW92by9RdEt1OTlHempnclJuNTQ5QTFBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyODkzNjU4OTUxOjE0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpmUEpIL2pQRnZvWXNnL0RiOEVHMGFSZW5pL2lJelBJQnhENVhmNEtZTVQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY1MDAzNjAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUFI2In0=' : process.env.SESSION_ID,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '22893658951' : process.env.OWNER_NUMBER,   
ONLY_GROUP: process.env.ONLY_GROUP === undefined ? 'false' : process.env.ONLY_GROUP,
ONLY_ME: process.env.ONLY_ME === undefined ? 'true' : process.env.ONLY_ME,
AUTO_STATUS_READ:  process.env.AUTO_STATUS_READ  || false  ,
PREFIX: process.env.PREFIX || '.' ,
POSTGRESQL_URL: process.env.POSTGRESQL_URL === undefined ? 'postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9' : process.env.POSTGRESQL_URL,
MAX_SIZE: 500, 
ALIVE:  process.env.ALIVE  || ''  ,
FOOTER: process.env.FOOTER=== undefined ? 'POWERED BY HAMZA': process.env.FOOTER,
OWNER_REACT:  process.env.OWNER_REACT  || true  ,
ADMIN_EVENT:  process.env.ADMIN_EVENT  || true  ,   
AUTO_BLOCK:  process.env.AUTO_BLOCK  || false  ,
AUTO_VOICE:  process.env.AUTO_VOICE  || false  ,
AUTO_STICKER: process.env.AUTO_STICKER || false  ,
ANTI_BAD: process.env.ANTI_BAD || false  ,
AUTO_REACT:  process.env.AUTO_REACT  || false  ,
AUTO_TYPING:  process.env.AUTO_TYPING  || false  ,
AUTO_RECORDING:  process.env.AUTO_RECORDING  || false  ,
AUTO_READ:  process.env.AUTO_READ  || false  ,
READ_CMD_ONLY:  process.env.READ_CMD_ONLY  || false  ,
AUTO_BIO:  process.env.AUTO_BIO  || false  ,   
ALWAYS_ONLINE:  process.env.ALWAYS_ONLINE  || false  ,
WORK_TYPE: process.env.WORK_TYPE || 'private' ,
ANTI_LINK: process.env.ANTI_LINK || true  ,
ANTI_BOT: process.env.ANTI_BOT || true  ,
ANTI_CALL: process.env.ANTI_CALL || false  ,
AI_CHATBOT: process.env.AI_CHATBOT || false  ,
AI_IMAGE: process.env.AI_IMAGE || true  ,
MATHS_AI: process.env.MATHS_AI || false  ,
WELCOME: process.env.WELCOME || false  ,  
HEROKU_API_KEY: process.env.HEROKU_API_KEY === undefined ? '' : process.env.HEROKU_API_KEY,
HEROKU_APP_NAME: process.env.HEROKU_APP_NAME === undefined ? '' : process.env.HEROKU_APP_NAME, 
LOGO: process.env.LOGO || `https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png` ,
COMMAND_TYPE: process.env.COMMAND_TYPE || 'button' ,
LANG: process.env.LANG || 'ENG' , //URDU OR ENG
ANTI_DELETE : process.env.ANTI_DELETE || true ,
// BLOCK_COUNTRY_PREFIX : process.env.BLOCK_COUNTRY_PREFIX || "1",
BOT_EXPIRY_DATE : process.env.BOT_EXPIRY_DATE || '2029-09-05',
BOT_EXPIRY_TIME : process.env.BOT_EXPIRY_TIME || '16:24:00',
DELETEMSGSENDTO : process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO  

};
