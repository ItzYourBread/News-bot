import { Client, CommandInteraction } from 'eris';
import { database } from '../../../models/guildConfig';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'setup',
        description: 'Setup the news channel',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            await interaction.defer();

            if (!interaction.member.permission.has('administrator')) {
                return interaction.editOriginalMessage({
                    embeds: [
                        {
                            title: 'Failed!',
                            color: Number(config.colour.failed),
                            description:
                                "You don't have `Administrator` permission!",
                            timestamp: new Date(),
                        },
                    ],
                });
            }

			if (!interaction.member.permission.has("manageChannels")) {
				return interaction.editOriginalMessage({
                    embeds: [
                        {
                            title: 'Failed!',
                            color: Number(config.colour.failed),
                            description:
                                "I don't have `Manage Channels` permission!",
                            timestamp: new Date(),
                        },
                    ],
                });
			}

            let progress = {
                title: 'Setup loading...',
                color: Number(config.colour.embed),
                description: 'Here we go!',
                timestamp: new Date(),
            };
            await interaction.editOriginalMessage({
                embeds: [progress],
            });

            const Data =
                (await database.findOne({ id: interaction.guildID })) ||
                new database({ id: interaction.guildID });

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

            if (Data.channel && client.getChannel(Data.channel)) {
                finished.description = `**${
                    interaction.member!.guild.name
                }** has already setup the news channel`;
                finished.description +=
                    '\nIf you have any issue, please run `/reset` to delete & create the setup again!';
            } else {
                let channelID = await client.createChannel(
                    interaction.guildID,
                    'news🗞',
                    0
                );
                let webhookID = await client.createChannelWebhook(
                    channelID.id,
                    {
                        name: 'News',
                    }
                );
                Data.channel = channelID.id;
                Data.webhook = `https://discord.com/api/webhooks/${webhookID.id}/${webhookID.token}`;
                Data.save();
            }

            setTimeout(() => {
                interaction.editOriginalMessage({
                    embeds: [finished],
                });
            }, 1250);
        } catch (err) {
            console.error(err);
            return interaction.editOriginalMessage({
                embeds: [
                    {
                        title: 'Setup failed!',
                        color: Number(config.colour.failed),
                        description:
                            'Something went wrong please notify our developers',
                        timestamp: new Date(),
                    },
                ],
            });
        }
    },
};
