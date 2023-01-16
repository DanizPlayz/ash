const settings = require("./config.js");
const discord = require("discord.js");
var commandcooldown = new Set();



async function commandHandler(message, bot) {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let detikcooldown = settings.commandCooldown;

  let selfbotdetect =
    message.nonce === null &&
    message.attachments.size <= 0 &&
    !message.author.bot &&
    message.guild;
  let res;
  if (selfbotdetect) res = true;
  if (!selfbotdetect) res = false;
  message.selfbot = res;

  let prefix = settings.prefix;
  let msg = message.content.toLowerCase();
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();

  if (settings.owner.includes(message.author.id)) detikcooldown = 0;

 
  if (!msg.startsWith(prefix)) return false;

  //================ Command Cooldown ================
  // if (commandcooldown.has(message.author.id)) {
  //   return message.reply(
  //     `**? Kamu terlalu cepat. tunggu ${detikcooldown} detik**`
  //   );

  // }
  // commandcooldown.add(message.author.id);
  // setTimeout(() => {
  //   commandcooldown.delete(message.author.id);
  // }, detikcooldown * 1000);
  //================ End Command Cooldown ================
  
  bot.notowner = !settings.owner.includes(message.author.id);

 
  try {
    let eb = new discord.MessageEmbed()
      .setColor(settings.defaultColor)
      .setDescription("commands tidak dikenal");
  

    // ================ MAIN COMMANDS ================
    if (msg.startsWith(prefix)) {
      let commandfile =
        bot.commands.get(cmd) ||
        bot.commands.get(bot.aliases.get(cmd));

if (!commandfile) return message.channel.send("Commands tidak diketahui");    
       
      
      // Start Check permission member ================
      let temp = [];
      if (commandfile.config.permission !== "DEVELOPER") {
        commandfile.config.permission.forEach(perm => {
          if (!message.member.permissions.has(perm)) temp.push(perm);
        });
      }
      if (commandfile.config.permission == "DEVELOPER") {
        if (!settings.owner.includes(message.author.id))
          return console.log('lul')
      }

      if (temp.length > 0)
        return message.channel.send(
          `Kamu membutuhkan: ${temp.join(", ")}`
        );
      // End Check permission member ================

      // Start Check permission bot ================
      let temp2 = [];
      commandfile.config.requiredperm.forEach(perms => {
        if (
          !message.guild.members.cache
            .get(`${bot.user.id}`)
            .permissions.has(perms)
        )
          temp2.push(perms);
      });
      if (temp2.length > 0)
        return message.channel.send(
          message.getlang(`Missing permission: ${temp2.join(", ")}`)
        );
      //End Check permission bot ================
      settings.bookman = require("./bookman.js")
      if (commandfile) return commandfile.run(bot, args, message, settings).then(a => {console.log(`${message.author.username}#${message.author.discriminator} menggunakan command: ${message.content}`)})
    
    }
  } catch (e) {
    console.log("Command Handler Error: " + e.stack);
  }
}
module.exports = commandHandler;
