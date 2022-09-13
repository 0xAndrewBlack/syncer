import { DiscordBot } from '../../index.js';

export class BotService {
	public static async getBotUptime(): Promise<any> {
		return DiscordBot.bot.uptime;
	}
}
