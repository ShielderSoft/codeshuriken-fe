// Mock Integration Service for Testing
// This simulates the backend integration service for development/testing

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Mock Telegram & Discord Integration Service"
  });
});

// Telegram send message
app.post('/api/send-message', (req, res) => {
  const { receiver, message } = req.body;
  console.log(`Mock Telegram: Sending "${message}" to ${receiver}`);
  
  res.json({
    success: true,
    message: "Message sent successfully (MOCK)",
    data: {
      chatId: receiver,
      messageId: Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString()
    }
  });
});

// Telegram message history
app.get('/api/messages/:chatId', (req, res) => {
  const { chatId } = req.params;
  
  res.json({
    success: true,
    data: {
      chatId: chatId,
      messages: [
        {
          id: 1,
          chat_id: chatId,
          message_text: "Mock message from integration service",
          status: "sent",
          telegram_message_id: 123,
          error_message: null,
          sent_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ],
      count: 1
    }
  });
});

// Discord send message
app.post('/api/discord/send-message', (req, res) => {
  const { receiver, message } = req.body;
  console.log(`Mock Discord: Sending "${message}" to ${receiver}`);
  
  res.json({
    success: true,
    message: "Discord message sent successfully (MOCK)",
    data: {
      userId: receiver,
      messageId: "mock-message-id-" + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      demo: true
    }
  });
});

// Discord bot status
app.get('/api/discord/bot-status', (req, res) => {
  res.json({
    success: true,
    data: {
      connected: true,
      bot: {
        username: "MockBot",
        id: "123456789",
        discriminator: "0001"
      }
    }
  });
});

// Discord message history
app.get('/api/discord/messages/:userId', (req, res) => {
  const { userId } = req.params;
  
  res.json({
    success: true,
    data: {
      userId: userId,
      messages: [
        {
          id: 1,
          user_id: userId,
          message_text: "Mock Discord message",
          status: "sent",
          discord_message_id: "mock-discord-msg-123",
          error_message: null,
          sent_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ],
      count: 1
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock Integration Service running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/send-message`);
  console.log(`   GET  /api/messages/:chatId`);
  console.log(`   POST /api/discord/send-message`);
  console.log(`   GET  /api/discord/bot-status`);
  console.log(`   GET  /api/discord/messages/:userId`);
});

module.exports = app;
