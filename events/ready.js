const boxen = require("boxen"),
    config = require("../config.js"),
    settings = require("../config.js");
module.exports = e => {
    e.on("ready", () => {
        function s() {
            let s = [`${settings.prefix}help | Membantu ${e.guilds.cache.size.toLocaleString()} Guild!   `, `${settings.prefix}help | ${settings.botVersion}`, `${settings.prefix}help | Bersama ${e.users.cache.size.toLocaleString()} Users!  `, `${settings.prefix}help | ${e.channels.cache.size.toLocaleString()} Channels!  `],
                i = s[Math.floor(Math.random() * s.length)];
            e.user.setActivity(`${i}`)
        }
        setInterval(s, 1e4), console.log(boxen(`
            (c) DanizPlayz Development

Login As : ${e.user.tag}  
Bot ID : ${e.user.id}  
Default Prefix : ${config.prefix}                                
Server : ${e.guilds.cache.size.toLocaleString()}
Channel : ${e.channels.cache.size.toLocaleString()}
Users : ${e.users.cache.size.toLocaleString()}`, {
            padding: 1,
            margin: 1,
            borderStyle: "double"
        })), require("../cmdLoader.js")(e)
    })
};