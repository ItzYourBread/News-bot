"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var listener_1 = (0, tslib_1.__importDefault)(require("./listeners/listener"));
var figlet_1 = (0, tslib_1.__importDefault)(require("figlet"));
var mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
var chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
require("dotenv/config");
console.clear();
console.log(chalk_1.default.greenBright(figlet_1.default.textSync('News.', { horizontalLayout: 'full' })));
require("./headquarter/web");
var client = new eris_1.Client(process.env.TOKEN, {
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
mongoose_1.default
    .connect(process.env.DATABASE)
    .then(function () {
    console.log(chalk_1.default.greenBright('[Database] Connected'));
})
    .catch(function (err) {
    console.log(chalk_1.default.red('[Database] ⚠️ Unable to connect to MongoDB Database.\nError: ' +
        err));
});
listener_1.default.ready(client);
listener_1.default.shardReady(client);
listener_1.default.interactionCreate(client);
var command_1 = require("./commands/command");
(0, command_1.loadCommands)(client);
client.connect();
