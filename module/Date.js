const moment = require("moment")



async function YuMainYu() {
 var d = new Date();
  var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]; 

  let Hari = await days[d.getDay()]
  let Bulan = await months[d.getMonth()]
  let Tahun = await d.getFullYear()
  let Jam = await moment().utcOffset('+0700').format("HH:mm A")

return ({
hari : Hari,
bulan : Bulan,
tahun : Tahun,
jam : Jam


})
   
}
module.exports = YuMainYu;
// module.exports = {
//   hari: async function(date) {
//  var d = date
// return days[d.getDay()]

//   },
//   bulan: async function(date) {
//  var d = date
// return months[d.getMonth()]

//   },
//   tahun: async function(date) {
//  var d = date
// return d.getFullYear()

//   }


// }