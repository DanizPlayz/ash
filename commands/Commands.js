
const discord = require("discord.js");
const config = require("../config.js")
const emote = require("../emoji.js")


module.exports.config = {
  name: "commands",
  description: "commands list",
  usage: `${config.prefix}commands`,
  aliases: ["cmds"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["SEND_MESSAGES"]
  
}

module.exports.run = async (bot, args, message, settings) => {

    let ebs = new discord.MessageEmbed()
      .setColor(settings.defaultColor)
      .setTitle(`${emote.tools} Daftar Commands`)
  

.addFields(
  
{name: `**[ 📜 Basic ]**`, value: `
> **\`${config.prefix}stats\`**
> **\`${config.prefix}invite\`**
━━━━━
`, inline: true},
{name: `**[ ${emote.shield} Auto Moderation ]**`, value: `
> **\`${config.prefix}invitelinkfilter\`**
 > **\`${config.prefix}blacklistword\`**
 > **\`${config.prefix}selfbotfilter\`**
 > **\`${config.prefix}autokick\`**
 > **\`${config.prefix}nsfwfilter\`**
 > **\`${config.prefix}logging\`**
 ━━━━━━━━━━
`, inline: true},
{name: `**[ ${emote.banned} Admin ]**`, value:  `
> **\`${config.prefix}config\`**
> **\`${config.prefix}nuke\`**
> **\`${config.prefix}viewperm\`**
> **\`${config.prefix}warn\`**
━━━━━━
`, inline: true}

)


.setDescription(`
 **[ ${emote.info} Info ]**
  > *gunakan* **\`${config.prefix}help <nama commands>\`** 
 > *untuk info lebih detail dari command itu*
━━━━━
`)


//       .setDescription(`

// **[ [<:info:719227799591977071>](https://cdn.discordapp.com/attachments/769221827733094430/769221902437974017/EjtdDCrVkAA9jSw.jpg) Info ]**
// > *gunakan* **\`${config.prefix}help <nama commands>\`** 
// > *untuk info lebih detail dari command itu*
// ━━━━━━━━━
// **[ <:papers:814031776145735720> Basic ]**
// > **\`${config.prefix}stats\`**
// > **\`${config.prefix}invite\`**
// ━━━━━━━━━
// **[ <:Hammers:814029893502763008> Admin ]**
// > **\`${config.prefix}config\`**
// > **\`${config.prefix}nuke\`**
// > **\`${config.prefix}viewperm\`**
// ━━━━━━━━━
// **[ <:protection:814031211244683275> Auto Moderation ]**
// > **\`${config.prefix}invitelinkfilter\`**
// > **\`${config.prefix}blacklistword\`**
// > **\`${config.prefix}selfbotfilter\`**
// > **\`${config.prefix}autokick\`**
// > **\`${config.prefix}nsfwfilter\`**
// > **\`${config.prefix}logging\`**
// ━━━━━━━━━
// **[ ⭐ Social Media ]**
// > **\`${config.prefix}instagram\`**
// > **\`${config.prefix}instagramlastpost\`**
// > **\`${config.prefix}tiktok\`**
// > **\`${config.prefix}twitter\`**
// ━━━━━━━━━
// fitur memang sedikit
// tapi **setiap fitur** dibuat sampai benar2 **bekerja**, 
// siap untuk **digunakan** dan **berguna**
// `)
  .setFooter({text: `
  fitur memang sedikit 
  tapi setiap fitur dibuat sampai benar2 bekerja, 
  siap untuk digunakan dan berguna
  
  [ Dibuat Oleh KabirEskobar Dengan Kuota ]
    `})
    message.channel.send({embeds: [ebs]});

  

}
 