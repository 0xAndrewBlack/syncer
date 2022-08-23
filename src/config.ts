import { env } from 'process';

import dotenv from 'dotenv';

import { colors } from './utils/discord.js';
import { EnvironmentError } from './interfaces/errorFactory.js';

dotenv.config();

if (!env.DC_BOT_TOKEN) {
	throw new EnvironmentError('Invalid or unavailable the DC_BOT_TOKEN in your environment');
}

export const config = {
	NODE_ENV: String(env.NODE_ENV),
	DC_BOT_TOKEN: String(env.DC_BOT_TOKEN),
	DC_COLORS: {
		EMBED: String(colors.DC_EMBED_COLOR),
		SUCCESS: String(colors.DC_SUCCESS_COLOR),
		WARN: String(colors.DC_WARN_COLOR),
		ERROR: String(colors.DC_ERROR_COLOR),
	},
	BUG_CHANNEL: String(env.BUG_CHANNEL),
	IMP_CHANNEL: String(env.IMP_CHANNEL),
	GUILD_ID: String(env.GUILD_ID),
	GH_ORG: String(env.GH_ORG),
	GH_REPO: String(env.GH_REPO),
	GH_PROJECT_NUMBER: Number(env.GH_PROJECT_NUMBER),
	GH_TOKEN: String(env.GH_TOKEN),
	GH_APP_ID: String(env.GH_APP_ID),
};
