const bb = require("../module/BetterBookman.js");
module.exports = e => {
    e.on("guildDelete", async e => {
        let t = await bb.fetch("guildSettings", `${e.id}`);
        t && t && (bb.delete("guildSettings", `${e.id}`), console.log(`[LEFT GUILD] ${e.name} | Reseted the guild settings`))
    })
};