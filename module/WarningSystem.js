const bb = require("./BetterBookman.js");
module.exports = {
    add: async function(GuildID, MemberID, JumlahWarn) {
        //[Check apakah semua terlengkapi]===============================
        if (!GuildID) return console.log("No GuildID diberikan")
        if (!MemberID) return console.log("No MemberID diberikan")
        if (!JumlahWarn) return console.log("No JumlahWarn diberikan")


        //[Check berapa maximal warn di server]==========================
        let maxWarn = await bb.fetch("guildSettings", `${GuildID}.maxWarn`)
        if (!maxWarn) maxWarn = 3

        //[Check apakah member pernah di warn sebelumnya]=================
        let WarnCheck = await bb.fetch("guildSettings", `${GuildID}.warnedMember.${MemberID}`)

        ////[Jika member pernah di warn sebelumnya]=======================
        if (WarnCheck) {
            if (Number(maxWarn) < Number(WarnCheck) + Number(JumlahWarn)) return "TO_MUCH_WARN"
        }

        if (JumlahWarn > maxWarn) return "TO_MUCH_WARN"
        if (JumlahWarn < maxWarn) {

            if (!WarnCheck) await bb.add("guildSettings", `${GuildID}.warnedMember.${MemberID}`, Number(JumlahWarn))

            await bb.add("guildSettings", `${GuildID}.warnedMember.${MemberID}`, Number(JumlahWarn))
            return 'WARN_ADDED'
        }

    },
    subtract: async function(GuildID, MemberID, JumlahWarn) {
        if (!GuildID) return console.log("No GuildID diberikan")
        if (!MemberID) return console.log("No MemberID diberikan")
        if (!JumlahWarn) return console.log("No JumlahWarn diberikan")

        let jumlahWarningSekarang = await bb.fetch("guildSettings", `${GuildID}.warnedMember.${MemberID}`)
        if (!jumlahWarningSekarang) return "NO_WARN_RECORD"
        if (jumlahWarningSekarang < JumlahWarn) {
            bb.delete("guildSettings", `${GuildID}.warnedMember.${MemberID}`)
            return `WARN_REMOVED`
        }
        if (jumlahWarningSekarang == JumlahWarn) {
            bb.delete("guildSettings", `${GuildID}.warnedMember.${MemberID}`)
            return `WARN_REMOVED`
        }
        if (jumlahWarningSekarang > JumlahWarn) {
            bb.subtract("guildSettings", `${GuildID}.warnedMember.${MemberID}`, JumlahWarn)
            return `WARN_REMOVED`
        }

    },
    check: async function(GuildID, MemberID) {
        if (!GuildID) return console.log("No GuildID diberikan")
        if (!MemberID) return console.log("No MemberID diberikan")

        let jumlahWarningSekarang = await bb.fetch("guildSettings", `${GuildID}.warnedMember.${MemberID}`)
        if (!jumlahWarningSekarang) return "NO_WARN_RECORD"
        if (jumlahWarningSekarang) return jumlahWarningSekarang
    }

};