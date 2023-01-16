const bookman = require("../bookman.js");
module.exports = {
  fetch: async function(DatabaseName, Path) {
    if (!Path) return console.log("dbhandler fetch: tidak ada path");
    if (!DatabaseName) return console.log("dbhandler fetch: tidak ada database name");
    let result = await bookman[DatabaseName].fetch(Path);
    if (!bookman[DatabaseName].has(Path)) {
      result = false;
    }

    return result;
  },
  push: async function(DatabaseName, Path, Input) {
    if (!Path) return console.log("dbhandler set: tidak ada path");
    if (!DatabaseName) return console.log("dbhandler set: tidak ada database name");
    if (!Input) return console.log("dbhandler set: tidak ada input");
    
    let result = await bookman[DatabaseName].push(Path, Input);
    return true
  }, 
  set: async function(DatabaseName, Path, Input) {
    if (!Path) return console.log("dbhandler set: tidak ada path");
    if (!DatabaseName) return console.log("dbhandler set: tidak ada database name");
    if (!Input) return console.log("dbhandler set: tidak ada input");
    
    let result = await bookman[DatabaseName].set(Path, Input);
    return true
  },
    add: async function(DatabaseName, Path, Input) {
    if (!Path) return console.log("dbhandler add: tidak ada path");
    if (!DatabaseName) return console.log("dbhandler add: tidak ada database name");
    if (!Input) return console.log("dbhandler add: tidak ada input");
    
    let result = await bookman[DatabaseName].add(Path, Input);
    return true
  },
   subtract: async function(DatabaseName, Path, Input) {
    if (!Path) return console.log("dbhandler subtract: tidak ada path");
    if (!DatabaseName) return console.log("dbhandler subtract: tidak ada database name");
    if (!Input) return console.log("dbhandler subtract: tidak ada input");
    
    let result = await bookman[DatabaseName].subtract(Path, Input);
    return true
  },
  pop: async function(DatabaseName, Path) {
    if (!Path) return console.log("dbhandler pop: tidak ada path");
    if (!DatabaseName) return console.log("dbhandler pop: tidak ada database name");
    
    let result = await bookman[DatabaseName].pop(Path);
    return true
  },
  delete: async function(DatabaseName, Path) {
    if (!Path) return console.log("dbhandler delete: tidak ada path");
    if (!DatabaseName) return console.log("dbhandler delete: tidak ada database name");
    
    let result = await bookman[DatabaseName].delete(Path);
    return true
  },
  
};
