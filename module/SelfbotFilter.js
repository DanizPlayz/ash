const bookman = require("../bookman.js")
const log = require("./logging.js")

async function DanizPlayz(message) {


//console.log("Sampe")

if (message.author.bot) return null;
if (message.channel.type === "dm") return null;

let status = await bookman.guildSettings.fetch(`${message.guild.id}.selfbot_filter.status`)

let isSBF = true;

if(!status) status = "TURN_OFF";
if(status == "TURN_OFF") isSBF = false;
//if(message.selfbot === false) isSBF = false;

if(isSBF == false) return false


if(message.selfbot == true) {
if(!message.content) return false;
let username = message.author.username
let tag = message.author.discriminator

await message.member.ban().then(async a => {
	await message.delete().then(async a=> {

return message.channel.send(`> **SelfbotFilter:** **banned** **${username}**#${tag} karena terdeteksi selfbot`).then(a => {
log(message, "SelfBot Terdeteksi", `
	**banned** **${username}**#${tag} 
	karena terdeteksi **SelfBot**`);

}) 

	}).catch(err => {console.log("SelfBotFilter 2: " + err.message)})
}).catch(err => {console.log("SelfBotFilter 1: " + err.message)})




console.log(`**banned** **${username}**#${tag} karena terdeteksi selfbot`)





 
}

}

module.exports = DanizPlayz;