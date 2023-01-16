const log = require('./logging.js');
const bookman = require('../bookman.js');
const bb = require('./BetterBookman.js');
const config = require('../config.js');
const discord = require('discord.js');
const emote = require("../emoji.js")

async function DetectInviteLink(searchText) {
	var regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|net)|discordapp\.com\/invite)\/.+[a-z]/;
	//  var regex=/(https?:\/\/[^\s]+)/g;
	let result = searchText.match(regex);
	if (!result) return false;
	if (result) {
		return true;
	}
}

module.exports = {
	messageEvent: async function(message) {
		if (message.author.bot) return;
		if (message.channel.type === 'dm') return;
		//console.log

		let isILF = true;

		const status = await bb.fetch(
			'guildSettings',
			`${message.guild.id}.invitelinkfilter.status`
		);

		if (!status) isILF = false;
		if (status == 'TURN_OFF') isILF = false;

		//if(message.member.hasPermission("MANAGE_MESSAGES")) return null;

		//ignored roles
		let ignoredRoles = await bb.fetch(
			'guildSettings',
			`${message.guild.id}.invitelinkfilter.ignore.roles`
		);
		if (!ignoredRoles) ignoredRoles = [];
		if (message.member._roles.some(r => ignoredRoles.includes(r)))
			isILF = false;
		//=================

		//ignored channel
		let ignoredChannels = await bb.fetch(
			'guildSettings',
			`${message.guild.id}.invitelinkfilter.ignore.channels`
		);
		if (!ignoredChannels) ignoredChannels = [];
		if (ignoredChannels.includes(message.channel.id)) isILF = false;
		//=================

		//ignored member
		let ignoredMembers = await bb.fetch(
			'guildSettings',
			`${message.guild.id}.invitelinkfilter.ignore.members`
		);
		if (!ignoredMembers) ignoredMembers = [];
		if (ignoredMembers.includes(message.member.id)) isILF = false;
		//=================

		let text = message.content.toLowerCase().replace(/\s/g, '');

		let Detect = await DetectInviteLink(text);
		if (!Detect) isILF = false;

		let username = message.author.username;
		let tag = message.author.discriminator;

		if (isILF === false) return false;

		if (Detect) {
			await message
				.delete()
				.then(a => {
					return message
						.reply(
							`⚠️ Pesan di hapus karena pesan mu mengandung invite link dan invite link dilarang disini`
						)
						.then(ab => {
							setTimeout(function() {
								ab.delete().catch(err => {});
							}, 5000);

							log(
								message,
								'Message di hapus',
								`
  **hapus pesan dari:** **${username}**#${tag} 
  karena mengandung **Invite Link**
${emote.pesan} Pesan:
\`\`\`
${message.content}
\`\`\`

  `
							);
						});
				})
				.catch(err => {
					console.log(
						`[ERROR] InviteLinkFilter: ${err.message} \n on: ${
							message.guild.name
						}`
					);
				});
		}
	},
	messageEditEvent: async function(oldMessage, newMessage) {
		let message = newMessage;

		if (message.author.bot) return;
		if (message.channel.type === 'dm') return;
		//console.log

		let isILF = true;

		const status = await bb.fetch(
			'guildSettings',
			`${message.guild.id}.invitelinkfilter.status`
		);

		if (!status) isILF = false;
		if (status == 'TURN_OFF') isILF = false;

		//if(message.member.hasPermission("MANAGE_MESSAGES")) return null;

		//ignored roles
		let ignoredRoles = await bb.fetch(
			'guildSettings',
			`${message.guild.id}.invitelinkfilter.ignore.roles`
		);
		if (!ignoredRoles) ignoredRoles = [];
		if (message.member._roles.some(r => ignoredRoles.includes(r.id)))
			isILF = false;
		//=================

		//ignored channel
		let ignoredChannels = await bb.fetch(
			'guildSettings',
			`${message.guild.id}.invitelinkfilter.ignore.channels`
		);
		if (!ignoredChannels) ignoredChannels = [];
		if (ignoredChannels.includes(message.channel.id)) isILF = false;
		//=================

		//ignored member
		let ignoredMembers = await bb.fetch(
			'guildSettings',
			`${message.guild.id}.invitelinkfilter.ignore.members`
		);
		if (!ignoredMembers) ignoredMembers = [];
		if (ignoredMembers.includes(message.member.id)) isILF = false;
		//=================

		let text = message.content.toLowerCase().replace(/\s/g, '');

		let Detect = await DetectInviteLink(text);
		if (!Detect) isILF = false;

		let username = message.author.username;
		let tag = message.author.discriminator;

		if (isILF === false) return false;

		if (Detect) {
			await message
				.delete()
				.then(a => {
					return message
						.reply(
							`⚠️ Pesan di hapus karena pesan mu mengandung invite link dan invite link dilarang disini`
						)
						.then(ad => {
							setTimeout(function() {
								ad.delete().catch(err => {});
							}, 5000);

							log(
								message,
								'Message di hapus',
								`
  **hapus pesan dari:** **${username}**#${tag} 
  karena mengandung **Invite Link**
${emote.pesan} Pesan:
\`\`\`
${message.content}
\`\`\`

  `
							);
						});
				})
				.catch(err => {
					console.log(
						`[ERROR] InviteLinkFilter: ${err.message} \n on: ${
							message.guild.name
						}`
					);
				});
		}
	}
};
