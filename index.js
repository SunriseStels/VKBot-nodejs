const express = require('express')
const bodyParser = require('body-parser')
const VkBot = require("node-vk-bot-api")

const Scene = require('node-vk-bot-api/lib/scene')
const Session = require('node-vk-bot-api/lib/session')
const Stage = require('node-vk-bot-api/lib/stage')

const app = express()
const bot = new VkBot({
  token: "TOKEN",
  confirmation: "confirmation",
})

bot.command("time", (ctx) => {
   const date = new Date();

   const h = date.getHours();
   const m = date.getMinutes();
   const s = date.getSeconds();

   const time = "Сейчас " + h + ":" + m + ":" + s;

   ctx.reply(time);
})

const scene = new Scene('photo',
  (ctx) => {
    ctx.scene.next()
    ctx.reply('Привет. Напишите ваше имя: ')
  },
  (ctx) => {
    ctx.session.name = ctx.message.text

    ctx.scene.next()
    ctx.reply('На какую дату вам удобно?')
  },
  (ctx) => {
    ctx.session.date = ctx.message.text

    ctx.scene.leave()
    ctx.reply(`Хорошо, ${ctx.session.name}, вы записались на (${ctx.session.date})`)
  },
)
const session = new Session()
const stage = new Stage(scene)

bot.use(session.middleware())
bot.use(stage.middleware())

bot.command('Фото', (ctx) => {
   ctx.scene.enter('photo')
})

bot.startPolling()



// bot.sendMessage(id, "Я тестовое сообщение от бота - ботяни.", "photo-166302513_456239044");

app.use(bodyParser.json())
app.post('/', bot.webhookCallback)
app.listen(80)