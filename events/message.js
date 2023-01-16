const ms = require('ms');
const bookman = require('../bookman.js');
const sbf = require('../module/SelfbotFilter.js');
const ilf = require('../module/InviteLinkFilter');
const blw = require('../module/BlacklistWord.js');
const cmdManager = require('../cmdManager.js');
const AntiSpams = require('../module/AntiSpamModule.js');



module.exports = bot => {
	bot.on('messageCreate', async message => {
		//======SelfBot Detection=====
		let selfbotdetect = null === message.nonce && message.attachments.size <= 0 && !message.author.bot && message.guild,
		res;
	selfbotdetect && (res = !0), selfbotdetect || (res = !1), message.selfbot = res;
		//=========================

	// 	let selfbotdetect =
	// 	message.nonce === null &&
	// 	message.attachments.size <= 0 &&
	// 	!message.author.bot &&
	// 	message.guild;
	// let res;
	// if (selfbotdetect) res = true;
	// if (!selfbotdetect) res = false;
	// message.selfbot = res;



		let isSBF = await sbf(message);

		let isSpam = await AntiSpams(message);

		let isCmd = await cmdManager(message, bot);
		if (isCmd === false) {
			
			let isILF = await ilf.messageEvent(message);
			if (isILF === false) {
				let isBLW = await blw.messageEvent(message);
			}
		}
	});
};
