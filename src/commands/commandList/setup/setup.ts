import { Client, CommandInteraction } from 'eris';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'setup',
        description: 'Setup the news channel',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.defer();

        let progress = {
            title: 'Setup loading...',
            color: Number(config.colour.embed),
            description: 'Here we go!',
            timestamp: new Date(),
        };
        await interaction.editOriginalMessage({
            embeds: [progress],
        });

        let finished = {
            title: 'Setup finished!',
            color: Number(config.colour.embed),
            description: 'Successfully setup has been finished!',
            timestamp: new Date(),
        };
        finished.description +=
            '\nNow you can see a new channel created called `news` at the top';
        finished.description +=
            ' New bot will upload amazing discord related news on the channel';
        finished.description +=
            '\nLike: discord events, new discord features, servers news, millstones, etc.';
        finished.description +=
            '\n\nHope you will enjoy amazing news from News bot!';

        setTimeout(() => {
            interaction.editOriginalMessage({
                embeds: [finished],
            });
        }, 1250);
    },
};
