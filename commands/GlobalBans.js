const discord = require("discord.js");
const bb = require("../module/BetterBookman.js")
const log = require("../module/logging.js")
const GB = require("../module/GlobalBansFunction.js")
const bm = require("../bookman.js")
const config = require("../config.js")
//GlobalBansFunction.js
module.exports.config = {
  name: "globalbans",
  description: "Melarang akun2 yang terdaftar didalam GlobalBan list masuk ke server",
  usage: `${config.prefix}globalbans`,
  aliases: ["gb"],
  requiredperm: ["SEND_MESSAGES"],
  permission: ["DEVELOPER"]
  
}

module.exports.run = async (bot, args, message, settings) => {



let Pilihan = args[0];
if(!Pilihan) return message.reply(`Mungkin \`${config.prefix}help antiglobalbans\` akan membantu.`)


console.log(Pilihan)
//agb add userOrDd reasons 

if(Pilihan == "add") {
let usersTerTag = message.mentions.users.first()
if(usersTerTag.bot) return message.channel.send("-_-")

let theID = usersTerTag.id
args[1] = usersTerTag.id
if(!usersTerTag) theID = args[1]
if(!args[1]) return message.channel.send("Invalids Inputs")

let newArgs = args.splice(0, 2); 

let theAlasan = args.join(newArgs.join(" "));
if(!theAlasan) return message.channel.send("Tidak ada alasan diberikan")


let emb = new discord.MessageEmbed()
let Info = await GB.cari(theID)
if(!!Info) return message.channel.send("Sudah ada")



emb.setDescription(`
DitambahKan kedalam global bans lits
**ID: **${theID}
**Reason :**${theAlasan}
`)
 await GB.tambah(theID, theAlasan).then(asas => {
message.channel.send(emb)
 }).catch(err => {console.log(err)})




}



  
}