const Discord = require("discord.js");
const config = require("../config.js")
const emote = require("../emoji.js")


  module.exports.config = {
  name: "viewperm",
  description: "Melihat permission yang dimiliki member",
  usage: `${config.prefix}viewperm`,
  aliases: ["vp"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["KICK_MEMBERS"]
  
}

module.exports.run = async (bot, args, message, settings) => {
let YES = emote.check
  let NO = emote.cross
  
  let memberz = message.mentions.members.first()
  if (!memberz) {
    memberz = message.member
  
  } 
  
  
let ADMINISTRATOR = memberz.hasPermission("ADMINISTRATOR") ? YES : NO
let CREATE_INSTANT_INVITE = memberz.hasPermission("CREATE_INSTANT_INVITE") ? YES : NO
let KICK_MEMBERS = memberz.hasPermission("KICK_MEMBERS") ? YES : NO
let BAN_MEMBERS = memberz.hasPermission("BAN_MEMBERS") ? YES : NO
let MANAGE_CHANNELS = memberz.hasPermission("MANAGE_CHANNELS") ? YES : NO
let MANAGE_GUILD = memberz.hasPermission("MANAGE_GUILD") ? YES : NO
let ADD_REACTIONS = memberz.hasPermission("ADD_REACTIONS") ? YES : NO
let VIEW_AUDIT_LOG = memberz.hasPermission("VIEW_AUDIT_LOG") ? YES : NO
let PRIORITY_SPEAKER = memberz.hasPermission("PRIORITY_SPEAKER") ? YES : NO
let VIEW_CHANNEL = memberz.hasPermission("VIEW_CHANNEL") ? YES : NO
//let READ_MESSAGES = memberz.hasPermission("READ_MESSAGES") ? YES : NO
let SEND_MESSAGES = memberz.hasPermission("SEND_MESSAGES") ? YES : NO
let SEND_TTS_MESSAGES = memberz.hasPermission("SEND_TTS_MESSAGES") ? YES : NO
let MANAGE_MESSAGES = memberz.hasPermission("MANAGE_MESSAGES") ? YES : NO
let EMBED_LINKS = memberz.hasPermission("EMBED_LINKS") ? YES : NO
let ATTACH_FILES = memberz.hasPermission("ATTACH_FILES") ? YES : NO
let READ_MESSAGE_HISTORY = memberz.hasPermission("READ_MESSAGE_HISTORY") ? YES : NO
let MENTION_EVERYONE = memberz.hasPermission("MENTION_EVERYONE") ? YES : NO
let USE_EXTERNAL_EMOJIS = memberz.hasPermission("USE_EXTERNAL_EMOJIS") ? YES : NO
//let EXTERNAL_EMOJIS = memberz.hasPermission("EXTERNAL_EMOJIS") ? YES : NO
let CONNECT = memberz.hasPermission("CONNECT") ? YES : NO
let SPEAK = memberz.hasPermission("SPEAK") ? YES : NO
let MUTE_MEMBERS = memberz.hasPermission("MUTE_MEMBERS") ? YES : NO
let DEAFEN_MEMBERS = memberz.hasPermission("DEAFEN_MEMBERS") ? YES : NO
let MOVE_MEMBERS = memberz.hasPermission("MOVE_MEMBERS") ? YES : NO
let USE_VAD = memberz.hasPermission("USE_VAD") ? YES : NO
let CHANGE_NICKNAME = memberz.hasPermission("CHANGE_NICKNAME") ? YES : NO
let MANAGE_NICKNAMES = memberz.hasPermission("MANAGE_NICKNAMES") ? YES : NO
let MANAGE_ROLES = memberz.hasPermission("MANAGE_ROLES") ? YES : NO
let MANAGE_ROLES_OR_PERMISSIONS = memberz.hasPermission("MANAGE_ROLES_OR_PERMISSIONS") ? YES : NO
let MANAGE_WEBHOOKS = memberz.hasPermission("MANAGE_WEBHOOKS") ? YES : NO
let MANAGE_EMOJIS = memberz.hasPermission("MANAGE_EMOJIS") ? YES : NO




let mm = new Discord.MessageEmbed()
.setTitle(`${memberz.user.tag} Permission`)
.setColor(config.defaultColor)
.setDescription(`
**Administrator**:   [ **${ADMINISTRATOR}** ]
**Create Instant Invite**:   [ **${CREATE_INSTANT_INVITE}** ]
**Kick Members**:   [ **${KICK_MEMBERS}** ]
**Ban Members**:   [ **${BAN_MEMBERS}** ]
**Manage Channels**:   [ **${MANAGE_CHANNELS}** ]
**Manage Guild**:    [ **${MANAGE_GUILD}** ]
**Add Reactions**:   [ **${ADD_REACTIONS}** ]
**View Audith Log**:   [ **${VIEW_AUDIT_LOG}** ]
**Priority Speaker**:   [ **${PRIORITY_SPEAKER}** ]
**View Channel**:   [ **${VIEW_CHANNEL}** ]
**Send Messages**:   [ **${SEND_MESSAGES}** ]
**Send Tts Messages**:   [ **${SEND_TTS_MESSAGES}** ]
**Manage Messages**:   [ **${MANAGE_MESSAGES}** ]
**Embed Links**:   [ **${EMBED_LINKS}** ]
**Attach Files**:   [ **${ATTACH_FILES}** ]
**Read Message History**  :   [ **${READ_MESSAGE_HISTORY}** ]
**Mention Everyone**:   [ **${MENTION_EVERYONE}** ]
**Use External Emoji**:   [ **${USE_EXTERNAL_EMOJIS}** ]
**Connect**:   [ **${CONNECT}** ]
**Speak**:   [ **${SPEAK}** ]
**Mute Members**:   [ **${MUTE_MEMBERS}** ]
**Deafen Members**:   [ **${DEAFEN_MEMBERS}** ]
**Move Members**:   [ **${MOVE_MEMBERS}** ]
**Use Vad**:   [ **${USE_VAD}** ]
**Change NickName**:   [ **${CHANGE_NICKNAME}** ]
**Manage NickNames**:   [ **${MANAGE_NICKNAMES}** ]
**Manage Roles**:   [ **${MANAGE_ROLES}** ]
**Manage Roles Or Permissions**:   [ **${MANAGE_ROLES_OR_PERMISSIONS}** ]
**Manage WebHooks**:   [ **${MANAGE_WEBHOOKS}** ]
**Manage Emojis**:   [ **${MANAGE_EMOJIS}** ]

`)
.setFooter(`${bot.user.username} Permission Viewer`)
message.channel.send(mm)
}
    
  
  

  
  
  
  


