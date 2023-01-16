module.exports = bot => {
 require('./guildMemberAdd')(bot)
 require('./guildMemberRemove')(bot)
 require('./messageDelete')(bot)
 require('./messageUpdate')(bot)
 require('./guildDelete')(bot)
 require('./ready')(bot) 
 require('./message')(bot)  
} 