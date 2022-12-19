"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var guildConfig_1 = require("../../../models/guildConfig");
var config = (0, tslib_1.__importStar)(require("../../../config.json"));
exports.default = {
    data: {
        name: 'setup',
        description: 'Setup the news channel',
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var progress, Data, finished_1, channelID, webhookID, err_1;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
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
                    return [4, guildConfig_1.database.findOne({ id: interaction.guildID })];
                case 3:
                    Data = (_a.sent()) ||
                        new guildConfig_1.database({ id: interaction.guildID });
                    finished_1 = {
                        title: 'Setup finished!',
                        color: Number(config.colour.embed),
                        description: 'Successfully setup has been finished!',
                        timestamp: new Date(),
                    };
                    finished_1.description +=
                        '\nNow you can see a new channel created called `news` at the top';
                    finished_1.description +=
                        ' New bot will upload amazing discord related news on the channel';
                    finished_1.description +=
                        '\nLike: discord events, new discord features, servers news, millstones, etc.';
                    finished_1.description +=
                        '\n\nHope you will enjoy amazing news from News bot!';
                    if (!(Data.channel && client.getChannel(Data.channel))) return [3, 4];
                    finished_1.description = "**" + interaction.member.guild.name + "** has already setup the news channel";
                    finished_1.description +=
                        '\nIf you have any issues run `/reset` to delete & create the setup again!';
                    return [3, 7];
                case 4: return [4, client.createChannel(interaction.guildID, 'news🗞', 0)];
                case 5:
                    channelID = _a.sent();
                    return [4, client.createChannelWebhook(channelID.id, {
                            name: 'News',
                        })];
                case 6:
                    webhookID = _a.sent();
                    Data.channel = channelID.id;
                    Data.webhook = "https://discord.com/api/webhooks/" + webhookID.id + "/" + webhookID.token;
                    Data.save();
                    _a.label = 7;
                case 7:
                    setTimeout(function () {
                        interaction.editOriginalMessage({
                            embeds: [finished_1],
                        });
                    }, 1250);
                    return [3, 9];
                case 8:
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
                case 9: return [2];
            }
        });
    }); },
};
