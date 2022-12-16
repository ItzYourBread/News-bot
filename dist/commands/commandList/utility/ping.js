"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = {
    data: {
        name: "ping",
        description: "Ping pong"
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        return (0, tslib_1.__generator)(this, function (_a) {
            console.log("Hello!");
            return [2];
        });
    }); }
};
