const discord = require("discord.js");
const bb = require("../module/BetterBookman.js")
const log = require("../module/logging.js")
const bm = require("../bookman.js")
const config = require("../config.js")
const IgnoreTools = require("../module/IgnoreTools.js")

module.exports.config = {
  name: "nsfwfilter",
  description: `Mengfilter konten yang mungkin mengandung nsfw
  NOTE: Channel nsfw tidak akan di ganggu oleh fitur ini
  fitur ini masih beta jadi harap maklum jika belum bekerja dengan baik
  
  `,
  usage: `> **${config.prefix}nsfwfilter <on/off>**
  Nyalakan atau matikan NsfwFilter

  > **${config.prefix}nsfwfilter ignore <@roles/@members/#channels>**
channels/roles/members yang akan di abaikan oleh nsfwfilter
  `,
  aliases: ["nsfwf", "nf"],
  requiredperm: ["MANAGE_MESSAGES"],
  permission: ["KICK_MEMBERS"]
  
}

module.exports.run = async (bot, args, message, settings) => {
let status = await bb.fetch("guildSettings",`${message.guild.id}.nsfwfilter.status`)


let Pilihan = args[0];
if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help nsfwfilter\` akan membantu.`)

if(!status) status = "TURN_OFF"


if(Pilihan == "on") {
if(status == "TURN_ON") return message.channel.send("<:exs:707783631195865180> **nsfwfilter sudah ON**")
await bm.guildSettings.set(`${message.guild.id}.nsfwfilter.status`, "TURN_ON")
return message.channel.send("<:checks:707783580784394340> **nsfwfilter:** ON").then(as => {
log(message, "NsfwFilter: ON", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})

}

if(Pilihan == "off") {
  if(status == "TURN_OFF") return message.channel.send("<:exs:707783631195865180> **nsfwfilter sudah OFF**")
await bm.guildSettings.set(`${message.guild.id}.nsfwfilter.status`, "TURN_OFF")
return message.channel.send("<:checks:707783580784394340> **nsfwfilter:** OFF").then(as => {
	log(message, "NsfwFilter: OFF", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})


}
  
if(Pilihan == "ignore") {

IgnoreTools(message, "nsfwfilter", "Nsfw Filter");

}

}