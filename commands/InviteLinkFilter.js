const discord = require("discord.js");
const bookman = require("../bookman.js")
const log = require("../module/logging.js")
const config = require("../config.js")
const IgnoreTools = require("../module/IgnoreTools.js")
const ErrorHandler = require("../module/ErrorHandler.js")
const emoji = require("../emoji.js")

module.exports.config = {
  name: "invitelinkfilter",
  description: "Filter message dari promosi link invite discord yang tidak di inginkan, tapi ga bisa filter kode nuklir(bagi cuk)",
  usage: `
> **${config.prefix}invitelinkfilter <on/off>**
Nyalakan atau matikan fitur

> **${config.prefix}invitelinkfilter ignore <#channels/@roles/@Members>**
Channels/Roles/Members yang akan di abaikan oleh invitelinkfilter

  `,
  aliases: ["ilf", "invitelinkf", "invitelf"],
  requiredperm: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  permission: ["MANAGE_MESSAGES"]
  
}

module.exports.run = async (bot, args, message, settings) => {


let EMBED = new discord.MessageEmbed().setColor(settings.defaultColor)
let CekStatus = await bookman.guildSettings.fetch(`${message.guild.id}.invitelinkfilter.status`)
let CekIsi = await bookman.guildSettings.has(`${message.guild.id}.invitelinkfilter.status`)

if(!CekIsi) CekStatus = "TURN_OFF"


let Pilihan = args[0];
if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help invitelinkfilter\` akan membantu.`)

if(Pilihan == "on") {
if(CekStatus == "TURN_ON") return message.channel.send(`${emoji.cross} **InviteLinkFilter sudah ON**`)
await bookman.guildSettings.set(`${message.guild.id}.invitelinkfilter.status`, "TURN_ON")
return message.channel.send(`${emoji.check} **invitelinkfilter:** ON`).then(as => {
log(message, "invitelinkfilter: ON", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})

}
if(Pilihan == "off") {
if(CekStatus == "TURN_OFF") return message.channel.send(`${emoji.cross} **InviteLinkFilter sudah OFF**`)
await bookman.guildSettings.set(`${message.guild.id}.invitelinkfilter.status`, "TURN_OFF")
return message.channel.send(`${emoji.check} **invitelinkfilter:** OFF`).then(as => {
	log(message, "invitelinkfilter: OFF", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})


}
if(Pilihan == "ignore") {

IgnoreTools(message, "invitelinkfilter", "InviteLinkFilter");

}



} 