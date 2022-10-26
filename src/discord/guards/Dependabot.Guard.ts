import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf, Client, GuardFunction, Next } from 'discordx';

export const DependaBotCleaner: GuardFunction<ArgsOf<'messageCreate'>> = async (
	[message],
	client: Client,
	next: Next
) => {
	// TODO
	// if (message.channelId == config.CHANNELS.DB_CHANNEL) {
	// 	if (
	// 		message.embeds.length > 0 &&
	// 		message.author?.id == config.DB_ID &&
	// 		message.embeds[0].title == 'dependabot[bot]'
	// 	) {
	// 		message.delete();
	// 		logger.verbose('MESSAGE > Dependabot fuck off.');
	// 	}
	// }

	await next();
};
