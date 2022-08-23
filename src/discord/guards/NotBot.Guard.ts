import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf, Client, GuardFunction, Next } from 'discordx';
import { SimpleCommandMessage } from 'discordx';

import {
	ButtonInteraction,
	CommandInteraction,
	ContextMenuCommandInteraction,
	Message,
	MessageReaction,
	SelectMenuInteraction,
	VoiceState,
} from 'discord.js';

export const NotBot: GuardFunction<
	| ArgsOf<'messageCreate' | 'messageReactionAdd' | 'voiceStateUpdate'>
	| CommandInteraction
	| ContextMenuCommandInteraction
	| SelectMenuInteraction
	| ButtonInteraction
	| SimpleCommandMessage
> = async (arg: object, client: Client, next: Next, guardData: any) => {
	const argObj = arg instanceof Array ? arg[0] : arg;
	const user =
		argObj instanceof CommandInteraction
			? argObj.user
			: argObj instanceof MessageReaction
			? argObj.message.author
			: argObj instanceof VoiceState
			? argObj.member?.user
			: argObj instanceof Message
			? argObj.author
			: argObj instanceof SimpleCommandMessage
			? argObj.message.author
			: argObj instanceof CommandInteraction ||
			  argObj instanceof ContextMenuCommandInteraction ||
			  argObj instanceof SelectMenuInteraction ||
			  argObj instanceof ButtonInteraction
			? argObj.member?.user
			: argObj.message.author;
	if (!user?.bot) {
		guardData.message = 'the NotBot guard passed';
		await next();
	}
};
