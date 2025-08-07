# Integration Service Documentation

This document explains how the frontend Integration page connects to the backend integration service.

## Overview

The Integration page now connects to a real backend service running on `localhost:3000` that provides Telegram and Discord messaging capabilities for security notifications.

## Backend API Endpoints

The backend service provides the following endpoints:

### Health Check
- **GET** `/api/health`
- Returns service status and basic information

### Telegram APIs
- **POST** `/api/send-message` - Send a message to Telegram
- **GET** `/api/messages/{chatId}` - Get message history for a chat

### Discord APIs  
- **POST** `/api/discord/send-message` - Send a message to Discord
- **GET** `/api/discord/bot-status` - Check Discord bot status
- **GET** `/api/discord/messages/{userId}` - Get message history for a user

## Frontend Integration

### Service Layer (`integrationService.ts`)

The `IntegrationService` class provides a clean API interface:

```typescript
// Health check
await IntegrationService.checkHealth()

// Send messages
await IntegrationService.sendTelegramMessage({ receiver: "chatId", message: "text" })
await IntegrationService.sendDiscordMessage({ receiver: "userId", message: "text" })

// Get status
await IntegrationService.getDiscordBotStatus()

// Test connections
await IntegrationService.testTelegramConnection("chatId")
await IntegrationService.testDiscordConnection("userId")
```

### UI Components

The Integrations page now includes:

1. **Service Status Card** - Shows integration service health
2. **Enhanced Connection Modals** - Real connection forms for Telegram/Discord
3. **Test Connection Buttons** - Send test messages to verify setup
4. **Quick Test Suite** - Run comprehensive service tests

### Key Features

#### Real-time Service Status
- Checks service health on page load
- Shows connection status for Discord bot
- Displays last check timestamp

#### Interactive Testing
- Test connection buttons send actual messages
- Toast notifications show success/failure
- Real-time feedback on all operations

#### Proper Error Handling
- Graceful fallbacks when service is offline
- User-friendly error messages
- Console logging for debugging

## Usage Instructions

### Setup Requirements

1. **Start the Integration Service**
   ```bash
   # Make sure the backend service is running on localhost:3000
   # Service should respond to /api/health endpoint
   ```

2. **Configure Telegram**
   - Get your chat ID from @userinfobot on Telegram
   - Enter the chat ID in the connection modal
   - Test the connection

3. **Configure Discord**
   - Enable Developer Mode in Discord settings
   - Right-click your username and copy user ID
   - Enter the user ID in the connection modal
   - Test the connection

### Testing the Integration

1. **Quick Health Check**: Click "Refresh Status" to verify service connection
2. **Quick Test Suite**: Run comprehensive tests of all endpoints
3. **Individual Tests**: Use "Test Connection" in each integration modal

### Security Notification Flow

Once configured, the system can:
1. Send critical vulnerability alerts immediately
2. Send daily/weekly security reports
3. Notify about scan completions
4. Provide SBOM reports monthly

## API Response Formats

### Successful Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Default Configuration

The frontend comes pre-configured with test IDs from the API documentation:
- **Telegram Chat ID**: `1587024489`
- **Discord User ID**: `1392614645944291510`

These can be changed in the connection modals.

## Troubleshooting

### Service Not Responding
- Verify the backend service is running on localhost:3000
- Check browser console for network errors
- Ensure no CORS issues blocking requests

### Message Sending Fails
- Verify chat/user IDs are correct
- Check backend service logs
- Ensure bot has proper permissions

### Toast Notifications Not Showing
- Verify the `use-toast` hook is properly configured
- Check if toast components are rendered in the app

## Development Notes

- The integration service is designed to be extensible for other platforms
- All API calls are properly typed with TypeScript interfaces
- Error handling follows consistent patterns throughout
- The UI provides immediate feedback for all operations
