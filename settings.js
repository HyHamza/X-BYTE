const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
return text === fault ? true : false;
}

module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUVEZCs5aEFSbUpsNldsc1pSREFlZk1OUFhLaUw5U0MvcGtJT0FlZDhGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUZGMDRzd1F0ZG03MStWZGZHTWQ0WmhMdGc4TFNnZmt6UGo0MDc4MFdIcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTW5rc3ZVeWhDSUp6cTQzcWMvVXNGbVltUHh3YmNiV2JBV3pmU3I2UFZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHVmF6N3ducW01dG5odzZHSkVsZWttWUdobDBZelRlYk0yZFBDdDhlVVVnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNOeWV4YlBnc25xS2Y0aHlOczR2N1JDU0lUQk8zbGE5YmF4Mk52RVhBbkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9OZzRlQ21QczNIQmNsUWI3aXpkb1FxNU1tK3FnSzdMUUxNYUNCb1R4VGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUdLQ1pLeGZhYmFycWZ6UjZaNW5KdEIzcE1jUnZPNjdPN2dNTitYS1Nsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmZDUDRKRzdUNUplYzZKUEFUNUIzcXFDR0l0LytwTUdHVENpdFRiczFsTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQrcjNZaHpkb0x3MkFRaENhUktIRldLNWpLMkROOGlKRDVGWFVnaUtUeHpFTDlMaUUrZElTRkgxMFJkQnZzclgxaGFuaDZ3Qk5sM0NmcWIyWnd2OGhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6IjB3K1F6UDNaMWNKUUlPakU4MndCaHR3QU55Rm1Lbi9idHcxVHhqdEsrZmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjZMMkptVjU3UTdLQjd4cE5FVmN3aXciLCJwaG9uZUlkIjoiNTkxMTE4OWYtOGM2Ny00YmE2LThjM2UtNzc5ZTk1MmQwZDA0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldQR2FEZ2lRazFjNU5Ma2RJb3oyQkdMekNUMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6NlhZS0tXd3h0dFJaNmx3eWkrUGk4QjZkUVE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiN0c5WlBMV1oiLCJtZSI6eyJpZCI6IjkyMzI5Nzg1OTkyNDoyM0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlhjakhzUTNMbU10d1lZQ2lBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicXpzOGlxazFQYjFmQ3FWcEhqWG9ncS92V2lWdWlkazBOcDd0ckFpRXdBND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUWFTVjRRdFVuRW85WmwzS0FISFBTZm55TG9IRjV4ZDN2eitEY3BUUHJLa3ZYVzczWEU5aCtpSjNrTHl3bExFWExEU0R3S3NhZC9USmRlbWMraGwvQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IkowTEhVTWpYcVQwQ2tabjUwZ294TGRjVW1aQUlOL3ZpL1VGRHBJc2FuNFBMRU5FU0xqeExPeVVFMkJwNVF1VFZJQ1ZQczdBZWh2eEx5K0pTeXF6SmlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMjk3ODU5OTI0OjIzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFzN1BJcXBOVDI5WHdxbGFSNDE2SUt2NzFvbGJvblpORGFlN2F3SWhNQU8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjYxNjAxMDYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSVd0In0=' : process.env.SESSION_ID,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '923458017380' : process.env.OWNER_NUMBER,   
ONLY_GROUP: process.env.ONLY_GROUP === undefined ? 'false' : process.env.ONLY_GROUP,
ONLY_ME: process.env.ONLY_ME === undefined ? 'false' : process.env.ONLY_ME,
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
ANTI_LINK: process.env.ANTI_LINK || false  ,
ANTI_BOT: process.env.ANTI_BOT || false  ,
ANTI_CALL: process.env.ANTI_CALL || false  ,
AI_CHATBOT: process.env.AI_CHATBOT || false  ,
AI_IMAGE: process.env.AI_IMAGE || false  ,
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
