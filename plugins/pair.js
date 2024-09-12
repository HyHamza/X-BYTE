const { cmd } = require("../lib/command");
const axios = require('axios'); // Ensure axios is installed
const { encode } = require('base-64');

// Store active pair requests
let activePairRequests = {};

// Command handler for ".pair"
cmd(
  {
    pattern: ".pair",
    react: '🔗', // Add a reaction emoji if needed
    desc: "Pair with the bot by entering a phone number.",
    category: "other",
  },
  async (_0x4c9824, _0x75581b, _0x48041a) => {
    const message = _0x48041a.body.trim();
    
    if (message.startsWith('.pair')) {
      const parts = message.split(' ');
      const phoneNumber = parts[1];
      const senderNumber = _0x48041a.sender.split('@')[0]; // Extract sender number

      if (phoneNumber) {
        try {
          // Fetch the code from the API
          const code = await fetchPairingCode(phoneNumber);

          // Store the active pair request with the sender number and phone number
          activePairRequests[senderNumber] = { code, phoneNumber };

          // Send the pairing code with a button to copy it
          const buttonMessage = {
            text: `Your pairing code is: ${code}`,
            footer: 'Click the button below to copy the code.',
            buttons: [
              { buttonId: 'copy_code', buttonText: { displayText: `Copy Code: ${code}` }, type: 1 }
            ],
            headerType: 1
          };

          await _0x4c9824.sendMessage(_0x48041a.chat, buttonMessage);
        } catch (error) {
          console.error('Error fetching pairing code:', error);
          await _0x4c9824.sendMessage(_0x48041a.chat, { text: 'Failed to fetch pairing code. Please try again.' });
        }
      } else {
        console.log('Please provide a valid phone number.');
        await _0x4c9824.sendMessage(_0x48041a.chat, { text: 'Please provide a valid phone number after the .pair command.' });
      }
    }
  }
);

// Function to fetch the pairing code from the URL
async function fetchPairingCode(phoneNumber) {
  try {
    const response = await axios.get(`https://chemical-analiese-talkdrove-d1364357.koyeb.app/code?number=${phoneNumber}`);
    const code = response.data.code; // Fetch the "code" field from the API response
    return code;
  } catch (error) {
    console.error('Error fetching code from API:', error);
    throw error;
  }
}

// Function to handle post-pairing and send session data
async function handlePairCompletion(session, senderNumber) {
  try {
    if (activePairRequests[senderNumber]) {
      const { phoneNumber } = activePairRequests[senderNumber];

      // Encrypt session data to Base64
      const sessionData = JSON.stringify(session);
      let encodedSession = encode(sessionData);

      // Add "Byte;;;" prefix
      encodedSession = "Byte;;;" + encodedSession;

      // Send encrypted session to linked phone number
      await _0x4c9824.sendMessage(phoneNumber + '@s.whatsapp.net', { text: encodedSession });

      // Cleanup the pair request
      delete activePairRequests[senderNumber];
    } else {
      console.log("No active pairing request found for this number.");
    }
  } catch (error) {
    console.error('Error handling pair completion:', error);
  }
}

// Simulate pairing process completion (this should be called after successful pairing)
async function onPairingCompleted(senderNumber) {
  const session = await getSession();  // Replace with actual logic to fetch session
  await handlePairCompletion(session, senderNumber);
}

// Example function to simulate fetching session data
async function getSession() {
  return { sessionId: 'example-session-id', key: 'example-key' };
}
