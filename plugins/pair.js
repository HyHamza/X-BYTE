const { cmd } = require("../lib/command");
const { encode } = require('base-64');

// Store active pair requests
let activePairRequests = {};

// Command handler for ".pair"
cmd(
  {
    pattern: "pair",
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
          // Generate pairing QR code and send to the sender
          const qrCode = await generatePairingCode(senderNumber);

          // Store the active pair request with the sender number and phone number
          activePairRequests[senderNumber] = { qrCode, phoneNumber };

          // Send QR code to the sender
          await _0x4c9824.sendMessage(_0x48041a.chat, { text: `Your pairing code is: ${qrCode}` });
        } catch (error) {
          console.error('Error generating pairing code:', error);
        }
      } else {
        console.log('Please provide a valid phone number.');
      }
    }
  }
);

// Function to generate a pairing QR code using Baileys
async function generatePairingCode(senderNumber) {
  // Replace this with actual logic for generating the pairing QR code
  return "PAIRED_CODE_" + senderNumber;
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
