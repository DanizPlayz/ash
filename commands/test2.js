const discord = require('discord.js');
const config = require('../config.js');
const bb = require("../module/BetterBookman.js");
const warn = require("../module/WarningSystem.js");
const emote = require("../emoji.js")
const Captcha = require("captcha-generator-alphanumeric").default

module.exports.config = {
	name: 'test2',
	description: `H`,
	usage: `${config.prefix}t`,
	aliases: ['t2'],
	requiredperm: ['MANAGE_CHANNELS'],
	permission: ['SEND_MESSAGES']
};

module.exports.run = async (bot, args, message, settings) => {

 	let captcha = await new Captcha();
// 	let attach = await new discord.MessageAttachment(captcha.JPEGStream, "captcha.jpeg")

// let ebs = new discord.MessageEmbed()
// .setImage("attachment://captcha.jpeg")

// message.channel.send({embeds: [ebs], files: [attach]});
	// message.channel.send({content:captcha.value, files: [attach.attachment]});


// const row2 = new discord.MessageActionRow()
// .addComponents(
// 		new discord.MessageButton()
// 		.setCustomId('verify')
// 		.setLabel('Verify')
// 		.setStyle('SECONDARY'),
	
// );

// let beb = new discord.MessageEmbed()
// .setTitle("Verify dirimu")
// .setDescription("Klik \"Verify\" Untuk verifikasi")
// message.channel.send({embeds: [beb], components: [row2]})
let alphanum = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    
async function fakecaptcha() {
	let result = await alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)]
	return result;
	}
let rows = [{
    label: fakecaptcha(),
    value: 'wrong1',
},
{
    label: fakecaptcha(),
    value: 'wrong2',
},
{
    label: captcha.value,
    value: 'right',
},
{
    label: fakecaptcha(),
    value: 'wrong3',
}]
rows.sort(() => Math.random() - 0.5);
console.log(rows)

};
