"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = (0, tslib_1.__importDefault)(require("express"));
var path_1 = (0, tslib_1.__importDefault)(require("path"));
var node_fetch_1 = (0, tslib_1.__importDefault)(require("node-fetch"));
var body_parser_1 = (0, tslib_1.__importDefault)(require("body-parser"));
var guildConfig_1 = require("../models/guildConfig");
var app = (0, express_1.default)();
var news = {
    title: '',
    color: Number('0x696969'),
    description: '',
    timestamp: new Date(),
};
var sendFunction = function (n) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
    var param, hooks, i, hook;
    return (0, tslib_1.__generator)(this, function (_a) {
        switch (_a.label) {
            case 0:
                param = {
                    username: 'News',
                    avatar_url: 'https://cdn.discordapp.com/attachments/1009058284986183720/1054768835556823101/IMG_0496.png',
                    embeds: [n],
                };
                return [4, guildConfig_1.database.find({})];
            case 1:
                hooks = (_a.sent()) || null;
                if (!hooks)
                    return [2, 'Not Found WebHooks'];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < hooks.length)) return [3, 5];
                hook = hooks[i].webhook;
                return [4, (0, node_fetch_1.default)(hook, {
                        method: 'POST',
                        body: JSON.stringify(param),
                        headers: {
                            'Content-type': 'application/json',
                        },
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3, 2];
            case 5: return [2, 'OK All Send!'];
        }
    });
}); };
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('/', path_1.default.join(__dirname, 'public/'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index');
});
app.post('/', function (req, res) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
    var title, desc, _a, _b;
    return (0, tslib_1.__generator)(this, function (_c) {
        switch (_c.label) {
            case 0:
                title = req.body.title || null;
                desc = req.body.des || null;
                if (!title && !desc)
                    return [2, res.send('Missing Title and Descreption')];
                news.title = title;
                news.description = desc;
                _b = (_a = res).send;
                return [4, sendFunction(news)];
            case 1: return [2, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
app.listen(process.env.PORT, function () {
    console.log('Web working!!');
});
