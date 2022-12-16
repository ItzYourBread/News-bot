import { Client } from 'eris';
import listener from './listeners/listener';
import figlet from "figlet"
import chalk from "chalk"
import 'dotenv/config';

console.clear();
console.log(
    chalk.greenBright(
        figlet.textSync('News.', { horizontalLayout: 'full' })
    )
);

const client = new Client(process.env.TOKEN, {
    restMode: true,
    autoreconnect: true,
    firstShardID: 0,
    lastShardID: 0,
    maxShards: 0,
    allowedMentions: {
        everyone: false,
        users: true,
        roles: true,
    },
    intents: ['guilds', 'guildMessages', 'guildMembers', 'guildEmojis'],
});

listener.ready(client);
listener.interactionCreate(client)

import { loadCommands } from "./commands/command";
loadCommands(client)

client.connect();