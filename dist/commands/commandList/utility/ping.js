"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = {
    data: {
        name: 'ping',
        description: 'Ping pong',
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var err_1;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4, interaction.createMessage({
                            content: "Ping Pong!",
                        })];
                case 1:
                    _a.sent();
                    return [3, 4];
                case 2:
                    err_1 = _a.sent();
                    return [4, interaction.createMessage({
                            content: 'Something is weong, try to contact developers!',
                        })];
                case 3:
                    _a.sent();
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); },
};
