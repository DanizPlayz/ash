const bb = require("./BetterBookman.js");
const Dates = require("./Date.js")

module.exports = {

  cari: async function(userID) {

if(!userID) return console.log("[ERROR] Tidak ada user id GlobalBans")
let thefetch = await bb.fetch("globalBans", `${userID}`)
if(!thefetch) return false;
let hasil_alasan = await bb.fetch("globalBans", `${userID}.alasan`)
let hasil_dibansejak = await bb.fetch("globalBans", `${userID}.dibansejak`)

return ({
alasan : hasil_alasan,
dibansejak : hasil_dibansejak


})

  },
  tambah: async function(userID, Alasan) {
    if(!userID) return console.log("[ERROR] Tidak ada user id GlobalBans")
    if(!Alasan) return console.log("[ERROR] Tidak ada Alasan GlobalBans")

let date = await Dates()

let datestring = `**Hari:** ${date.hari} | **Bulan:** ${date.bulan} | **Tahun:** ${date.tahun}`

let tt = await bb.fetch("globalBans", `${userID}`)
if(tt) return console.log("User sudah ada di GlobalBans")
await bb.set("globalBans", `${userID}.alasan`, Alasan)
await bb.set("globalBans", `${userID}.dibansejak`, datestring)

return true;

  },
  hapus: async function(userID) {

let tt = await bb.fetch("globalBans", `${userID}`)
if(!tt) return console.log("User Tidak ada di GlobalBans")
await bb.delete("globalBans", `${userID}`)
return true
  }

}