import { DApplicationCommand, DIService } from 'discordx';
import { MetadataStorage } from 'discordx';

export function getAllDiscordClasses(): readonly DApplicationCommand[] {
	return MetadataStorage.instance.applicationCommandSlashesFlat;
}
