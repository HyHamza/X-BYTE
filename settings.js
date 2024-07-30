


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

global.owner = process.env.OWNER_NUMBER  || '923072380380' ;  //put your number without +

/////////////////////////////////////////////////////////////////
//-------------------------------------------------------//




//////////////////////Global-end////////////////////////////////////////
module.exports = { //exporting modules to use in plugins









//----------------Session ID------------------------------//
//////////////////////////////////////////////////////////////////

SESSION_ID: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtiZ3FmcjVLdHFsR3N3RmcxbGgyNDRTNTJ4M0dMNXhtUVg4c3Z1SWhXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlNuK1dOdEZ4bmNmeS9SMFc2eDdaVTI4MytySDVxdVlxWkh0ZXdBOUdCaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5UGFoYUZWTkNnZzJJZS90Skgrc3drMThmK0hzd0xDVVl5MlcwZFg0akYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCdHZXakpLaXhBL21YVTNUQkQyaklVcDJCWnJtQUV6N0REeTNjOHh3c2ljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVKUElhZDFEVG9ET0xLcGFqeFJFd1ZiYkQ3dUFxbFR4dWlWY1FEVFNvR0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVwWGtyLy8zRksxRWNYMGl2eThWdjVjS1JEVzNFcmFRaDMwK1UzNTVtR289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMklpTkxPbFVuc1BGSzREbFB1MlFPUEZBRGtseXhLZ08zR05md1h1bzZWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMldYdW1uWnBNSDBLL3JQV0hTQWQxQUUvZUY1a09VRGhQay96M0wxMWpXWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp0RjJxK1puMVBzN2FDVHZoWUk3VVM3ckFRMGJOZWRRbXk5TXpiSzhkV3hlY1djOHU2ME14eDVHM25mRmFjaEtNMEFZVHBTTk4xWTVFbm4yRUtuZ0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJURkxiYjFsVG5wY2dZVy9QRGEyNU9nZ0dNMzhXY2ZLWmZJL1FJK2hlRWNJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZYUVOeUJkWlF1cUwwbUJJb1ZiaFVBIiwicGhvbmVJZCI6IjNlNjc5OTQ4LTQ2YzktNDVhNy05MDJlLTllYWJiNmMyZWJiMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUSWFSZkFhWW01TXh6Q05GdWp3OXloNFY3Q1k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTlDN0ZsNU5uZVJTRjZkTWtBdWNXVmx2cGxzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikc4RFM1V05BIiwibWUiOnsiaWQiOiI5MjMwNzIzODAzODA6OTRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01iZjNZa0NFSUdWbWJVR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZLR0xBdlNNT1ZuUW9aRjhrck9sbXk0bmJIZ2VtVjR1QytVS2hKdmRNRnc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNudUVtazRpVThsNVJ5Z2RzSVlYK09QMDRKd0txMURNMk9icTJOY3h1dkRSSlU2OWZMTTBBV0VNUFdOenovZW5nRlhFWlJUVmFObVNoY0FnQ3ZkWEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYTmRseDFRTng3ajljWHB0bzBvWTRNZUM5OTJwYWZBSTVuWG9icjlOZ2hLbGJteFhjWnVQVkJ6Y1F0b1p4cjlXRXRrejhuWEp1Z1JmZEg4VU5mWEJEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzA3MjM4MDM4MDo5NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJieWhpd0wwakRsWjBLR1JmSkt6cFpzdUoyeDRIcGxlTGd2bENvU2IzVEJjIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMTc0MDk0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxVLyJ9', //Paste your session ID here

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

OWNER_NAME: process.env.OWNER_NAME || 'Hamza' , //Your name
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
