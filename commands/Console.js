const discord = require("discord.js");
const settings = require("../config.js")

module.exports.config = {
  name: "console",
  description: "KEPO LU",
  usage: "KEPO LU",
  aliases: ["cnsl"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["DEVELOPER"]
  
}

module.exports.run = async (bot, args, message, settings) => {


  this.e = new discord.MessageEmbed()
  .setColor(settings.defaultColor)
  .setDescription(`Masukan ConsoleCommands`)
  
let ConsoleCommands = args.join(" ");
if(!ConsoleCommands) return message.channel.send({embeds: [this.e]})
  this.exec = require('child_process').exec;
  this.exec(`${ConsoleCommands}`, (error, stdout) => {
      const response = (error || stdout);
    
    console.log(`[RUNNING COMMANDS][ ${ConsoleCommands} ]
      ${response}`)
    
      message.channel.send("RUNNED")
  })
  
  


  
}