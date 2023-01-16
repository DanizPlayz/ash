const discord = require("discord.js");
const bookman = require("../bookman.js")
const bb = require("../module/BetterBookman.js")
const log = require("../module/logging.js")
const config = require("../config.js")
const emote = require("../emoji.js")


module.exports.config = {
  name: "config",
  description: "Melihat configurasi yang tersimpan",
  usage: `
> **${config.prefix}config list**
Untuk melihat configurasi yang tersimpan

> **${config.prefix}config reset**
Untuk reset semua configurasi
  `,
  aliases: ["cfg"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["MANAGE_GUILD"]
  
}

module.exports.run = async (bot, args, message, settings) => {
const Pilihan = args[0]
if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help config\` akan membantu.`)
//then
//=====================================================================
if(Pilihan == "list") {


//CEK DATABASE AUTOKICK
let AutoKick_status = await bb.fetch("guildSettings",`${message.guild.id}.autokick.status`)
if(!AutoKick_status) AutoKick_status = "TURN_OFF"
//END CEK DATABASE AUTOKICK

//CEK DATABASE SELFBOTFILTER
let SelfBotFilter_status = await bb.fetch("guildSettings",`${message.guild.id}.selfbot_filter.status`)
if(!SelfBotFilter_status) SelfBotFilter_status = "TURN_OFF"
//END CEK DATABASE SELFBOTFILTER


//CEK DATABASE LOGGINGCHANNEL
let loggingChannel = await bb.fetch("guildSettings",`${message.guild.id}.logging.channelID`)
//let loggingChannel = await bookman.guildSettings.fetch(`${message.guild.id}.logging.channelID`)
if(loggingChannel) {loggingChannel = "<#" + loggingChannel + ">"}
if(!loggingChannel) {loggingChannel = "KOSONG"}
//END CEK DATABASE LOGGINGCHANNEL

//CEK DATABASE BLACKLISTWORD
let blacklistword_list = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.list`)
let blacklistword_status = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.status`)
if(!blacklistword_status) blacklistword_status = "TURN_OFF"

let blacklistword_ignore_Roles = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.ignore.roles`)
let blacklistword_ignore_Channels = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.ignore.channels`)
let blacklistword_ignore_Members = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.ignore.members`)
let blacklistword_Ignored = []

if(!blacklistword_list) blacklistword_list = []
 let blacklistedWord = "\n" + ``
blacklistword_list.forEach(ass => {
blacklistedWord+= "||``" + ass + "``|| "
})

if(blacklistword_list.length == 0) blacklistedWord = "KOSONG"

if(blacklistword_ignore_Roles){
blacklistword_ignore_Roles.forEach(Roles => {
    blacklistword_Ignored.push(`<@&${Roles}>`)
})
}

if(blacklistword_ignore_Channels) {
	blacklistword_ignore_Channels.forEach(Channels => {
blacklistword_Ignored.push(`<#${Channels}>`)
	})
}

if(blacklistword_ignore_Members) {
	blacklistword_ignore_Members.forEach(Members => {
		blacklistword_ignore_Members.push(`<@${Members}>`)
	})
}

let BLWIGNORED = blacklistword_Ignored.join(", ")
if(blacklistword_Ignored == 0) BLWIGNORED = "KOSONG"

//END CEK BLACKLISTWORD

//CEK DATABASE INVITELINKFILTER
let InviteLinkFilter_status = await bb.fetch("guildSettings",`${message.guild.id}.invitelinkfilter.status`)
if(!InviteLinkFilter_status) InviteLinkFilter_status = "TURN_OFF"
let InviteLinkFilter_Ignore_Roles = await bb.fetch("guildSettings",`${message.guild.id}.invitelinkfilter.ignore.roles`)
let InviteLinkFilter_Ignore_Channels = await bb.fetch("guildSettings",`${message.guild.id}.invitelinkfilter.ignore.channels`)
let InviteLinkFilter_Ignore_Members = await bb.fetch("guildSettings",`${message.guild.id}.invitelinkfilter.ignore.members`)
let InviteLinkFilter_Ignored = []

if(InviteLinkFilter_Ignore_Roles) {
InviteLinkFilter_Ignore_Roles.forEach(Roles => {
	InviteLinkFilter_Ignored.push(`<@&${Roles}>`)
})

}
if(InviteLinkFilter_Ignore_Channels) {
InviteLinkFilter_Ignore_Channels.forEach(Channels => {
InviteLinkFilter_Ignored.push(`<#${Channels}>`)
})
}

if(InviteLinkFilter_Ignore_Members) {
InviteLinkFilter_Ignore_Members.forEach(Members => {
InviteLinkFilter_Ignored.push(`<@${Members}>`)
})
}

let ILFIGNORED = InviteLinkFilter_Ignored.join(", ")
if(InviteLinkFilter_Ignored == 0) ILFIGNORED = "KOSONG"
//END CEK DATABASE INVITELINKFILTER

//CEK DATABASE NSFWFILTER
let NsfwFilter_status = await bb.fetch("guildSettings",`${message.guild.id}.nsfwfilter.status`)
if(!NsfwFilter_status) NsfwFilter_status = "TURN_OFF"
let NsfwFilter_Ignore_Roles = await bb.fetch("guildSettings",`${message.guild.id}.nsfwfilter.ignore.roles`)
let NsfwFilter_Ignore_Channels = await bb.fetch("guildSettings",`${message.guild.id}.nsfwfilter.ignore.channels`)
let NsfwFilter_Ignore_Members = await bb.fetch("guildSettings",`${message.guild.id}.nsfwfilter.ignore.members`)
let NsfwFilter_Ignored = []

if(NsfwFilter_Ignore_Roles) {
NsfwFilter_Ignore_Roles.forEach(Roles => {
	NsfwFilter_Ignored.push(`<@&${Roles}>`)
})

}
if(NsfwFilter_Ignore_Channels) {
NsfwFilter_Ignore_Channels.forEach(Channels => {
NsfwFilter_Ignored.push(`<#${Channels}>`)
})
}

if(NsfwFilter_Ignore_Members) {
NsfwFilter_Ignore_Members.forEach(Members => {
NsfwFilter_Ignored.push(`<@${Members}>`)
})
}

let NFIGNORED = NsfwFilter_Ignored.join(", ")
if(NsfwFilter_Ignored == 0) NFIGNORED = "KOSONG"
//END CEK DATABASE NSFWFILTER


//CEK DATABASE ANTISPAM
let AntiSpam_status = await bb.fetch("guildSettings",`${message.guild.id}.antispam.status`)
if(!AntiSpam_status) AntiSpam_status = "TURN_OFF"
let AntiSpam_Ignore_Roles = await bb.fetch("guildSettings",`${message.guild.id}.antispam.ignore.roles`)
let AntiSpam_Ignore_Channels = await bb.fetch("guildSettings",`${message.guild.id}.antispam.ignore.channels`)
let AntiSpam_Ignore_Members = await bb.fetch("guildSettings",`${message.guild.id}.antispam.ignore.members`)
let AntiSpam_Ignored = []

if(AntiSpam_Ignore_Roles) {
  AntiSpam_Ignore_Roles.forEach(Roles => {
    AntiSpam_Ignored.push(`<@&${Roles}>`)
})
}
if(AntiSpam_Ignore_Channels) {
  AntiSpam_Ignore_Channels.forEach(Channels => {
    AntiSpam_Ignored.push(`<#${Channels}>`)
  })
  }

  if(AntiSpam_Ignore_Members) {
    AntiSpam_Ignore_Members.forEach(Members => {
      AntiSpam_Ignored.push(`<@${Members}>`)
    })
    }
    let ANTISPAMIGNORED = AntiSpam_Ignored.join(", ")
    if(AntiSpam_Ignored == 0) ANTISPAMIGNORED = "KOSONG"
//END DARI CEK
  

let greenz = emote.switch_on
//REPLACE SEMUA
let FirstText = `








━━━━━━━━━━


━━━━━━━━━━


━━━━━━━━━━


━━━━━━━━━━
`
// "> **SelfBotFilter:** [" + SelfBotFilter_status + 
// "] **Logging Channel:** [" + loggingChannel + "]"
function ReplaceOnOff(text) {
let Pertama = text.replace(/TURN_OFF/g, `${emote.switch_off} Offline`)
let Kedua = Pertama.replace(/TURN_ON/g, `${emote.switch_on} Online`)
let Ketiga = Kedua.replace(/KOSONG/g, "")
return Ketiga;

}
// let tt = FirstText.replace(/TURN_OFF/g, "<:Grayz:577155335450656771> Offline")
// let SecondText = tt.replace(/TURN_ON/g, "<:Greenz:577073834998628352> Online")
// let lastText = SecondText.replace(/KOSONG/g, "-")

 
//SET EMBED
const EMBED = new discord.MessageEmbed().setColor(settings.defaultColor)
//EMBED.setDescription(lastText)

EMBED.addFields(

  {name: `**》SelfBotFilter**`, value: ReplaceOnOff(`
  **Status: [** ${SelfBotFilter_status} **]**
  `), inline: true},
  {name: `**》AutoKick**`, value: ReplaceOnOff(`
  **Status: [** ${AutoKick_status} **]**
  `), inline: true},
  {name: `**》NsfwFilter**`, value: ReplaceOnOff(`
  **Status:  [** ${NsfwFilter_status} **]**
  **Ignore:** ${"\n" + NFIGNORED}
  `), inline: true},
  {name: `**》InviteLinkFilter**`, value: ReplaceOnOff(`
  **Status: [** ${InviteLinkFilter_status} **]**
  **Ignore:** ${"\n" + ILFIGNORED}
  `), inline: true},
  {name: `**》BlackListWord**`, value: ReplaceOnOff(`
  **Status: [** ${blacklistword_status} **]**
  **Word List:** ${blacklistedWord}
  **Ignore:** ${"\n" + BLWIGNORED}
  `), inline: true},
  {name: `**》AntiSpam**`, value: ReplaceOnOff(`
  **Status: [** ${AntiSpam_status} **]**
  **Ignore:** ${"\n" + ANTISPAMIGNORED}
  `), inline: true},
  {name: `**》Logging**`, value: ReplaceOnOff(`
  **Channel:** ${"\n" + loggingChannel}
  `), inline: true}

)

EMBED.setFooter({text: `Configurasi/Pengaturan yang tersimpan di bisa dilihat disini
[ Dibuat Oleh KabirEskobar Dengan Kuota ]`, iconURL: message.guild.iconURL()})


return message.channel.send({content: `${emote.settings} **Configurasi: [ ${message.guild.name} ]**`,
 embeds: [EMBED]})


  }
 //=====================================================================
if(Pilihan == "reset") {
let MAMAKMU = new discord.MessageEmbed().setColor(settings.defaultColor)
MAMAKMU.setDescription("Configurasi server di **Reset**")

log(message, "Configurasi di Reset", `
**Di reset oleh: ** ${message.author.username}#${message.author.discriminator}
	`)
bb.delete("guildSettings",`${message.guild.id}`).then(kntl => {
message.channel.send({content: `${emote.check} **Berhasil**`, embeds: [MAMAKMU]})

})

}




}


