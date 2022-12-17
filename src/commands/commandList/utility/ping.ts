import { Client, CommandInteraction } from 'eris';

export default {
    data: {
        name: 'ping',
        description: 'Ping pong',
    },
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            await interaction.createMessage({
                content: `Ping Pong!`,
            });
        } catch (err) {
            await interaction.createMessage({
                content: 'Something is weong, try to contact developers!',
            });
        }
    },
};
