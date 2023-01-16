fs = require("fs"), module.exports = e => {
  delete require.cache[require.resolve("./bookman.js")], console.log("[LOGS] reload bookman.js"), delete require.cache[require.resolve("./cmdManager.js")], console.log("[LOGS] reload cmdManager.js"), delete require.cache[require.resolve("./config.js")], console.log("[LOGS] reload config.js"), delete require.cache[require.resolve("./emoji.js")], console.log("[LOGS] reload emoji.js"), delete require.cache[require.resolve("./bookman.js")], console.log("[LOGS] reload bookman.js"), fs.readdir("./events", (e, o) => {
      e && console.log(e);
      let l = o.filter(e => "js" === e.split(".")
          .pop());
      if (l.length <= 0) {
          console.log("No Files found.");
          return
      }
      l.forEach((e, o) => {
          require(`./events/${e}`), delete require.cache[require.resolve(`./events/${e}`)], console.log("[LOGS][EVENTS] Reloaded " + e)
      })
  }), fs.readdir("./module", (e, o) => {
      e && console.log(e);
      let l = o.filter(e => "js" === e.split(".")
          .pop());
      if (l.length <= 0) {
          console.log("No Files found.");
          return
      }
      l.forEach((e, o) => {
          require(`./module/${e}`), delete require.cache[require.resolve(`./module/${e}`)], console.log("[LOGS][MODULE] Reloaded " + e)
      })
  }), fs.readdir("./commands", (e, o) => {
      e && console.log(e);
      let l = o.filter(e => "js" === e.split(".")
          .pop());
      if (l.length <= 0) {
          console.log("No Files found.");
          return
      }
      l.forEach((e, o) => {
          require(`./commands/${e}`), delete require.cache[require.resolve(`./commands/${e}`)]
      })
  }), fs.readdir("./commands/", (o, l) => {
      o && console.log(o);
      let s = l.filter(e => "js" === e.split(".")
          .pop());
      if (s <= 0) return console.log("NO JS FILES");
      s.forEach((o, l) => {
          let s = require(`./commands/${o}`);
          delete require.cache[require.resolve(`./commands/${o}`)], e.commands.set(s.config.name, s), s.config.aliases.forEach(l => {
              e.aliases.set(l, s.config.name), console.log("[LOGS][COMMANDS] Reloaded " + o)
          })
      })
  })
};