const express = require("express");
const bodyParser = require("body-parser");
const {Botact} = require("botact");

const server = express();
const bot = new Botact({
   token: "TOKEN",
   confirmation: 'confirmation'
});

bot.on(function(ctx){
   console.log(ctx.body);
   ctx.reply('Приветики :)');
})

bot.command('start', function(ctx){
   ctx.reply('Вы успешно стартовали');
})

bot.command('time', function(ctx){
   const date = new Date();
   const h = date.getHours();
   const m = date.getMinutes();
   const s = date.getSeconds();
   const time = "Сейчас " + h + ":" + m + ":" + s;
   ctx.reply(time);
})

server.use(bodyParser.json());
server.post('/', bot.listen);
server.listen(80);