const bb = require("./BetterBookman.js")
const discord = require("discord.js")
const settings = require("../config.js")
const log = require("./logging.js")
let WF = require("./WordFilter.js") 
const ErrorHandler = require("./ErrorHandler.js")
const emote = require("../emoji.js")

module.exports = {
messageEvent: async function(message) {


if (message.author.bot) return false;
if (message.channel.type === "dm") return false;

const blwStatus = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.status`)
if(!blwStatus) return false;
if(blwStatus == "TURN_OFF") return false;


//if(message.member.hasPermission("MANAGE_MESSAGES")) return;

 //ignored roles
  let ignoredRoles = await bb.fetch('guildSettings', `${message.guild.id}.blacklistword.ignore.roles`)
  if(!ignoredRoles) ignoredRoles = [];
  if (message.member._roles.some(r => ignoredRoles.includes(r))) return;
  //=================

  //ignored channel
  let ignoredChannels = await bb.fetch('guildSettings', `${message.guild.id}.blacklistword.ignore.channels`)
  if(!ignoredChannels) ignoredChannels = [];    
  if (ignoredChannels.includes(message.channel.id)) return;
  //=================
  
  //ignored member
  let ignoredMembers = await bb.fetch('guildSettings', `${message.guild.id}.blacklistword.ignore.members`)
  if(!ignoredMembers) ignoredMembers = []
  if(ignoredMembers.includes(message.member.id)) return;
  //=================


const blwList = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.list`)
if(!blwList) blwList = []
if(blwList.length == 0) return;
let text = message.content.toLowerCase().replace(/\s/g,'')


const config = {
    list: blwList,
    cleanWith: "$",
    useRegex: true,
};
const filter = new WF(config);

let isBLW = await filter.isUnclean(text)

let EMBED = new discord.MessageEmbed().setColor(settings.defaultColor)
EMBED.setDescription(`**${message.author.username}**#${message.author.discriminator} **Pesanmu di hapus karena mengandung kata-kata yang di blacklist di server ini**`)

if(isBLW) {
try {


message.delete().catch(err => {ErrorHandler(message, "AntiSpam", err.message)})
message.reply(`⚠️ Pesan di hapus karena pesan mu mengandung kata2 yang di blacklist`).then(as => {

setTimeout(function() {
					as.delete().catch(err => {})
		
				}, 5000);

  log(message, "Blacklistword", `
 **${message.author.username}**#${message.author.discriminator} mengirim pesan yang mengandung kata-kata yang di blacklist

${emote.pesan} **Pesan:** 
 \`\`\` ${message.content} \`\`\`
                      `)
})

	

} catch(err) {
ErrorHandler(message, "BlackListWord", err.message)
}


}

},


messageEditEvent: async function(oldMessage, newMessage) {

let message = newMessage;

if (message.author.bot) return false;
if (message.channel.type === "dm") return false;

const blwStatus = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.status`)
if(!blwStatus) return;
if(blwStatus == "TURN_OFF") return;


 //ignored roles
  let ignoredRoles = await bb.fetch('guildSettings', `${message.guild.id}.blacklistword.ignore.roles`)
  if(!ignoredRoles) ignoredRoles = [];
  if (message.member._roles.some(r => ignoredRoles.includes(r.id))) return;
  //=================

  //ignored channel
  let ignoredChannels = await bb.fetch('guildSettings', `${message.guild.id}.blacklistword.ignore.channels`)
  if(!ignoredChannels) ignoredChannels = [];    
  if (ignoredChannels.includes(message.channel.id)) return;
  //=================
  
  //ignored member
  let ignoredMembers = await bb.fetch('guildSettings', `${message.guild.id}.blacklistword.ignore.members`)
  if(!ignoredMembers) ignoredMembers = []
  if(ignoredMembers.includes(message.member.id)) return;
  //=================


const blwList = await bb.fetch("guildSettings", `${message.guild.id}.blacklistword.list`)
if(!blwList) blwList = []
if(blwList.length == 0) return;
let text = message.content.toLowerCase().replace(/\s/g,'')


const config = {
    list: blwList,
    cleanWith: "$",
    useRegex: false,
};
const filter = new WF(config);

let isBLW = await filter.isUnclean(text)



if(isBLW) {
try {


message.delete().catch(err => {log(message, "Error Blacklistword", `
  Tidak bisa menghapus pesan dari:
 **${message.author.username}**#${message.author.discriminator} karena mengandung kata-kata yang di blacklist

 <:chat:575711253603942401> **Pesan:** 
 \`\`\` ${message.content} \`\`\`
                      `)})
message.reply(`⚠️ Pesan di hapus karena pesan mu mengandung kata2 yang di blacklist`).then(as => {

setTimeout(function() {
					as.delete().catch(err => {})
		
				}, 5000);

  log(message, "Blacklistword", `
 **${message.author.username}**#${message.author.discriminator} mengirim pesan yang mengandung kata-kata yang di blacklist

 <:chat:575711253603942401> **Pesan:** 
 \`\`\` ${message.content} \`\`\`
                      `)
})


} catch(err) {
console.log(`[ERROR] BlacklistWord: ${err.message} \n on: ${message.guild.name}`)
}


}


}



}