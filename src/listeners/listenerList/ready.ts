import { Client } from 'eris';
import chalk from 'chalk';

export function ready(client: Client) {
    client.on('ready', () => {
        client.editStatus('idle', {
            name: 'Daily amanzing news for Discord',
            type: 0,
        });
        console.log(
            chalk.greenBright(
                `[Discord API] ${client.user.username} is now connected to Discord!`
            )
        );
    });
    console.log(chalk.cyanBright('[Listener] Ready is loaded'));
}
