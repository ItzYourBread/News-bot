"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var config = (0, tslib_1.__importStar)(require("../../../config.json"));
exports.default = {
    data: {
        name: 'setup',
        description: 'Setup the news channel',
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var progress, finished;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    progress = {
                        title: "Setup loading...",
                        color: Number(config.colour.embed),
                        description: "Here we go!",
                        timestamp: new Date()
                    };
                    return [4, interaction.editOriginalMessage({
                            embeds: [progress]
                        })];
                case 2:
                    _a.sent();
                    finished = {
                        title: 'Setup finished!',
                        color: Number(config.colour.embed),
                        description: 'Successfully setup has been finished!',
                        timestamp: new Date(),
                    };
                    finished.description +=
                        '\nNow you can see a new channel created called `news` at the top';
                    finished.description +=
                        ' New bot will upload amazing discord related news on the channel';
                    finished.description +=
                        '\nLike: discord events, new discord features, servers news, millstones, etc.';
                    finished.description +=
                        '\n\nHope you will enjoy amazing news from News bot!';
                    setTimeout(function () {
                        interaction.editOriginalMessage({
                            embeds: [finished],
                        });
                    }, 1250);
                    return [2];
            }
        });
    }); },
};
