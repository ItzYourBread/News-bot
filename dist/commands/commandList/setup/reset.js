"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var guildConfig_1 = require("../../../models/guildConfig");
var config = (0, tslib_1.__importStar)(require("../../../config.json"));
exports.default = {
    data: {
        name: 'reset',
        description: 'Reset the setup',
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var progress, finished_1, Data_1, err_1;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    if (!interaction.member.permission.has('administrator')) {
                        return [2, interaction.editOriginalMessage({
                                embeds: [
                                    {
                                        title: 'Failed!',
                                        color: Number(config.colour.failed),
                                        description: "You don't have `Administrator` permission!",
                                        timestamp: new Date(),
                                    },
                                ],
                            })];
                    }
                    progress = {
                        title: 'Setup loading...',
                        color: Number(config.colour.embed),
                        description: 'Here we go!',
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({
                            embeds: [progress],
                        })];
                case 2:
                    _a.sent();
                    finished_1 = {
                        title: 'Reset finished!',
                        color: Number(config.colour.embed),
                        description: 'Successfully channels are resetted!',
                        timestamp: new Date(),
                    };
                    return [4, guildConfig_1.database.findOne({ id: interaction.guildID })];
                case 3:
                    Data_1 = (_a.sent()) ||
                        new guildConfig_1.database({ id: interaction.guildID });
                    if (Data_1.channel && client.getChannel(Data_1.channel)) {
                        client.deleteChannel(Data_1.channel);
                        setTimeout(function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
                            var channelID, webhookID;
                            return (0, tslib_1.__generator)(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, client.createChannel(interaction.guildID, 'news🗞', 0)];
                                    case 1:
                                        channelID = _a.sent();
                                        return [4, client.createChannelWebhook(channelID.id, {
                                                name: 'News',
                                            })];
                                    case 2:
                                        webhookID = _a.sent();
                                        Data_1.channel = channelID.id;
                                        Data_1.webhook = "https://discord.com/api/webhooks/" + webhookID.id + "/" + webhookID.token;
                                        Data_1.save();
                                        return [2];
                                }
                            });
                        }); }, 2000);
                    }
                    else {
                        finished_1.description = "**" + interaction.member.guild.name + "** haven't setup the news channel!";
                        finished_1.description += "\nTry to run `/setup` to setup the news channel";
                    }
                    setTimeout(function () {
                        interaction.editOriginalMessage({
                            embeds: [finished_1],
                        });
                    }, 1250);
                    return [3, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [2, interaction.editOriginalMessage({
                            embeds: [
                                {
                                    title: 'Setup failed!',
                                    color: Number(config.colour.failed),
                                    description: 'Something went wrong please notify our developers',
                                    timestamp: new Date(),
                                },
                            ],
                        })];
                case 5: return [2];
            }
        });
    }); },
};
