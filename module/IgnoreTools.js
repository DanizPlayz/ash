const db = require('../bookman.js')
const discord = require('discord.js')
const settings = require('../config.js')
const dbh = require('./BetterBookman.js')
const emoji = require('../emoji.js')
const log = require("./logging.js")
async function MamahMuda(message, namafitur, anothernamafitur) {
let channelArray = []
let alreadyChannelArray = []

let roleArray = []
let alreadyRoleArray = []

let memberArray = []
let alreadyMemberArray = []

let lastArray = []
let alreadyLastArray = []  
  
  //push
  

//CHANNEL CHECK =====================
 //if(!message.mentions.channels.first()) return message.channel.send('No Channel Mntioned')

// if(!db.guildSettings.has(`${message.guild.id}.${namafitur}.ignore.channels`)) {
//   await db.guildSettings.set(`${message.guild.id}.${namafitur}.ignore.channels`, [])
// }
  

if(!db.guildSettings.has(`${message.guild.id}.${namafitur}.ignore.channels`)) {
  await db.guildSettings.set(`${message.guild.id}.${namafitur}.ignore.channels`, [])
}

let ignoredChan = await dbh.fetch('guildSettings', `${message.guild.id}.${namafitur}.ignore.channels`)
if(!ignoredChan) ignoredChan = []
message.mentions.channels.forEach(ch => {
  if(!ignoredChan.includes(ch.id)){
   channelArray.push(ch.id)
   lastArray.push(`<#${ch.id}>`)
 } 
  
  if(ignoredChan.includes(ch.id)){
    alreadyChannelArray.push(ch.id)
    alreadyLastArray.push(`<#${ch.id}>`)
 } 
})
      
if(channelArray.length > 0) {
channelArray.forEach(async ass => {
//await dbh.push("guildSettings", `${message.guild.id}.${namafitur}.ignore.channels`, ass)
await db.guildSettings.push(`${message.guild.id}.${namafitur}.ignore.channels`, ass) 
channelArray = []
})}
      if(alreadyChannelArray.length > 0) {
   let theChan = await db.guildSettings.fetch(`${message.guild.id}.${namafitur}.ignore.channels`)
        alreadyChannelArray.forEach(async ass => {
        theChan.splice( theChan.indexOf(ass), 1);
         })
    await db.guildSettings.set(`${message.guild.id}.${namafitur}.ignore.channels`, theChan)
      }
//END CHANNEL CHECK =================
      
      
//ROLE CHECK =====================    
 if(!db.guildSettings.has(`${message.guild.id}.${namafitur}.ignore.roles`)) {
  await db.guildSettings.set(`${message.guild.id}.${namafitur}.ignore.roles`, [])
}
let ignoredRole = await db.guildSettings.fetch(`${message.guild.id}.${namafitur}.ignore.roles`)
message.mentions.roles.forEach(role => {
  
  if(!ignoredRole.includes(role.id)){
   roleArray.push(role.id)
   lastArray.push(`<@&${role.id}>`)
 } 
  
  if(ignoredRole.includes(role.id)){
    alreadyRoleArray.push(role.id)
    alreadyLastArray.push(`<@&${role.id}>`)
 } 
})      
if(roleArray.length > 0) {
roleArray.forEach(async ass => {
await db.guildSettings.push(`${message.guild.id}.${namafitur}.ignore.roles`, ass) 
roleArray = []
})}      
         if(alreadyRoleArray.length > 0) {
   let theRole = await db.guildSettings.fetch(`${message.guild.id}.${namafitur}.ignore.roles`)
        alreadyRoleArray.forEach(async ass => {
        theRole.splice( theRole.indexOf(ass), 1);
         })
    await db.guildSettings.set(`${message.guild.id}.${namafitur}.ignore.roles`, theRole)
      }
//END ROLE CHECK =================      
      
      
//MEMBER CHECK =================      
 if(!db.guildSettings.has(`${message.guild.id}.${namafitur}.ignore.members`)) {
  await db.guildSettings.set(`${message.guild.id}.${namafitur}.ignore.members`, [])
}    
let ignoredMember = await db.guildSettings.fetch(`${message.guild.id}.${namafitur}.ignore.members`)
message.mentions.members.forEach(member => {
  if(member.bot) return;
  if(!ignoredMember.includes(member.id)){
   memberArray.push(member.id)
   lastArray.push(`<@${member.id}>`)
 } 
  
  if(ignoredMember.includes(member.id)){
    alreadyMemberArray.push(member.id)
    alreadyLastArray.push(`<@${member.id}>`)
 } 
})
if(memberArray.length > 0) {
memberArray.forEach(async ass => {
await db.guildSettings.push(`${message.guild.id}.${namafitur}.ignore.members`, ass) 
memberArray = []
})}      
        if(alreadyMemberArray.length > 0) {
   let theMember = await db.guildSettings.fetch(`${message.guild.id}.${namafitur}.ignore.members`)
        alreadyMemberArray.forEach(async ass => {
        theMember.splice( theMember.indexOf(ass), 1);
         })
    await db.guildSettings.set(`${message.guild.id}.${namafitur}.ignore.members`, theMember)
      }
      
//END MEMBER CHECK =================      
    
if(lastArray.length == 0 && alreadyLastArray.length == 0) return console.log(alreadyLastArray.length + " " + lastArray.length)

      
 //REST ===================== 
  const PapahMuda = new discord.MessageEmbed().setColor(settings.defaultColor)
   if(lastArray.length > 0) {
  let stris = ``
lastArray.forEach(ass => {
stris+= ass

}) 
     PapahMuda.addFields({name: `${emoji.plus} DiTambahkan`, value: stris, inline: true}) 
//    message.channel.send(`${stris} di tambahkan kedalam list ignore`)
     lastArray = []
  }    
  if(alreadyLastArray.length > 0) {
    
    let stris = ``
alreadyLastArray.forEach(ass => {
stris+= ass
  
  })
     PapahMuda.addFields({name: `${emoji.minus} DiHapus`, value: stris, inline: true}) 
 //  message.channel.send(`${stris} sudah didalam list ignore`)    
   alreadyLastArray = []   
      
    }
  
   
  
   return message.channel.send({content: `${emoji.settings} **${anothernamafitur} Ignore List**`, embeds: [PapahMuda]}).then(async Asede => {

     if(db.guildSettings.has(`${message.guild.id}.logging.channelID`)) {
PapahMuda.setTitle(emoji.notification + " " + anothernamafitur + " " + "Ignore List Berubah")
PapahMuda.addFields({name: "Di ubah oleh", value: `${message.author.username}#${message.author.discriminator}`})
  var theChan = await db.guildSettings.fetch(`${message.guild.id}.logging.channelID`)   
     let chan = message.guild.channels.cache.get(`${theChan}`)
    chan.send({embeds: [PapahMuda]})
   }
     




   })
  

}
module.exports = MamahMuda;