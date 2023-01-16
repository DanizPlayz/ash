const Discord = require("discord.js");
const post = require('snekfetch');
const bookman = require("../bookman.js")
const bb = require("../module/BetterBookman.js")
const settings = require("../config.js")
const GB = require("../module/GlobalBansFunction.js")
const logging = require("../module/logging.js")
const ms = require("ms")
module.exports.config = {
  name: "eval",
  description: "erere",
  usage: "erere",
  aliases: ["e"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["DEVELOPER"]
  
}

module.exports.run = async (bot, args, message, settings) => {


const embed = new Discord.MessageEmbed()
.setColor(settings.defaultColor)
.addFields({name: '📥 INPUT', value: '```js\n' + args.join(" ") + '```'})
.setTimestamp()
.setFooter({text: "DanizPlayz Eval"})
try {
  
const code = args.join(" ");
if (!code) return;
let evaled;
if (code.includes("token") || code.includes("TOKEN")) {
evaled = 'Tidak Semudah Itu Roberto!';
} else {
evaled = eval(code);
}
if (typeof evaled !== "string")
evaled = require('util').inspect(evaled, { depth: 0});
let output = clean(evaled);
      if (output.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(output);
          embed.addFields({name: '📤 OUTPUT', value: `https://www.hastebin.com/${body.key}.js`});
      } else {
          embed.addFields({name: '📤 OUTPUT', value: '```js\n' + output + '```'});
      }
      message.channel.send({embeds: [embed]});
} catch (e) {
let error = clean(e);
if (error.length > 1024) {
const { body } = await post('https://www.hastebin.com/documents').send(error);
embed.addField('⁉ ERROR', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addFields({name: '⁉ ERROR', value: '```js\n' + error + '```'}); 
      }
      message.channel.send({embeds: [embed]});
}
  // });
}


function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
  
  
}
