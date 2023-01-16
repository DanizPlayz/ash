const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const config = require("../config.js")

module.exports.config = {
  name: "stats",
  description: "Melihat satatistics dari bot",
  usage: `${config.prefix}statistics`,
  aliases: ["stats", "sts", "statistic"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["SEND_MESSAGES"]
  
}

module.exports.run = async (bot, args, message, settings) => {
 

let cpuLol;

  
  
  
  cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
 let embedstats = new Discord.MessageEmbed()
 .setAuthor(bot.user.username + " " + settings.botVersion, bot.user.displayAvatarURL())
 .setColor(settings.defaultColor)
.setDescription(`
**
\`\`\`css

 ❯ Memory Usage ≡ ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
 ❯ CPU Usage ≡ ${percent.toFixed(2)}% 
 ❯ Uptime ≡ ${duration} 
 ❯ Platform ≡ ${os.platform()} 
 ❯ Arch ≡ ${os.arch()} 
 ❯ Discord.js ≡  ${version} 
 ❯ Node.js ≡ ${process.version}
 ❯ Servers ≡ ${bot.guilds.cache.size.toLocaleString()} 
 ❯ Channels ≡ ${bot.channels.cache.size.toLocaleString()}
 ❯ Users ≡ ${bot.users.cache.size.toLocaleString()} 

\`\`\`
**
`)
    

      message.channel.send({embeds: [embedstats]})
   
    });
  
  
  
  

  
}