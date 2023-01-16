const ilf = require("../module/InviteLinkFilter"),
    blw = require("../module/BlacklistWord")
module.exports = e => {
    e.on("messageUpdate", async (e, t) => {
        await ilf.messageEditEvent(e, t), await blw.messageEditEvent(e, t)
    })
};