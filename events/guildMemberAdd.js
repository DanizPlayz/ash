const ak = require("../module/AutoKick"),
    gb = require("../module/GlobalBans.js");
module.exports = o => {
    o.on("guildMemberAdd", async o => {
        ak(o), gb(o)
    })
};