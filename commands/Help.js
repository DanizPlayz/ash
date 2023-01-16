const discord = require("discord.js"),
    emote = require("../emoji.js"),
    config = require("../config.js");
module.exports.config = {
    name: "help",
    description: "ya help commands, gimana sih ._.",
    usage: `${config.prefix}help / ${config.prefix}help <commands>`,
    aliases: ["h"],
    requiredperm: ["SEND_MESSAGES"],
    permission: ["SEND_MESSAGES"]
}, module.exports.run = async (e, a, n, i) => {
    let s = a[0];
    if (s) {
        let o = e.commands.get(s) || e.commands.get(e.aliases.get(s));
        if (!o) return n.channel.send(`Tidak menemukan help untuk: ${s}`);
        let t = new discord.MessageEmbed()
            .setColor(i.defaultColor)
            .setTitle(`${emote.info} Info Commands`)

.addFields(

    { name: 'Nama: ', value: o.config.name },
    { name: 'Singkatan: ', value: o.config.aliases.join(", ") },
    { name: "Deskripsi: ", value: o.config.description },
    { name: "Usage: ", value: o.config.usage }

)

        return n.channel.send({ embeds: [t] })
    }
    if (!s) {
        let d = new discord.MessageEmbed()
            .setColor(i.defaultColor)
            .setTitle(`${e.user.username}'s help`)
.addFields({ name: `${emote.settings}** Configurasi**`, value: `Untuk melihat **configurasi** yang **tersimpan**, 
gunakan **\`${config.prefix}config list\`**
Untuk me **reset** **configurasi** yang **tersimpan**, 
gunakan **\`${config.prefix}config reset\`**`, inline: false },

{ name: `${emote.tools}** Fitur & Commands**`, value: `Untuk melihat **commands**, gunakan **\`${config.prefix}commands\`**`, inline: false },

{ name: `**${emote.link} Invite ${e.user.username}**`, value: `Kamu ingin aku di **servermu**? [**Klik untuk invite.**](https://discordapp.com/oauth2/authorize?client_id=${e.user.id}&permissions=8&scope=bot)`, inline: false },

{ name: `${emote.pesan} **Trakteer Developer**`, value: `
**${e.user.username}** bisa kamu gunakan secara **gratis**, 
tolong pertimbangkan untuk **membantu developer** dengan cara 
donasi bisa menggunakan **gopay/ovo/linkaja/dana/bank** 
dengan melewati [**Trakteer**](https://trakteer.id/danisxd) 
yang bisa kamu klik [**Disini.**](https://trakteer.id/danisxd)
plis lah ya
    `, inline: false })



        n.channel.send({ embeds: [d] })
    }
};
