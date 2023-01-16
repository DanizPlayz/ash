const discord = require("discord.js");
const config = require("../config.js")
const bookman = require("../bookman.js")
const log = require("../module/logging.js")
const emote = require("../emoji.js")

module.exports.config = {
  name: "logging",
  description: "Untuk Logging aksi bot atau notifikasi/pemberitahuan, tapi ga bisa log hatimu.",
  usage: `${config.prefix}logging set <#channel> / ${config.prefix}logging reset`,
  aliases: ["log", "l"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["MANAGE_GUILD"]
  
}

module.exports.run = async (bot, args, message, settings) => {

const pilihan = args[0]
if(!pilihan) return message.reply(`Mungkin \`${config.prefix}help logging\` akan membantu.`)

if(pilihan == "set") {

const Channelnya = message.mentions.channels.first()
if(!Channelnya) return;
const EMBED = new discord.MessageEmbed().setColor(config.defaultColor)

await bookman.guildSettings.set(`${message.guild.id}.logging.channelID`, Channelnya.id)
EMBED.setDescription(`channel logging di set ke: ${Channelnya}`)
return message.channel.send({content: `${emote.check} **Logging** channel di set`, embeds: [EMBED]}).then(as => {

log(message, "Logging channel di set", `
**Logging di set ke:** <#${Channelnya.id}>
**Diset oleh:** ${message.author.username}#${message.author.discriminator}


	`)

})


}



if(pilihan == "reset") {
const EMBED = new discord.MessageEmbed().setColor(config.defaultColor)
await bookman.guildSettings.delete(`${message.guild.id}.logging`)
EMBED.setDescription(`**channel logging di Reset**`)
return message.channel.send("<:checks:707783580784394340> **Logging** channel di reset", EMBED).then(as => {

log(message, "Logging channel di Reset", `
**Di reset oleh:** ${message.author.username}#${message.author.discriminator}
`)

})
}


}