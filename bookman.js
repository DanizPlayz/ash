const { Database } = require("bookman");
this.guildSettings = new Database("./database/guildSettings");
this.userSettings  = new Database("./database/userSettings");
this.botDatabase   = new Database("./database/botDatabase");
this.globalBans   = new Database("./database/globalBans");
module.exports = {
  
 guildSettings  : this.guildSettings,
 userSettings   : this.userSettings,
 botDatabase    : this.botDatabase,
 globalBans     : this.globalBans


}