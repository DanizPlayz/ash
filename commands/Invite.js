const discord = require("discord.js");
const config = require("../config.js")

module.exports.config = {
  name: "invite",
  description: "Invite link untuk bot",
  usage: `${config.prefix}invite`,
  aliases: ["invt"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["SEND_MESSAGES"]
  
}

module.exports.run = async (bot, args, message, settings) => {

const embed = new discord.MessageEmbed()
.setDescription(`**Wani Piro?**`)
.setColor(config.defaultColor)
message.channel.send({embeds: [embed]})
}