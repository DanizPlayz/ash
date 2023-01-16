const discord = require("discord.js");
const config = require("../config.js")

module.exports.config = {
  name: "reload",
  description: "reload files",
  usage: "KEPO LU NJIR",
  aliases: ["r"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["DEVELOPER"]
  
}

module.exports.run = async (bot, args, message, settings) => {

message.channel.send("Reloaded")
  require("../cmdLoader.js")(bot)
}