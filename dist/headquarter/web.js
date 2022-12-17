"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = (0, tslib_1.__importDefault)(require("express"));
var app = (0, express_1.default)();
app.listen(process.env.PORT, function () {
    console.log('Web working!!');
});
