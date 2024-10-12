const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
return text === fault ? true : false;
}

module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia05jUncydmFpMGp1eUkxamp4NWs1a3lMQXA3WWFTczE1VllWSnB4RlMwTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicDR0QmRtTnNPUjEvQjRpQXRJeWI4cWk0amNHVFpDaVRWUDNYcnF5SzF6bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQjFPeER3VkU0TStBQTFSTTExSHRTU3Q1Q1ZwZ0NHNTN3UFF4aFBOVm4wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZHY0bzhuU2lvTVAra3pZNm9QL0FVUW42S3cxYlU5R1ZtWnl2Mjd2MHhjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJNRy9LZHdTdU9xRkZmSFBLZWtNemxCM0c2bjdJY2MrTWg1SFNSbHMzME09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldJeUNnYU1xeHZlL0w0Q25menBySGpOelZQRFRBbkJyMFdlUWxldUpnSEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUZtYnNWNjF6OHNIakFtNmJGY0V2SzVOejhPTUhGdkJTZlQzQXBNdDIwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmo4Y2FJWk9oS0NuV0M1alk4bUFiZTJQZS95TnZGT1kwaE41MFpiT3pTQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im80Qy9CcGdvK0FTN1BkQzJPVzE5ZlkwbFJkN1M0TFBGMkVRM2tMbVdGMm1rZGFncTlxYWpJeUhrT0Y2YWNBVDdyYzlxRnI1UXpEVDdTQkJTcXpvQ2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjYsImFkdlNlY3JldEtleSI6ImJhaXlXMUdMSlBYNk9TVk5iVjdRWFNVNGlLVENScWU1N0dsTEpYRFI0V289IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1Njk1OTc5OTY3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjlCQjA1NzFERUU3OTQ5QjRFRjZCMjJBNTM3MTM1RTc2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjg2MzczODd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY5NTk3OTk2N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwN0FBRkYxMjA3OTdGMEJCNTZBM0Q2OUE2MDM3NENCRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI4NjM3Mzg3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2OTU5Nzk5NjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRDJDM0Y3RkQyRTI3NUM4OUQ3MjRFNEE3RkUyQkQyNzQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODYzNzQwMX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiRVA3YVJSWklSdU8tbVlIem9yVHNWZyIsInBob25lSWQiOiJhY2VkM2E1Zi1lODQyLTQ0YzEtYTM5Zi02Zjg1OTdmNjkxNGMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibXVkTy9GQkpvVytXS0ZFZEF1YTdFQm5hcmRrPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRkM0pObGpMZjNtUGFMaVRmb3B2S1lCS3hkTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJDN0I3QUs5WCIsIm1lIjp7ImlkIjoiMjU1Njk1OTc5OTY3OjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2aqfCdmqrwnZqr8J2asPCdmrTwnZqw8J2aq/CdkIIg4bWJICAg8J2QmfCdmq/wnZq08J2atSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTDN1MjRjRUVMalRvN2dHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTWFxeGcxdGxYR0lpWjBpb05xV3pHUkNhVXl4Vmp5U3ViUzd0N3lySEowND0iLCJhY2NvdW50U2lnbmF0dXJlIjoidTV3VjJtVkU0S01kaFE5K3dmQXR2OFpPRFBQVmtvNFBvcXBpTkY1K2FIVm81YXdMY2YrbnRpdEdDUEZEaUZoK1Y0a2J0SFVSNFRRMlpBRWt6VXdpRFE9PSIsImRldmljZVNpZ25hdHVyZSI6ImxCd1ZUU0lEYTFXWU93dlRubGZsTCt0c1pCaEszNUxtaXFhQlo2Ukc3ZEFnTkh5azQrN2p2MElMVDNPd0xFMHRHS3I5dFFSdXVPaXAvQnZDbVB2S2pRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Njk1OTc5OTY3OjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVEdxc1lOYlpWeGlJbWRJcURhbHN4a1FtbE1zVlk4a3JtMHU3ZThxeHlkTyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyODYzNzM4MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCRzgifQ==' : process.env.SESSION_ID,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '' : process.env.OWNER_NUMBER,   
ONLY_GROUP: process.env.ONLY_GROUP === undefined ? 'false' : process.env.ONLY_GROUP,
ONLY_ME: process.env.ONLY_ME === undefined ? 'false' : process.env.ONLY_ME,
AUTO_STATUS_READ:  process.env.AUTO_STATUS_READ  || false  ,
PREFIX: process.env.PREFIX || '.' ,
POSTGRESQL_URL: process.env.POSTGRESQL_URL === undefined ? 'postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9' : process.env.POSTGRESQL_URL,
MAX_SIZE: 500, 
ALIVE:  process.env.ALIVE  || ''  ,
FOOTER: process.env.FOOTER=== undefined ? '> Created by Hamza': process.env.FOOTER,
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
