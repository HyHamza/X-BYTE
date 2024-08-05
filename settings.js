


const fs = require('fs');  //----- module----//

//checking if config.env exist otherwise settings.js will be used
//////////////////////////////////////////////////////////////
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
/////////////////////----END---///////////////////////////////




//////////////////////////////////////////////////
/////----------------Global---------------//////
/////////////////////////////////////////////////

global.thumb = fs.readFileSync('./lib/bugs/XByte.png') //Don't change
//////////////////////////////////////////////////////////
const BOTNAME = 'X - B Y T E'; //BOT name
//////////////////////////////////////////////////////////
const FOOTERNAME = '*Powered by TalkDrove*'; //Footer text











//----------------OWNER NUMBER------------------------------//
//////////////////////////////////////////////////////////////////

global.owner = process.env.OWNER_NUMBER  || '2348031111297' ;  //put your number without +

/////////////////////////////////////////////////////////////////
//-------------------------------------------------------//




//////////////////////Global-end////////////////////////////////////////
module.exports = { //exporting modules to use in plugins









//----------------Session ID------------------------------//
//////////////////////////////////////////////////////////////////

SESSION_ID: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0F6cmlEMEpiV0h5OVpzZFRNb3dBZytTREJlOEVEdlpjUEtHbkwwemltUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicG4rTEpkRWxEVzFhNnZCRFV1MDJEdG9YZ1dtcFdYLy8rR0MrWW4rcmpCUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRDM0UGppT2pyQURaUk9ENzArRUZQOEZ6SEpFaENoZkJOZnJQcnA2R0c4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiV1lnd1lTMncxem85bEFVS0Y1N0FIM2Y3dGpORjJWY0c1SjB0TDZxMVRBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9QaGNpUWNiUUYvdC9mOUhqM21HWWE5bHZtZStUTFkvSHd5RWZFREVHazA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVmVFJzbjlkazkxMTArYi9YaW9uMERnSitJV1pPdDZCcHRVUVVGRGlkM3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0szM0FEbU1EWDZJbTd2TEJ4UytJem9YVTJ3d3RiMjU1N2JUK0kyTnMxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZHRvTDV6RFZONHM1ZFVhNVdCS0lxdmVlcXZwL0xrNWsvTHRaYzh1ZitRVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkloSXF1YWpCSXkrcWNaenc0TmNiZ2VFdy9LbDVTR2F4alFCM2JTb1Z2b1JYeloza2ViNm9TbDVxN1ltUVA4UWpqTWhrRVZrQ3NSVjdtT3YvYU84K0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk3LCJhZHZTZWNyZXRLZXkiOiJRZ1prTXdsdnl2dTk1dTd4M0pzVEZvckMrWWY0d3NpaXRVWHVoS3l1ODcwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUTjdnV3hzR1RCaWVoRHlSWm1vWjhRIiwicGhvbmVJZCI6IjJiYWRkZTI3LWVhOGQtNGViYy04N2UxLTZlYWUyYmIxYTFiOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHMlpIVUNPMlNnSmxxZXdQb0V3dEJTak13SUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiazdHYzl2SlVLa0htK3dsZGZLSlA2TFA1bXR3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjY2VENaSzM5IiwibWUiOnsiaWQiOiIyMzQ4MDMxMTExMjk3OjQ4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlRyZWFzdXJlIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMZUx4ZmNGRUtYb3dyVUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJMOFBQSlBQYzBEK1BDSHczZWc4ekJYZGJ6cnp5VzEvWWpkMTI1dmtYR2tjPSIsImFjY291bnRTaWduYXR1cmUiOiIyZkJBdTcvL0RZNUphZmYyYlZDWW8ydHdvYXhlazlKYmR6TVJqcGh4RnBRb1NEeU1ZT1FINXUxeUx3S09RM1UyQlNPckxMK1pHdmplaXJVaU1MNk1BZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOG13UC91blZSbnZuOC9WZHFaQzRRWWJKQkJqaEZOVkpRUU5LYlZHbWdNOWhNQ2phT1FYeVBaR1haYnNEalZ1Mk45L2tFdGJsbzB6WVZkZmYwOEd2Q0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDMxMTExMjk3OjQ4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlMvRHp5VHozTkEvandoOE4zb1BNd1YzVzg2ODhsdGYySTNkZHViNUZ4cEgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI4NTY0OTh9', //Paste your session ID here

/////////////////////////////////////////////////////////////////
//-------------------------------------------------------//










//----------------BOT LOGO------------------------------//
//////////////////////////////////////////////////////////////////
LOGO: process.env.LOGO || `https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/XByte-logo.png` , //BOT logo
/////////////////////////////////////////////////////////////////
//-------------------------------------------------------//





LANG:  process.env.LANG || 'EN' , //URDU OR EN
//////////////////////////////////////////////////////////

PREFIX: process.env.PREFIX || '.' , //PREFIX, LEAVE IT DEFAULT OTHERWISE BUTTON WILL NOT WORK
//////////////////////////////////////////////////////////

WORK_TYPE: process.env.WORK_TYPE || 'public' , //public or private
//////////////////////////////////////////////////////////

travaSend: process.env.TRAVA_SEND || '25' ,   //BUGS
//////////////////////////////////////////////////////////

COMMAND_TYPE: process.env.COMMAND_TYPE || 'button' , //button or nonbutton
//////////////////////////////////////////////////////////

MODERATORS : process.env.MODERATORS === undefined ? "923072380380" : process.env.MODERATORS ,    
//////////////////////////////////////////////////////////

MAX_SIZE: process.env.MAX_SIZE === undefined ? '1536': process.env.MAX_SIZE, //Maximum size that bot can download a file   
//////////////////////////////////////////////////////////

OWNER_NAME: process.env.OWNER_NAME || 'Boltkuma' , //Your name
//////////////////////////////////////////////////////////

POSTGRESQL_URL: process.env.POSTGRESQL_URL === undefined ? 'postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9' : process.env.POSTGRESQL_URL,
//////////////////////////////////////////////////////////

FOOTER: process.env.FOOTER || '*Powered by TalkDrove*',    
//////////////////////////////////////////////////////////

ANTI_BAD: process.env.ANTI_BAD || false  ,  //true or false
//////////////////////////////////////////////////////////

AUTO_REACT:  process.env.AUTO_REACT  || false  ,     //true or false
//////////////////////////////////////////////////////////

AUTO_TYPING:  process.env.AUTO_TYPING  || false  , //true or false
//////////////////////////////////////////////////////////

AUTO_RECORDING:  process.env.AUTO_RECORDING  || false  ,  //true or false
//////////////////////////////////////////////////////////

AUTO_READ:  process.env.AUTO_READ  || false  , //true or false
//////////////////////////////////////////////////////////

AUTO_BIO:  process.env.AUTO_BIO  || false  ,        //true or false
//////////////////////////////////////////////////////////

ALWAYS_ONLINE:  process.env.ALWAYS_ONLINE  || false  ,  //true or false
//////////////////////////////////////////////////////////

HEROKU_API_KEY: process.env.HEROKU_API_KEY === undefined ? '' : process.env.HEROKU_API_KEY,    
//////////////////////////////////////////////////////////

HEROKU_APP_NAME: process.env.HEROKU_APP_NAME === undefined ? '' : process.env.HEROKU_APP_NAME,        
//////////////////////////////////////////////////////////

INBOX_USER: process.env.INBOX_USER === undefined ? '' : process.env.INBOX_USER,
//////////////////////////////////////////////////////////

BANNED_USER: process.env.BANNED_USER === undefined ? '' : process.env.BANNED_USER ,    //banned user number 
//////////////////////////////////////////////////////////

AI_MODE: process.env.AI_MODE === undefined ? 'true' : process.env.AI_MODE, //true or false
//////////////////////////////////////////////////////////

ANTI_LINK: process.env.ANTI_LINK || false  , //true or false
//////////////////////////////////////////////////////////

BOT_DETECT: process.env.BOT_DETECT === undefined ? 'false' : process.env.BOT_DETECT,  //true or false    
//////////////////////////////////////////////////////////

ANTI_BOT: process.env.ANTI_BOT || false  , //true or false
//////////////////////////////////////////////////////////

ANTI_CALL: process.env.ANTI_CALL || false  , //true or false
//////////////////////////////////////////////////////////

ALIVE: process.env.ALIVE || `default`,     
//////////////////////////////////////////////////////////

AUTO_STATUS_READ:  process.env.AUTO_STATUS_READ  || false  ,     //true or false
//////////////////////////////////////////////////////////

AUTO_STICKER: process.env.AUTO_STICKER || false  , //true or false
//////////////////////////////////////////////////////////

WELCOME:  process.env.WELCOME  || false ,   //true or false
//////////////////////////////////////////////////////////

ANTI_DELETE : process.env.ANTI_DELETE || false , //true or false
//////////////////////////////////////////////////////////

DELETEMSGSENDTO : process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO    
////////////---------X - B Y T E---------////////////////
};
