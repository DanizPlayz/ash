const bb = require("./BetterBookman.js")
const discord = require("discord.js")
const config = require("../config.js")
const GB = require("./GlobalBansFunction.js")
const log = require("./logging.js")

async function Ku_pilih_mamah_muda(member) {

let status = await bb.fetch("guildSettings",`${member.guild.id}.antiglobalbans.status`)

if(!status) status = "TURN_OFF";
if(member.user.bot == true) return false;
let result = await GB.cari(member.id)

if(status == "TURN_ON") {

if(!result) {
log(member, "AntiGlobalBans", `
**Member Joined:** ${member.user.tag}
Member aman karena ${member.user.tag} tidak terdaftar di dalam GlobalBans lists.
 `)


} else {

await member.ban("Terdaftar di globalban list").catch(err => {

log(member, "Error AntiGlobalBans", `
  Tidak bisa Ban:
 **${member.user.username}**#${member.user.discriminator} karena akun nya Terdaftar di dalam GlobalBans lists `)

}).then(es => {
log(member, "AntiGlobalBans", `
**Member Joined:** ${member.user.tag}
${usersTerTag.tag} terdaftar dalam ${bot.user.username} ban list! ⚠️,
**karena dia telah melakukan:** ${result.alasan},
**terdaftar di ban list sejak:**
${result.dibansejak}

**⚠️ Aksi telah dilaksanakan kan ⚠️**
 `)
})



    }
}
if(status == "TURN_OFF") {
if(!result) {

log(member, "AntiGlobalBans", `
**Member Joined:** ${member.user.tag}
Member aman karena ${member.user.tag} tidak terdaftar di dalam GlobalBans lists.
 `)

} else {

log(member, "AntiGlobalBans", `
**Member Joined:** ${member.user.tag}
${usersTerTag.tag} terdaftar dalam ${bot.user.username} ban list! ⚠️,
**karena dia telah melakukan:** ${result.alasan},
**terdaftar di ban list sejak:**
${result.dibansejak}

**⚠️ Aksi dibutuhkan ⚠️**
 `)

}


}


}

module.exports = Ku_pilih_mamah_muda;