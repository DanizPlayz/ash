const discord = require("discord.js"),
    bb = require("../module/BetterBookman.js"),
    bookman = require("../bookman.js"),
    log = require("../module/logging.js"),
    config = require("../config.js"),
    emote = require("../emoji.js"),
    WS = require("../module/WarningSystem.js");


module.exports.config = {
  name: "warning",
  description: "sistem warning untuk server",
  usage: `
> **${config.prefix}warning maxwarn <JumlahWarn>**
Mengatur berapa maximal warning sebelum hukuman diberikan, Defaultnya 3

> **${config.prefix}warning subwarn <JumlahWarn>**
Mengurangi jumlah warn member(jika sudah pernah di warn sebelumnya)

> **${config.prefix}warning check <@Member>**
Mengecek berapa warning yang member punya


> **${config.prefix}warning <kickmode/banmode> **
Mengatur hukuman untuk yang sudah melanggar, Defaultnya kick

${emote.info} **Note:**
Sistem warn ini saling terkait dengan sistem warn yang digunakan oleh AntiSpam, 
yang membedakan hanya cara hukumanya.
jika member di warn oleh admin maka dia akan mengikuti hukuman yang berlaku di command warning,
tapi jika dia di warn oleh AntiSpam maka dia akan dihukum sesuai dengan pengaturan antispam.
  `,
  aliases: ["warn", "warns", "warnings", "peringatan"],
  requiredperm: ["SEND_MESSAGES", "MANAGE_MESSAGES", "BAN_MEMBERS", "KICK_MEMBERS"],
  permission: ["MANAGE_MESSAGES", "BAN_MEMBERS", "KICK_MEMBERS"]
  
}

module.exports.run = async (bot, args, message, settings) => {


let EMBED = new discord.MessageEmbed().setColor(settings.defaultColor)
let CekStatus = await bookman.guildSettings.fetch(`${message.guild.id}.warning.status`)
let CekIsi = await bookman.guildSettings.has(`${message.guild.id}.warning.status`)
let CekMode1 = await bookman.guildSettings.fetch(`${message.guild.id}.warning.punishMode`)
let CekMode = await bookman.guildSettings.has(`${message.guild.id}.warning.punishMode`)

if(!CekIsi) CekStatus = "TURN_OFF"
if(!CekMode) CekMode1 = "KICK_MODE"

let Pilihan = args[0];
if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help warning\` akan membantu.`)

if(Pilihan == "subwarn") {

}

if(Pilihan == "check") {
let User = message.mentions.users.first()
if(!User) return message.channel.send(`${emote.cross} **| Mention member untuk di cek.**`)
let maxWarn = await bb.fetch("guildSettings", `${message.guild.id}.maxWarn`)
if (!maxWarn) maxWarn = 3
let check = await WS.check(message.guild.id, User.id)
let fixedCheck = ``
if(check == "NO_WARN_RECORD") fixedCheck = "Dia baik, dia belum pernah di warn"
if(check !== "NO_WARN_RECORD") fixedCheck = `${check}/${maxWarn} Peringatan`
message.channel.send(`
${emote.info}** | ${User.username}#${User.discriminator}**
**History Warning:** ${fixedCheck}
`)
}

if(Pilihan == "maxwarn") {
let pilihan2 = args[1]
if(isNaN(pilihan2)) return message.channel.send(`${emote.cross} **| Value MaxWarn harus berupa nomor.**`)



}


if(Pilihan == "kickmode") {
    if(CekMode1 == "KICK_MODE") return message.channel.send(`${emote.cross} **Warning sudah dalam mode kick!**`)
    await bb.set("guildSettings",`${message.guild.id}.warning.punishMode`, "KICK_MODE")
    return message.channel.send(`${emote.check} **| ${emote.kick} | Warning:** Set Ke Kick Mode`).then(as => {
        log(message, "Warning: Set Kick Mode", `
    **command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
    `)
    })
    
    
    }

    if(Pilihan == "banmode") {
        if(CekMode1 == "BAN_MODE") return message.channel.send(`${emote.cross} **Warning sudah dalam mode banned!**`)
        await bb.set("guildSettings", `${message.guild.id}.warning.punishMode`, "BAN_MODE")
        return message.channel.send(`${emote.check} | ${emote.banned} | **Warning:** Set Ke Banned Mode`).then(as => {
            log(message, "Warning: Set Banned Mode", `
        **command dijalankan oleh::** ${message.author.username}#${message.author.discriminator}
        `)
        })
        
        
    }




} 