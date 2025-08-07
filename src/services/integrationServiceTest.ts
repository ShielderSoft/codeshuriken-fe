import { IntegrationService } from '@/services/integrationService';

// Test script to verify integration service functionality
export async function testIntegrationService() {
  console.log('🧪 Testing Integration Service...');
  
  try {
    // Test health check
    console.log('1. Testing health check...');
    const health = await IntegrationService.checkHealth();
    console.log('Health check result:', health);
    
    // Test Discord bot status
    console.log('2. Testing Discord bot status...');
    const discordStatus = await IntegrationService.getDiscordBotStatus();
    console.log('Discord bot status:', discordStatus);
    
    // Test quick test suite
    console.log('3. Running quick test suite...');
    const testResults = await IntegrationService.runQuickTestSuite();
    console.log('Test suite results:', testResults);
    
    console.log('✅ Integration service test completed!');
    return true;
  } catch (error) {
    console.error('❌ Integration service test failed:', error);
    return false;
  }
}

// Example usage of sending messages
export async function sendTestMessages() {
  const TELEGRAM_CHAT_ID = "1587024489"; // From API docs
  const DISCORD_USER_ID = "1392614645944291510"; // From API docs
  
  try {
    // Send Telegram test message
    console.log('Sending Telegram test message...');
    const telegramResult = await IntegrationService.sendTelegramMessage({
      receiver: TELEGRAM_CHAT_ID,
      message: "🔒 Security Alert Test from CodeShuriken!"
    });
    console.log('Telegram result:', telegramResult);
    
    // Send Discord test message
    console.log('Sending Discord test message...');
    const discordResult = await IntegrationService.sendDiscordMessage({
      receiver: DISCORD_USER_ID,
      message: "🔒 Security Alert Test from CodeShuriken!"
    });
    console.log('Discord result:', discordResult);
    
    return { telegram: telegramResult.success, discord: discordResult.success };
  } catch (error) {
    console.error('Test message sending failed:', error);
    return { telegram: false, discord: false };
  }
}

// Example of getting message history
export async function getMessageHistory() {
  const TELEGRAM_CHAT_ID = "1587024489";
  const DISCORD_USER_ID = "1392614645944291510";
  
  try {
    console.log('Getting Telegram message history...');
    const telegramHistory = await IntegrationService.getTelegramMessageHistory(TELEGRAM_CHAT_ID);
    console.log('Telegram history:', telegramHistory);
    
    console.log('Getting Discord message history...');
    const discordHistory = await IntegrationService.getDiscordMessageHistory(DISCORD_USER_ID);
    console.log('Discord history:', discordHistory);
    
    return { telegram: telegramHistory.data, discord: discordHistory.data };
  } catch (error) {
    console.error('Getting message history failed:', error);
    return null;
  }
}
