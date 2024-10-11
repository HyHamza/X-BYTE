const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
return text === fault ? true : false;
}

module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1B4NXJHdDJMUXZSWHp6bUVYS2J5MEptQTRsZVU1NlQ0RkFoOUhtVzUxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWNpZzdxdUx5TUpDSlBuUVVDQjBDcEJZdW93UTlXZmxtbUVOMkR6TDFpZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwQkx4bWhwczh2UzRobVN3THY5eUpjOVJTaFRLYUU0VjJ2NVR2cFJCUVg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Vlpka3laSVhNd2tDa0NEanMwS0E1UEtZUU9FYXhsMUZacTRMUTRBNXhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBc1N2anlsR1ZZWnJ0MFBWMlJUWkxJUjFXU3ZPTFQ5cDg0TkxZTUNLMWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVIc3dteGFVTEF6dVgrdVU1dDZkQVR4cFNKYUI4cHJWYzlJVW5Ram9mUUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0xXR0ZiSnlydlpkdHhKWmJaTXV3RVJhTHo4eHEzYkJ0MzNMRFlEdlkyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUllTkU4emFTamdHaDdJT0JQNzRhMXRiUFpxTEQwcEJOZU5SQXhaK05sWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ5cVVDeEVpcjBpZU5GdnpjRFpBVlFkZDdRaUF0S21aYmhQTEIyNkoxdzcxOGJYRGtLVThFNDJnS3FidHZmTGx1Z3VJRE41UEhYTWhqeDgwcDZuTkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA2LCJhZHZTZWNyZXRLZXkiOiJ4V1YwMWF0amN3T01kd3M1U0RvUHkvMitFQ00vMENLMlFUOWMrazNpMTVvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQwMzM5NzA0NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2RERCMTM1N0Q2NzU1NTBGMUJFMkM2NEExMTFFRDczNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI4MzY1OTYzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjM0MDMzOTcwNDZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNERBQjY2NUU4NUUyNkY5RTJBQzkyRDFGNkJCRTdFNDkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODM2NTk2M30seyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzNDAzMzk3MDQ2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjkwNTM3OERDMjYwODAyNDZEQkJENDIxOUM5RUMwMTQwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjgzNjU5NzJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjRmTHluMmVMVDMtT0xIbEZiWlAzRVEiLCJwaG9uZUlkIjoiY2RmY2QwMjMtYWI5My00ZWNkLTk0ZDgtNzM2OTdlMmM0NTg1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkloTGtWakQ0aWw0TkpNNHFwSHVGNFdWNk9sND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpNGxsTVE4UjRQZm1rd0Y2UEpmaVgrZHhFZ289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRkVTSjcxRFoiLCJtZSI6eyJpZCI6IjkyMzQwMzM5NzA0NjoxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJQZWdhc3VzIEJvdCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT092KzhjQkVQaUtrN2dHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRnhpbExDbXV4N3ZLNnBpK0Z2QTRiYktRMk5NTlJiNDgyZnd0bnVBMGJXRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWkFnUmZhTjRwdnZiUVlJYTRMSXBOYTFLZWpxRGFia3lKeHltMkI3WDRoVHV5WW1Kb1VKRXZGQjAzWTA5Z1VlWkZyNk9WZ0NmRmZVbnJmVm9uSjRJQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IjJjSWdLdGpXSjhnTDkyZkwrbitsMHZFTjcrQWd5ckRoSjhDWStIWjFmMytoTllFOC9mMmNsZVVIL2ZSNkNqVExLd2dSZTZ5Y09TYjFOaDJKRE1rc0J3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNDAzMzk3MDQ2OjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJjWXBTd3Byc2U3eXVxWXZoYndPRzJ5a05qVERVVytQTm44TFo3Z05HMWgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjgzNjU5NTgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSzk1In0=' : process.env.SESSION_ID,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '+923403397046' : process.env.OWNER_NUMBER,   
ONLY_GROUP: process.env.ONLY_GROUP === undefined ? 'false' : process.env.ONLY_GROUP,
ONLY_ME: process.env.ONLY_ME === undefined ? 'false' : process.env.ONLY_ME,
AUTO_STATUS_READ:  process.env.AUTO_STATUS_READ  || false  ,
PREFIX: process.env.PREFIX || '.' ,
POSTGRESQL_URL: process.env.POSTGRESQL_URL === undefined ? 'postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9' : process.env.POSTGRESQL_URL,
MAX_SIZE: 500, 
ALIVE:  process.env.ALIVE  || 'im alive yadi dia'  ,
FOOTER: process.env.FOOTER=== undefined ? '> Created by pegasus': process.env.FOOTER,
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
ANTI_DELETE : process.env.ANTI_DELETE || true ,
// BLOCK_COUNTRY_PREFIX : process.env.BLOCK_COUNTRY_PREFIX || "1",
BOT_EXPIRY_DATE : process.env.BOT_EXPIRY_DATE || '2029-09-05',
BOT_EXPIRY_TIME : process.env.BOT_EXPIRY_TIME || '16:24:00',
DELETEMSGSENDTO : process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO,
  
};
