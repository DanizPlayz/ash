const bb = require("./BetterBookman.js")
const discord = require("discord.js")
const ms = require("ms")
const config = require("../config.js")
const log = require("./logging.js")
const ErrorHandler = require("./ErrorHandler.js")

async function MauDikasihNamaApaGataumalesPengenBeliTruk(Kontol) {

let status = await bb.fetch("guildSettings",`${Kontol.guild.id}.autokick.status`)

if(!status) status = "TURN_OFF";
//if(status == "TURN_OFF") return false;
if(Kontol.user.bot == true) return false;

let TanggalDibuat = ms(ms(Date.now()- Kontol.user.createdAt))
let BatasWaktu    = ms('2 days')

if(status == "TURN_ON") {
if(BatasWaktu > TanggalDibuat) return kicks(Kontol, discord)
}
if(status == "TURN_OFF") {
 if(BatasWaktu > TanggalDibuat) return log(Kontol, "Akun Masih Baru!", `
  Akun Bernama:
 **${Kontol.user.username}**#${Kontol.user.discriminator} Masih berumur kurang dari 2 hari,
 sebaiknya hati2 dengan akun ini

`) 
}


async function kicks(member, discord) {

let EMBED = new discord.MessageEmbed()
  .setColor(config.defaultColor)
  .setTitle("AutoKick")
  .setDescription(`**${member.user.username}**#${member.user.discriminator}, 
Maaf Kamu dilarang dari **${member.guild.name}** karena akun kamu **berumur di bawah 2 hari**
sedangkan **${member.guild.name}** memiliki **AutoKick** di Aktifkan
coba lagi ke\'esokan harinya`)
  
  
member.send(EMBED).then(TT => {
  
member.kick(`AutoKick: ${member.user.tag} masih berumur di bawah 2 hari`).catch(err => {ErrorHandler(message, "AntiSpam", err.message)})
  
  log(member, "AutoKick", `
 **${member.user.username}**#${member.user.discriminator} karena akun nya masih berumur muda


                      `)



})



}

}



module.exports = MauDikasihNamaApaGataumalesPengenBeliTruk;