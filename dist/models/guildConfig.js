"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
var tslib_1 = require("tslib");
var mongoose_1 = (0, tslib_1.__importStar)(require("mongoose"));
var GuildConfig = new mongoose_1.Schema({
    id: { type: String, unique: true, required: true },
    channel: { type: String },
    webhook: { type: String },
});
var database = mongoose_1.default.model('GuildConfig', GuildConfig);
exports.database = database;
