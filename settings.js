const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
return text === fault ? true : false;
}

module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFB0NE9LSTlZRmd2N05xMzExbHV6T0U3ZThWaEFERHlLRGpubHJ6alpVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibnpsQVlkelhIWWlXQ0V6a2x4cE55WkVJQXY5dU1oT01ucWwweC83QUIycz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTEVOWVVSNHdNcnZPUW5BN3JTUlpmbGZCZEdrSnplcmxlRDVSVktVUEdrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiQUJ2Vm5IdVQyb2NVNVIvQnNzWjJLMzNLY2xWRmlhUjFBSmRpV1liTTNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFIeGhRRzdkYlAwZnBnWk1sKzJWcFFveEJhMHVaai8rVGlLUktuN2JCMVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJFME5qdkZpVEdISGFBL29EY0tqNzRSejNlelFoTmtqMW9qWnljYTdMQXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0hGTjZzV0Iwcmc0MTZuNXJORmJIY1NvQ0IxS3lWWEI3MXdzcXVlanUzaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3FIb3RxbVhxSkFNWnFpNW9BOXY0TmZQREhmTjU4cnBPRUd2QVdjOWgxYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ1MVQzS204NE5NajdiZHhybENpVlV3TFhjeWs1UXdOM0NNaTM3OWFXVGVTaTZ5cC9ZUE1sbmxGZFVYUFpsOTRYSzNWRTh6UkN2UXpHL21jUldVNURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI4LCJhZHZTZWNyZXRLZXkiOiJ5WWNYaWxQMGtyZUtJWUQyN0dyL3JySGRtdzhaUGZlczZUR3VqZFQ2d0FjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQwMzM5NzA0NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4QUJGRTZDMkNDMzkyMDI4OTA5RjI5QjczMzU0RjUyMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI4MzM2MjEyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjM0MDMzOTcwNDZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjk5QjFBQ0NBMzU2OEZGQTQ0MUY1MzA1QkExQjUxNzEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODMzNjIxM30seyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzNDAzMzk3MDQ2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhDOEI4QzVDOTVGNjk4MkM0OUU3QTZFMTQwRUJBMzYwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjgzMzYyMTZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjRXT29ndGlXVFplR0xpamNaUEpVY3ciLCJwaG9uZUlkIjoiYTM5Y2FkMWQtYTI0YS00MWEwLWJjODMtMWRjZDI4NWIwNzllIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImcxTDM3YkV6N21LaTRxU0pJNHJSbkkzbHE3ND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxaFBKK2ZCRXU4WXh2YkJWMVk5SlpOVWsrTDA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRFA2RUs2N0YiLCJtZSI6eyJpZCI6IjkyMzQwMzM5NzA0Njo5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCfmYLwn5mC8J+ZgiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT092KzhjQkVNV2lrYmdHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRnhpbExDbXV4N3ZLNnBpK0Z2QTRiYktRMk5NTlJiNDgyZnd0bnVBMGJXRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoicW9MZmtod2djalMvOEdzMWovRjhVdjFkM0QyS2JiazlROFJVMGx1RXdHY2VsQXRYQVk4cWE0OUoxWTRzT2tmV0d5Wm9Wb0JNWHJVMVJrZ0RGSFh5QWc9PSIsImRldmljZVNpZ25hdHVyZSI6ImtrcjVCc0JBSk5Ua2E3QnBlbmpYL01XQkFUaElLRWZRMUs0U1RMQkJIUDFpdW5UbmU4MzRXQzR6K05jeGY2RHphV2xLN1dRNXhmQXFxQ1BWOHQ5SkJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNDAzMzk3MDQ2OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmNZcFN3cHJzZTd5dXFZdmhid09HMnlrTmpURFVXK1BObjhMWjdnTkcxaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyODMzNjIxMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLOTMifQ==' : process.env.SESSION_ID,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '+923167118815' : process.env.OWNER_NUMBER,   
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
