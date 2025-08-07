// Integration Service API client
const API_BASE_URL = 'http://localhost:3000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface TelegramMessage {
  receiver: string;
  message: string;
}

export interface DiscordMessage {
  receiver: string;
  message: string;
}

export interface MessageHistoryItem {
  id: number;
  message_text: string;
  status: 'sent' | 'failed';
  sent_at: string | null;
  created_at: string;
  error_message?: string | null;
  telegram_message_id?: number | null;
  discord_message_id?: string | null;
}

export interface TelegramMessageHistory {
  chatId: string;
  messages: MessageHistoryItem[];
  count: number;
}

export interface DiscordMessageHistory {
  userId: string;
  messages: MessageHistoryItem[];
  count: number;
}

export interface DiscordBotStatus {
  connected: boolean;
  bot: {
    username: string;
    id: string;
    discriminator: string;
  };
}

export interface ServiceHealth {
  status: string;
  timestamp: string;
  service: string;
}

export class IntegrationService {
  private static async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health Check
  static async checkHealth(): Promise<ApiResponse<ServiceHealth>> {
    return this.fetchApi<ServiceHealth>('/health');
  }

  // Telegram APIs
  static async sendTelegramMessage(message: TelegramMessage): Promise<ApiResponse> {
    return this.fetchApi('/send-message', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  static async getTelegramMessageHistory(chatId: string): Promise<ApiResponse<TelegramMessageHistory>> {
    return this.fetchApi<TelegramMessageHistory>(`/messages/${chatId}`);
  }

  // Discord APIs
  static async sendDiscordMessage(message: DiscordMessage): Promise<ApiResponse> {
    return this.fetchApi('/discord/send-message', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  static async getDiscordBotStatus(): Promise<ApiResponse<DiscordBotStatus>> {
    return this.fetchApi<DiscordBotStatus>('/discord/bot-status');
  }

  static async getDiscordMessageHistory(userId: string): Promise<ApiResponse<DiscordMessageHistory>> {
    return this.fetchApi<DiscordMessageHistory>(`/discord/messages/${userId}`);
  }

  // Test connection methods
  static async testTelegramConnection(chatId: string): Promise<boolean> {
    try {
      const response = await this.sendTelegramMessage({
        receiver: chatId,
        message: '🧪 Test message from CodeShuriken Integration Service!'
      });
      return response.success;
    } catch (error) {
      console.error('Telegram connection test failed:', error);
      return false;
    }
  }

  static async testDiscordConnection(userId: string): Promise<boolean> {
    try {
      const response = await this.sendDiscordMessage({
        receiver: userId,
        message: '🧪 Test message from CodeShuriken Integration Service!'
      });
      return response.success;
    } catch (error) {
      console.error('Discord connection test failed:', error);
      return false;
    }
  }

  // Quick test suite - run all tests
  static async runQuickTestSuite(): Promise<{
    health: boolean;
    discordBot: boolean;
    telegram?: boolean;
    discord?: boolean;
  }> {
    const results = {
      health: false,
      discordBot: false,
      telegram: undefined as boolean | undefined,
      discord: undefined as boolean | undefined,
    };

    try {
      // Test health
      const healthResponse = await this.checkHealth();
      results.health = healthResponse.success;

      // Test Discord bot status
      const botStatusResponse = await this.getDiscordBotStatus();
      results.discordBot = botStatusResponse.success && botStatusResponse.data?.connected === true;

    } catch (error) {
      console.error('Quick test suite failed:', error);
    }

    return results;
  }
}
