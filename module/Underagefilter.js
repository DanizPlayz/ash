
module.exports = bot => {

  bot.on("guildMemberAdd", async (member) => {
    this.db = bot.db
    this.UnderageFilter = await this.db.fetch(`UnderageFilter.${member.guild.id}.OnOff`);  
    if(this.UnderageFilter == false) return null;
    if(this.UnderageFilter == true) {
    this.Discord = require('discord.js')
    this.ms = require('ms')
    this.settings = require('../zivia/config/settings.json')
    this.emoji    = require('../zivia/emoji/emoji.json')
      
let userDat = this.ms(this.ms(Date.now()- member.user.createdAt))
let BatasWaktu = this.ms('2 days')

//2.5 hrs

if(BatasWaktu > userDat) return this.kicks(member,
  this.Discord,
  this.settings,
  this.emoji,
  bot)
      

console.log(userDat)






    }
    
  });
  
}

exports.kicks = (member, Discord, settings, emoji, bot) => {

this.embed = new Discord.RichEmbed()
  .setColor(settings.embedColor)
  .setTitle(emoji.shield + " **UnderageFilter**")
  .setFooter(bot.dats)
  .setDescription(`**${member.user.username}**#${member.user.discriminator}, 
Maaf Kamu telah di kick dari **${member.guild.name}** karena akun kamu **berumur di bawah 2 hari**
sedangkan **${member.guild.name}** memiliki **UnderageFilter** di Aktifkan
coba lagi ke\'esokan harinya`)
  
  
member.send(this.embed).then(TT => {
  
member.kick(`UnderageFilter: ${member.user.tag} masih berumur di bawah 2 hari`)
  
})



}