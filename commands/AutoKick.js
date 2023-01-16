const discord = require("discord.js");
const bb = require("../module/BetterBookman.js")
const log = require("../module/logging.js")
const bm = require("../bookman.js")
const config = require("../config.js")

module.exports.config = {
  name: "autokick",
  description: "AutoKick akun2 yang masih berumur di bawah 2 hari",
  usage: `${config.prefix}autokick <on/off>`,
  aliases: ["ak", "autok", "akick"],
  requiredperm: ["KICK_MEMBERS"],
  permission: ["KICK_MEMBERS"]
  
}

module.exports.run = async (bot, args, message, settings) => {
let status = await bb.fetch("guildSettings",`${message.guild.id}.autokick.status`)


let Pilihan = args[0];
if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help autokick\` akan membantu.`)

if(!status) status = "TURN_OFF"


if(Pilihan == "on") {
if(status == "TURN_ON") return message.channel.send("<:exs:707783631195865180> **autokick sudah ON**")
await bm.guildSettings.set(`${message.guild.id}.autokick.status`, "TURN_ON")
return message.channel.send("<:checks:707783580784394340> **autokick:** ON").then(as => {
log(message, "AutoKick: ON", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})

}

if(Pilihan == "off") {
  if(status == "TURN_OFF") return message.channel.send("<:exs:707783631195865180> **autokick sudah OFF**")
await bm.guildSettings.set(`${message.guild.id}.autokick.status`, "TURN_OFF")
return message.channel.send("<:checks:707783580784394340> **autokick:** OFF").then(as => {
	log(message, "AutoKick: OFF", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})


}
  
}