import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import { database } from '../models/guildConfig';
var app = express();

let news = {
    title: '',
    color: Number('0x696969'),
    description: '',
    timestamp: new Date(),
};

const sendFunction = async (n) => {
    const param = {
        username: 'News',
        avatar_url:
            'https://cdn.discordapp.com/attachments/1009058284986183720/1054768835556823101/IMG_0496.png',
        embeds: [n],
    };
    const hooks = (await database.find({})) || null;
    if (!hooks) return 'Not Found WebHooks';
    for (let i = 0; i < hooks.length; i++) {
        const hook = hooks[i].webhook;
        await fetch(hook, {
            method: 'POST',
            body: JSON.stringify(param),
            headers: {
                'Content-type': 'application/json',
            },
        });
        //test
    }
    return 'OK All Send!';
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('/', path.join(__dirname, 'public/'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', async (req, res) => {
    const title = req.body.title || null;
    const desc = req.body.des || null;
    if (!title && !desc) return res.send('Missing Title and Descreption');
    news.title = title;
    news.description = desc;
    return res.send(await sendFunction(news));
});
app.listen(process.env.PORT, () => {
    console.log('Web working!!');
});
