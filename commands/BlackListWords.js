const discord = require("discord.js");
const it = require("../module/IgnoreTools.js")
const bb = require("../module/BetterBookman.js")
const log = require("../module/logging.js")
const IgnoreTools = require("../module/IgnoreTools.js")
const config = require("../config.js")
const emote = require("../emoji.js")


module.exports.config = {
  name: "blacklistword",
  description: "Blacklist kata2 yang tidak kamu ingin kan di servermu contoh: nama mantan :v",
  usage: `
  > **${config.prefix}blacklistword <on/off>**
  Nyalakan atau matikan blacklistword

  > **${config.prefix}blacklistword set <word>**
  Tambah/hapus kata2 untuk diblacklist
  **contoh menambahkan:** \`${config.prefix}blacklistword set word1 word2\`
  *maka "word1" dan "word2" akan di masukan dalam daftar blacklistword*
  
  **contoh menghapus:** \`${config.prefix}blacklistword set word1 word2\`
   *maka "word1" dan "word2" akan di hapus dari daftar blacklistword*
  gunakan **spasi** sebagai pemisah kata

  **Kamu bisa** \`${config.prefix}blacklistword set word1 word2 word3 word4 word5 word6 word7\`
   biar ga capek set satu-satu ye kan

> **${config.prefix}blacklistword ignore <@roles/@members/#channels>**
channels/roles/members yang akan di abaikan oleh blacklistword


  `,
  aliases: ["blw", "blacklistw", "blword"],
  requiredperm: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  permission: ["MANAGE_MESSAGES"]
  
}

module.exports.run = async (bot, args, message, settings) => {
let pilihan = args[0]
if(!pilihan) return message.reply(`Mungkin \`${config.prefix}help blacklistword\` akan membantu.`)
let EMBED = new discord.MessageEmbed().setColor(settings.defaultColor)

let wordlistbla = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.list`)
if(!wordlistbla) {await bb.set("guildSettings", `${message.guild.id}.blacklistword.list`, [])}


let blwordstatus = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.status`)
if(!blwordstatus) blwordstatus = "TURN_OFF"

if(pilihan == "on") {
if(blwordstatus == "TURN_ON") return message.channel.send("> **blacklistword sudah ON**")
await bb.set("guildSettings", `${message.guild.id}.blacklistword.status`, "TURN_ON")
return message.channel.send("<:checks:707783580784394340> **blacklistword:** ON").then(as => {
log(message, "blacklistword: ON", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})

}
if(pilihan == "off") {
if(blwordstatus == "TURN_OFF") return message.channel.send("> **blacklistword sudah OFF**")
await bb.set("guildSettings", `${message.guild.id}.blacklistword.status`, "TURN_OFF")
return message.channel.send("<:checks:707783580784394340> **blacklistword:** OFF").then(as => {
log(message, "blacklistword: OFF", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})
}

if(pilihan == "ignore") {

IgnoreTools(message, "blacklistword", "Blacklist Word");

}


//SET COMMANDS
if(pilihan == "set") {
let wordlistbl = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.list`)
let wordlistditambah = []
let wordlistsudahada = []


let wordlist = args.join(" ").split(" ")
wordlist.splice( wordlist.indexOf("set"), 1);
wordlist.forEach(list => {

if(!wordlistbl.includes(list)) {
wordlistditambah.push(list)

}

if(wordlistbl.includes(list)) {
wordlistsudahada.push(list)

}
})

if(wordlistditambah.length > 0) {
	//console.log("WORDLISTTAMBAH: " + wordlistditambah)
wordlistditambah.forEach(async word=> {
await bb.push("guildSettings", `${message.guild.id}.blacklistword.list`, word)


})
let num = 1;
  let stris = ``
wordlistditambah.forEach(ass => {
stris+= "||" + ass + "||, "
})

EMBED.addFields({name: `${emote.plus} DiTambah:`, value: stris, inline: true})
}

if(wordlistsudahada.length > 0) {
//console.log("WORDLISTSUDAHADA: " + wordlistsudahada)
   let wordlistdb = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.list`)
        wordlistsudahada.forEach(async ass => {
        wordlistdb.splice( wordlistdb.indexOf(ass), 1);
         })
    await bb.set("guildSettings", `${message.guild.id}.blacklistword.list`, wordlistdb)
let num = 1;
let stris = ``
wordlistsudahada.forEach(ass => {
stris+= "||" + ass + "||, "
  
  })
EMBED.addFields({name: `${emote.minus} DiHapus:`, value: stris, inline: true})
}




return message.channel.send({content: `${emote.check} **Blacklist Word**`, embeds: [EMBED]}).then(MATAMU => {
  
  log(message, "Blacklist word berubah", `
**dirubah oleh:** ${message.author.username}#${message.author.discriminator}
	`)
 })








}
//END SET COMMANDS
  
}