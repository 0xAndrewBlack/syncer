import 'reflect-metadata';

import { config } from './config.js';
import logger from './utils/logger.js';

import { Interaction, Message, Partials } from 'discord.js';
import { dirname, importx } from '@discordx/importer';
import { IntentsBitField } from 'discord.js';
import { ActivityType } from 'discord.js';
import { Client } from 'discordx';

import { ErrorHandler } from './discord/guards/Error.Guard.js';
import { BotLogger } from './interfaces/loggerFactory.js';

import { IssueServer } from './api/server.js';
import { UptimeService } from './services/uptimeService.js';

export class DiscordBot {
	public static bot: Client;

	public static api: IssueServer;

	public static ping: UptimeService;

	public static async start(): Promise<void> {
		this.ping = UptimeService;
		this.api = new IssueServer();
		this.bot = new Client({
			shards: 'auto',
			logger: new BotLogger(),
			silent: String(config.NODE_ENV) !== 'development',
			botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMembers,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.GuildMessageReactions,
				IntentsBitField.Flags.GuildVoiceStates,
				IntentsBitField.Flags.MessageContent,
			],
			simpleCommand: {
				prefix: '!',
			},
			partials: [Partials.Channel, Partials.Message, Partials.Reaction],
			guards: [ErrorHandler],
		});

		this.bot.on('ready', async () => {
			logger.info(`[${this.bot.user?.username}] logged in.`);

			await this.bot.guilds.fetch();

			await this.bot.user?.setPresence({
				activities: [{ name: 'your threads.', type: ActivityType.Watching }],
				status: 'online',
			});

			await this.bot.initApplicationCommands();
			await this.bot.initGlobalApplicationCommands();
		});

		this.bot.on('messageCreate', (message: Message) => {
			this.bot.executeCommand(message);
		});

		this.bot.on('interactionCreate', (interaction: Interaction) => {
			// @ts-ignore
			logger.verbose(`SYNCER > [${interaction?.user?.username}] ran a command >>> [${interaction?.commandName}]`);
			this.bot.executeInteraction(interaction);
		});

		await importx(dirname(import.meta.url) + '/discord/{events,commands}/**/*.{ts,js}');

		await this.bot.login(config.DC_BOT_TOKEN);
	}
}

// Polyfill for BigInt serialization
(BigInt.prototype as any).toJSON = function (): string {
	return this.toString();
};

DiscordBot.start();
