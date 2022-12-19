import { Client, CommandInteraction } from 'eris';
import { database } from '../../../models/guildConfig';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'reset',
        description: 'Reset the setup',
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
                title: 'Reset finished!',
                color: Number(config.colour.embed),
                description: 'Successfully channels are resetted!',
                timestamp: new Date(),
            };

            const Data =
                (await database.findOne({ id: interaction.guildID })) ||
                new database({ id: interaction.guildID });

            if (Data.channel && client.getChannel(Data.channel)) {
                client.deleteChannel(Data.channel);

                setTimeout(async() => {
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
                }, 2000);
            } else {
				finished.description = `**${interaction.member!.guild.name}** haven't setup the news channel!`;
				finished.description += "\nTry to run `/setup` to setup the news channel"
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
