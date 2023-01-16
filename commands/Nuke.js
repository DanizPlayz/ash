const Discord = require("discord.js");
const config = require("../config.js")
const log = require("../module/logging.js")
const emote = require("../emoji.js")

module.exports.config = {
  name: "nuke",
  description: `Hapus semua message di channel
  **NOTE:**
  Melakukan ini tidak bisa di undo atau mengembalikan semua message yang sudah dihapus
  jadi pikirkan baik-baik
  `,
  usage: `${config.prefix}nuke konfirmasi`,
  aliases: ["nuke"],
  requiredperm: ["MANAGE_CHANNELS"],
  permission: ["MANAGE_GUILD", "READ_MESSAGE_HISTORY", "MANAGE_CHANNELS"]
  
}

module.exports.run = async (bot, args, message, settings) => {

// let Pilihan = args[0]
// if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help nuke\` akan membantu.`)




const EMBED = new Discord.MessageEmbed().setColor(config.defaultColor)
.setTitle(`${emote.alert} **Konfirmasi**`)
.setDescription(`Channel ini akan di nuke/delete all message, dan tidak bisa di **kembalikan**
klik ${emote.check} Untuk Konfirmasi.
Klik ${emote.cross} Untuk batal`)

const Filter = (reaction, user) => user.id == message.author.id;
const reactionMessage = await message.channel.send({embeds: [EMBED]});
await reactionMessage.react("1051337746473566250");
await reactionMessage.react("1051337856645337088");

reactionMessage.awaitReactions({Filter, max: 1, time: 30_000, errors: ["time"]}).then(collected => {
	// Getting the first reaction in the collection.
	const reaction = collected.first();
	
	// Creating a switch statement for reaction.emoji.name.
	switch (reaction.emoji.id) {
		case "1051337746473566250":


      reactionMessage.reactions.removeAll()
nuke(message)

			break
	}
	switch (reaction.emoji.id) {
		case "1051337856645337088":
let EMBED2 = new Discord.MessageEmbed().setColor(config.defaultColor)
.setDescription(`${emote.cross} **Nuke Dibatalkan.**`)
reactionMessage.edit(EMBED2)
reactionMessage.reactions.removeAll()

			break
	}

})



} 



async function nuke(message) {
  if(!message.channel.deletable) return message.channel.send(`**aku Tidak Memiliiki Izin Untuk Nuke:** ${message.channel}`)  

  let embeds = new Discord.MessageEmbed()
  .setDescription(`**Loading To Nuke** ${message.channel}`)
  .setColor(process.env.COLOR)
  
  let msgsz = await message.channel.send({embeds: [embeds]}).catch(err => {
  console.log(err.message)
  })
   await msgsz.react("🕙")
   await msgsz.react("🕜")
   await msgsz.react("🕑")
   await msgsz.react("⚠")
  
  let smsm = message.channel.name
  let posisi = message.channel.position
  let kategori = message.channel.parent.id
  let topic = message.channel.topic
  
  let eme = new Discord.MessageEmbed()
  .setTitle(`👌 channel ini Berhasil Di Nuke`)
  .setImage(`https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif`)
  .setFooter({text: `Di Nuke oleh ${message.author.username}`})
  .setColor(process.env.COLOR)
    
  
    
     
  setTimeout( async () => {
   let currentchan = await message.channel.clone()
   message.channel.delete(`Channel Nuked`).catch(err => {"as"})
  
      await log(message, "Channel Nuked", `
      Channel <#${currentchan.id}> telah di Nuke oleh ${message.author.tag}(<@${message.author.id}>)
      
      `)
      
      await currentchan.setPosition(posisi)
      await currentchan.send({embeds: [eme]})
      
  
   
  
  
  
  
   
   }, 325)
}
  
  
  
  
  
  
