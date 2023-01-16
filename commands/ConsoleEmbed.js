const discord = require("discord.js");
const settings = require("../config.js")

module.exports.config = {
  name: "consoleembed",
  description: "KEPO LU",
  usage: "KEPO LU",
  aliases: ["cnslemb"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["DEVELOPER"]
  
}

module.exports.run = async (bot, args, message, settings) => {


  this.e = new discord.MessageEmbed()
  .setColor(settings.defaultColor)
  .setDescription(`Masukan ConsoleCommands`)
  
let ConsoleCommands = args.join(" ");
if(!ConsoleCommands) return message.channel.send(this.e)
  this.exec = require('child_process').exec;
  this.exec(`${ConsoleCommands}`, (error, stdout) => {
      const response = (error || stdout);
    
    
    this.emb = new discord.MessageEmbed()
    .setColor(settings.defaultColor)
    .setTitle(`**>_ ${ConsoleCommands}**`)
    .setDescription(`\`\`\`js\n${response}\`\`\``)
    
    
      message.channel.send(this.emb)
  })
  
  


  
}