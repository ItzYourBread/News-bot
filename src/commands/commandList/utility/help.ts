import { Constants, Client, CommandInteraction } from 'eris';
import { database } from '../../../models/guildConfig';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'help',
        description: 'Help!',
        options: [
            {
                name: 'commands',
                description: 'Get help for commands',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
            {
                name: 'info',
                description: 'Get help for info',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        const Data =
            (await database.findOne({ id: interaction.guildID })) ||
            new database({ id: interaction.guildID });

        if (interaction.data.options[0].name === 'commands') {
            let commands = {
                title: `${client.user.username}'s Commands!`,
                color: Number(config.colour.embed),
                description: 'Here you can find all the commands',
				fields: [
					{
						name: "</setup:0>",
						value: "Set the news channel in your server.",
						inline: false
					},
					{
						name: "</reset:0>",
						value: "Reset the news channel if its not working.",
						inline: false
					},
					{
						name: "</help:0>",
						value: "Get commands & info help.",
						inline: false
					},
					{
						name: "</ping:0>",
						value: "Ping Pong",
						inline: false
					}
				],
                footer: {
                    text: 'Pages: 1/1',
                },
                timestamp: new Date(),
            };

            let allbuttons = {
                type: Constants.ComponentTypes.ACTION_ROW,
                components: [
                    {
                        label: '<<',
                        type: Constants.ComponentTypes.BUTTON,
                        style: Constants.ButtonStyles.PRIMARY,
                        custom_id: '0',
                        disabled: false,
                    },
                    {
                        label: '<',
                        type: Constants.ComponentTypes.BUTTON,
                        style: Constants.ButtonStyles.PRIMARY,
                        custom_id: '1',
                        disabled: false,
                    },
                    {
                        label: '>',
                        type: Constants.ComponentTypes.BUTTON,
                        style: Constants.ButtonStyles.PRIMARY,
                        custom_id: '2',
                        disabled: false,
                    },
                    {
                        label: '>>',
                        type: Constants.ComponentTypes.BUTTON,
                        style: Constants.ButtonStyles.PRIMARY,
                        custom_id: '3',
                        disabled: false,
                    },
                ],
            };

			allbuttons.components.map((d) => {
				d.disabled = true
			})

            await interaction.createMessage({
                embeds: [commands],
                components: [allbuttons],
            });
        } else if (interaction.data.options[0].name === 'info') {
        }
    },
};
