const discord = require("discord.js");
const bookman = require("../bookman.js")
const log = require("../module/logging.js")
const config = require("../config.js")
const IgnoreTools = require("../module/IgnoreTools.js")
const emote = require("../emoji.js")



module.exports.config = {
  name: "antispam",
  description: "Mencegah member/raider untuk ngespam di server",
  usage: `
> **${config.prefix}antispam <on/off>**
Nyalakan atau matikan fitur

> **${config.prefix}antispam <kickmode/banmode>**
set hukuman untuk para spammer, hanya ada dua mode Ban dan Kick. Defaultnya Kick Mode

> **${config.prefix}antispam ignore <#channels/@roles/@Members>**
Channels/Roles/Members yang akan di abaikan oleh AntiSpam

  `,
  aliases: ["antis", "antspm", "anspm"],
  requiredperm: ["SEND_MESSAGES", "MANAGE_MESSAGES", "BAN_MEMBERS", "KICK_MEMBERS"],
  permission: ["MANAGE_MESSAGES"]
  
}

module.exports.run = async (bot, args, message, settings) => {


let EMBED = new discord.MessageEmbed().setColor(settings.defaultColor)
let CekStatus = await bookman.guildSettings.fetch(`${message.guild.id}.antispam.status`)
let CekIsi = await bookman.guildSettings.has(`${message.guild.id}.antispam.status`)
let CekMode1 = await bookman.guildSettings.fetch(`${message.guild.id}.antispam.punishMode`)
let CekMode = await bookman.guildSettings.has(`${message.guild.id}.antispam.punishMode`)

if(!CekIsi) CekStatus = "TURN_OFF"

if(!CekMode) CekMode1 = "KICK_MODE"

let Pilihan = args[0];
if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help antispam\` akan membantu.`)

if(Pilihan == "on") {
if(CekStatus == "TURN_ON") return message.channel.send(`${emote.cross} **AntiSpam sudah ON**`)
await bookman.guildSettings.set(`${message.guild.id}.antispam.status`, "TURN_ON")
return message.channel.send(`${emote.check} **antispam:** ON`).then(as => {
log(message, "AntiSpam: ON", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})

}
if(Pilihan == "off") {
if(CekStatus == "TURN_OFF") return message.channel.send(`${emote.cross} **AntiSpam sudah OFF**`)
await bookman.guildSettings.set(`${message.guild.id}.antispam.status`, "TURN_OFF")
return message.channel.send(`${emote.check} **antispam:** OFF`).then(as => {
	log(message, "AntiSpam: OFF", `
**command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
`)
})




}


if(Pilihan == "kickmode") {
    if(CekMode1 == "KICK_MODE") return message.channel.send(`${emote.cross} **AntiSpam sudah dalam mode kick!**`)
    await bookman.guildSettings.set(`${message.guild.id}.antispam.punishMode`, "KICK_MODE")
    return message.channel.send(`${emote.check} **antispam:** Set Ke Kick Mode`).then(as => {
        log(message, "AntiSpam: Set Kick Mode", `
    **command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
    `)
    })
    
    
    }

    if(Pilihan == "banmode") {
        if(CekMode1 == "BAN_MODE") return message.channel.send(`${emote.cross} **AntiSpam sudah dalam mode banned!**`)
        await bookman.guildSettings.set(`${message.guild.id}.antispam.punishMode`, "BAN_MODE")
        return message.channel.send(`${emote.check} **antispam:** Set Ke Banned Mode`).then(as => {
            log(message, "AntiSpam: Set Banned Mode", `
        **command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
        `)
        })
        
        
    }

if(Pilihan == "ignore") {

IgnoreTools(message, "antispam", "AntiSpam");

}



} 