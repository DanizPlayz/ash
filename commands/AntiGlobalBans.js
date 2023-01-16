const discord = require("discord.js");
const bb = require("../module/BetterBookman.js")
const log = require("../module/logging.js")
const GB = require("../module/GlobalBansFunction.js")
const bm = require("../bookman.js")
const config = require("../config.js")
//GlobalBansFunction.js
module.exports.config = {
  name: "antiglobalbans",
  description: "Melarang akun2 yang terdaftar didalam GlobalBan list masuk ke server",
  usage: `${config.prefix}antiglobalbans <on/off>`,
  aliases: ["agb"],
  requiredperm: ["BAN_MEMBERS"],
  permission: ["BAN_MEMBERS"]
  
}

module.exports.run = async (bot, args, message, settings) => {
let status = await bb.fetch("guildSettings",`${message.guild.id}.antiglobalbans.status`)
//l

let Pilihan = args[0];
if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help antiglobalbans\` akan membantu.`)
if(!status) status = "TURN_OFF"

console.log(Pilihan)
// if(Pilihan == message.mentions.users.first()) {
//plp
// let usersTerTag = message.mentions.users.first()


// let emb = new discord.messageEmbed()
// let Info = await GB.cari(usersTerTag.id)

// emb.setTitle("Apakah User ada di GlobalBans" + bot.user.username + "?")



// if(!Info) {
// emb.setDescription(`
// ${usersTerTag.tag} tidak terdaftar dalam ${bot.user.username} ban list.`)
// message.channel.send(emb)
// } else {
// emb.setDescription(`
// ${usersTerTag.tag} terdaftar dalam ${bot.user.username} ban list!,
// karena dia telah melakukan ${Info.alasan},
// terdaftar di ban list sejak:
// ${Info.dibansejak}

// `)
// message.channel.send(emb)


// }




// }

if(Pilihan == "info") {
let usersTerTag = message.mentions.users.first()
if(usersTerTag.bot) return message.channel.send("-_-")
if(!usersTerTag) return message.channel.send("No User To Info")
let emb = new discord.MessageEmbed()
let Info = await GB.cari(usersTerTag.id)

emb.setTitle(`GlobalBans info untuk ${usersTerTag.tag}`)
if(!Info) {
emb.setDescription(`
${usersTerTag.tag} tidak terdaftar dalam ${bot.user.username} ban list. Aman 👍`)
message.channel.send(emb)
} else {
emb.setDescription(`
${usersTerTag.tag} terdaftar dalam ${bot.user.username} ban list! ⚠️,
**karena dia telah melakukan:** ${Info.alasan},
**terdaftar di ban list sejak:**
${Info.dibansejak}

`)
message.channel.send(emb)


}


}


if(Pilihan == "on") {
if(status == "TURN_ON") return message.channel.send("<:exs:707783631195865180> **antiglobalbans sudah ON**")
await bm.guildSettings.set(`${message.guild.id}.antiglobalbans.status`, "TURN_ON")
return message.channel.send("<:checks:707783580784394340> **antiglobalbans:** ON").then(as => {
log(message, "AntiGlobalBans: ON", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})

}

if(Pilihan == "off") {
  if(status == "TURN_OFF") return message.channel.send("<:exs:707783631195865180> **antiglobalbans sudah OFF**")
await bm.guildSettings.set(`${message.guild.id}.antiglobalbans.status`, "TURN_OFF")
return message.channel.send("<:checks:707783580784394340> **antiglobalbans:** OFF").then(as => {
	log(message, "AntiGlobalBans: OFF", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})


}
  
}