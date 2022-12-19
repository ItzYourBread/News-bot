import { Client } from 'eris';
import listener from './listeners/listener';
import figlet from 'figlet';
import mongoose from 'mongoose';
import chalk from 'chalk';
import 'dotenv/config';

console.clear();
console.log(
    chalk.greenBright(figlet.textSync('News.', { horizontalLayout: 'full' }))
);

import './headquarter/web';

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

mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log(chalk.greenBright('[Database] Connected'));
    })
    .catch((err) => {
        console.log(
            chalk.red(
                '[Database] ⚠️ Unable to connect to MongoDB Database.\nError: ' +
                    err
            )
        );
    });

listener.ready(client);
listener.shardReady(client);
listener.interactionCreate(client);

import { loadCommands } from './commands/command';
loadCommands(client);

client.connect();
