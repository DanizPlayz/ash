const log = require("./logging.js")
const spam = require('./AntiSpam.js')
const bb = require("./BetterBookman.js")
const discord = require("discord.js")
const settings = require("../config.js")
const emote = require("../emoji.js")
const warn = require("./WarningSystem.js");
const ErrorHandler = require("./ErrorHandler.js")

async function DanizPlayz(message) {
    if (message.author.bot) return false;
    if (message.channel.type === "dm") return false;

    const AntiSpamStatus = await bb.fetch("guildSettings", `${message.guild.id}.antispam.status`)
if(!AntiSpamStatus) return false;
if(AntiSpamStatus == "TURN_OFF") return false;


//ignored roles
let ignoredRoles = await bb.fetch('guildSettings', `${message.guild.id}.antispam.ignore.roles`)
if(!ignoredRoles) ignoredRoles = [];
if (message.member._roles.some(r => ignoredRoles.includes(r))) return;
//=================

//ignored channel
let ignoredChannels = await bb.fetch('guildSettings', `${message.guild.id}.antispam.ignore.channels`)
if(!ignoredChannels) ignoredChannels = [];    
if (ignoredChannels.includes(message.channel.id)) return;
//=================

//ignored member
let ignoredMembers = await bb.fetch('guildSettings', `${message.guild.id}.antispam.ignore.members`)
if(!ignoredMembers) ignoredMembers = []
if(ignoredMembers.includes(message.member.id)) return;
//=================



        if (message.author.bot) return;

    await spam.log(message, 15)
let detectSpam = await spam.Time(4, 2500)

        if(detectSpam.spamStatus == true){

          warn.add(message.guild.id, message.member.id, 1).then(async a=> {
            let maxWarn = await bb.fetch("guildSettings", `${message.guild.id}.maxWarn`)
            if (!maxWarn) maxWarn = 3
let cekwarn = await warn.check(message.guild.id, message.member.id)

return message.channel.send(`**${emote.alert} | Jangan spamming!. Peringatan ke (${cekwarn}/${maxWarn})**`).then(alertMsg => {
  setTimeout(() => {
    alertMsg.delete().catch(err => {})
  }, "3000")
 detectSpam.forEach(async log => {
  message.channel.messages.fetch(log.messageID).then(async checkMsg => {
   if(checkMsg == null) return;
   if(checkMsg == undefined) return;
   if(!checkMsg) return;
   if(checkMsg.deleted == true) return;

   if(checkMsg.deleted == false) checkMsg.delete().catch(err => {":v"})
return detectSpam.pop();
  }).catch(err => {":v"});


})

}).catch(err => {ErrorHandler(message, "AntiSpam", err.message)})

          })

        }
let spamSameMessage = await spam.sameMessages(8, 65000)

        if(spamSameMessage.spamStatus == true){
     
          warn.add(message.guild.id, message.member.id, 1).then(async a=> {
            let maxWarn = await bb.fetch("guildSettings", `${message.guild.id}.maxWarn`)
            if (!maxWarn) maxWarn = 3
let cekwarn = await warn.check(message.guild.id, message.member.id)

return message.channel.send(`**${emote.alert} | Jangan spamming!. Peringatan ke (${cekwarn}/${maxWarn})**`).then(alertMsg => {
  setTimeout(() => {
    alertMsg.delete().catch(err => {})
  }, "3000")
  spamSameMessage.forEach(async log => {
  message.channel.messages.fetch(log.messageID).then(async checkMsg => {
   if(checkMsg == null) return;
   if(checkMsg == undefined) return;
   if(!checkMsg) return;
   if(checkMsg.deleted == true) return;

   if(checkMsg.deleted == false) checkMsg.delete().catch(err => {":v"});
return spamSameMessage.pop()
  }).catch(err => {":v"});


})

})

          })
        }
    
    
    

}

module.exports = DanizPlayz;