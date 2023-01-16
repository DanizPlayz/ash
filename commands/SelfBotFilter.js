const discord = require("discord.js");
const bookman = require("../bookman.js")
const bb = require("../module/BetterBookman.js")
const log = require("../module/logging.js")
const config = require("../config.js")
const emoji = require("../emoji.js")

module.exports.config = {
  name: "selfbotfilter",
  description: "Bisa membantu mengusir para spambot NOTE: ini tidak 100% efektif ke semua jenis spambot",
  usage: `${config.prefix}selfbotfilter`,
  aliases: ["sbf"],
  requiredperm: ["SEND_MESSAGES", "BAN_MEMBERS"],
  permission: ["BAN_MEMBERS"]
  
}

module.exports.run = async (bot, args, message, settings) => {

let EMBED = new discord.MessageEmbed().setColor(settings.defaultColor)
let CekStatus = await bb.fetch("guildSettings",`${message.guild.id}.selfbot_filter.status`)
if(!CekStatus) CekStatus = "TURN_OFF"


if(CekStatus == "TURN_OFF") {

await bookman.guildSettings.set(`${message.guild.id}.selfbot_filter.status`, "TURN_ON")
return message.channel.send(`${emoji.check} **selfbotfilter:** ON`).then(as => {
log(message, "selfbotfilter: ON", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}`)
})

} 


if(CekStatus == "TURN_ON") {

await bookman.guildSettings.set(`${message.guild.id}.selfbot_filter.status`, "TURN_OFF")
return message.channel.send(`${emoji.check} **selfbotfilter:** OFF`).then(as=> {
log(message, "invitelinkfilter: OFF", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}`)
})

}

}