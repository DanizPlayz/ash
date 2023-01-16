const bookman = require("../bookman.js")
const discord = require("discord.js")
const config = require("../config.js")
const emote = require("../emoji.js")

module.exports = async function DanizPlayz(message, judul, deskripsi) {

const EMBED = new discord.MessageEmbed().setColor(config.defaultColor)
let LoggingChannel = await bookman.guildSettings.fetch(`${message.guild.id}.logging.channelID`)


EMBED.setTitle(`${emote.alert} **Error ${judul}**`)
EMBED.setDescription(`${deskripsi}`)

if(!LoggingChannel) return message.channel.send(EMBED)

return message.guild.channels.cache.get(LoggingChannel).send(EMBED);


}

