"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var guildConfig_1 = require("../../../models/guildConfig");
var config = (0, tslib_1.__importStar)(require("../../../config.json"));
exports.default = {
    data: {
        name: 'help',
        description: 'Help!',
        options: [
            {
                name: 'commands',
                description: 'Get help for commands',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
            {
                name: 'info',
                description: 'Get help for info',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var Data, commands, allbuttons, info;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, guildConfig_1.database.findOne({ id: interaction.guildID })];
                case 1:
                    Data = (_a.sent()) ||
                        new guildConfig_1.database({ id: interaction.guildID });
                    if (!(interaction.data.options[0].name === 'commands')) return [3, 3];
                    commands = {
                        title: client.user.username + "'s Commands!",
                        color: Number(config.colour.embed),
                        description: 'Here you can find all the commands',
                        fields: [
                            {
                                name: '</setup:0>',
                                value: 'Set the news channel in your server.',
                                inline: false,
                            },
                            {
                                name: '</reset:0>',
                                value: 'Reset the news channel if its not working.',
                                inline: false,
                            },
                            {
                                name: '</help:0>',
                                value: 'Get commands & info help.',
                                inline: false,
                            },
                            {
                                name: '</ping:0>',
                                value: 'Ping Pong',
                                inline: false,
                            },
                        ],
                        footer: {
                            text: 'Pages: 1/1',
                        },
                        timestamp: new Date(),
                    };
                    allbuttons = {
                        type: eris_1.Constants.ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                label: '<<',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: '0',
                                disabled: false,
                            },
                            {
                                label: '<',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: '1',
                                disabled: false,
                            },
                            {
                                label: '>',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: '2',
                                disabled: false,
                            },
                            {
                                label: '>>',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: '3',
                                disabled: false,
                            },
                        ],
                    };
                    allbuttons.components.map(function (d) {
                        d.disabled = true;
                    });
                    return [4, interaction.createMessage({
                            embeds: [commands],
                            components: [allbuttons],
                        })];
                case 2:
                    _a.sent();
                    return [3, 5];
                case 3:
                    if (!(interaction.data.options[0].name === 'info')) return [3, 5];
                    info = {
                        title: client.user.username + "'s Info",
                        color: Number(config.colour.embed),
                        description: "News bot is known as for Discord events, features, blogs, servers"
                            + " It's sends discord related news in a server specific channel which is created by News bot,"
                            + " it's help new users to get discord new updates news & upcoming features patch in mini form"
                            + " reason we made the bot because there is no discord bot related to discord bot, and"
                            + " we claim that we are the first discord related news & patch bot."
                            + "\n\nBest of luck NotRealArif 21/12/2022",
                        timestamp: new Date()
                    };
                    return [4, interaction.createMessage({ embeds: [info] })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2];
            }
        });
    }); },
};
