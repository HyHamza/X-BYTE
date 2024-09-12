const baileys = require('@whiskeysockets/baileys');  // Baileys library
const { encode } = require('base-64');

// Store active pair requests
let activePairRequests = {};

// Command handling for ".pair"
async function handlePairCommand(message) {
  const command = message.body.trim();
  
  if (command.startsWith('.pair')) {
    const parts = command.split(' ');
    const phoneNumber = parts[1];
    const senderNumber = message.key.remoteJid.split('@')[0];  // Extract sender number
    
    if (phoneNumber) {
      try {
        // Generate pairing QR code and send to the sender
        const qrCode = await generatePairingCode(senderNumber);
        
        // Store the active pair request with the sender number and phone number
        activePairRequests[senderNumber] = { qrCode, phoneNumber };
        
        // Send QR code to the sender
        await baileys.sendMessage(senderNumber + '@s.whatsapp.net', { text: `Your pairing code is: ${qrCode}` });
        
      } catch (error) {
        console.error('Error generating pairing code:', error);
      }
    } else {
      console.log('Please provide a valid phone number.');
    }
  }
}

// Function to generate a pairing QR code using Baileys
async function generatePairingCode(senderNumber) {
  // Replace this with the actual logic for generating the pairing QR code
  // This is a placeholder for the code
  return "PAIRED_CODE_" + senderNumber;  
}

// Function to handle post-pairing and send the session data
async function handlePairCompletion(session, senderNumber) {
  try {
    // Check if there's an active pairing request for this number
    if (activePairRequests[senderNumber]) {
      const { phoneNumber } = activePairRequests[senderNumber];
      
      // Encrypt session data to Base64
      const sessionData = JSON.stringify(session);
      let encodedSession = encode(sessionData);
      
      // Add "Byte;;;" prefix
      encodedSession = "Byte;;;" + encodedSession;
      
      // Send the encrypted session to the linked phone number
      await baileys.sendMessage(phoneNumber + '@s.whatsapp.net', { text: encodedSession });
      
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
  const session = await getSession();  // Fetch the current session (replace with actual logic)
  await handlePairCompletion(session, senderNumber);
}

// Example function to simulate fetching the session after pairing
async function getSession() {
  return { sessionId: 'example-session-id', key: 'example-key' };
}

// Somewhere in your message handling logic
handlePairCommand(incomingMessage);

// Simulate a pairing completion event (this should be triggered by Baileys after the user pairs their device)
onPairingCompleted('923072380380');
