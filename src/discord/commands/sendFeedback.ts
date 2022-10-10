import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import {
	CommandInteraction,
	EmbedBuilder,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ModalSubmitInteraction,
} from 'discord.js';
import { PermissionGuard } from '@discordx/utilities';
import { Discord, Guard, ModalComponent, Slash } from 'discordx';

import { DiscordBot } from '../../index.js';

@Discord()
export class SendCommand {
	@Slash({ name: 'feedback', description: 'Sends feedback to the developers.' })
	@Guard(PermissionGuard(['SendMessages']))
	async showModal(interaction: CommandInteraction): Promise<void> {
		logger.verbose(`SYNCER > Feedback command used by [${interaction.user.username}].`);

		const modal = new ModalBuilder().setTitle('🧸 Feedback Form').setCustomId('FeedbackForm');

		const fbCategoryInputComponent = new TextInputBuilder()
			.setCustomId('feedbackCategory')
			.setLabel('Feedback Category (short description)')
			.setStyle(TextInputStyle.Short);

		const fbDescInputComponent = new TextInputBuilder()
			.setCustomId('feedbackDescription')
			.setLabel('Long description.')
			.setStyle(TextInputStyle.Paragraph);

		const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(fbCategoryInputComponent);

		const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(fbDescInputComponent);

		modal.addComponents(row1, row2);

		interaction.showModal(modal);
	}

	@ModalComponent({ id: 'FeedbackForm' })
	async handleModal(interaction: ModalSubmitInteraction): Promise<void> {
		const [feedbackCategory, feedbackDescription] = ['feedbackCategory', 'feedbackDescription'].map((id) =>
			interaction.fields.getTextInputValue(id)
		);

		const feedbackReplyEmbed = new EmbedBuilder()
			.setTitle('🧸 Feedback sent, thanks for your opinion!')
			.setColor(config.DC_COLORS.SUCCESS);

		const feedbackEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.EMBED)
			.setTitle('😊 Feedback')
			.setDescription(`New feedback sent by ${interaction.user} from \`${interaction.guild?.name}\``)
			.addFields([
				{
					name: '🔖 Feedback Category',
					value: `\`\`\`${feedbackCategory}\`\`\``,
					inline: false,
				},
				{
					name: '📝 Feedback Content',
					value: `\`\`\`${feedbackDescription}\`\`\``,
					inline: false,
				},
			])
			.setFooter({
				text: 'Syncer by ZGEN. For more info mention Lemon#0933',
				iconURL: DiscordBot.bot.user?.displayAvatarURL(),
			})
			.setTimestamp();

		logger.verbose(`SYNCER > Feedback sent by [${interaction.user.username}].`);

		if (config.NODE_ENV !== 'production') {
			interaction.reply({ embeds: [feedbackEmbed], ephemeral: true });
			return;
		}

		await interaction.reply({ embeds: [feedbackReplyEmbed], ephemeral: true });

		DiscordBot.bot.users.cache.get(config.DC_DEV_ID)?.send({
			embeds: [feedbackEmbed],
		});
	}
}
