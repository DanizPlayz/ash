const { detecter } = require('./detecter')

module.exports = {
  messageLog: [],
  message: '',

  log: function(message, maxLog){
    this.message = message
    this.messageLog.push({
      author: message.author.id,
      content: message.content,
      timeStamp: Date.now(),
      messageID: message.id,
      messageChan: message.channel,
      spamStatus: false
    })

    if (this.messageLog.length > maxLog) this.messageLog.shift()
  },

  Time: function(amount, interval){
    let msg = this.messageLog.filter(log =>log.author == this.message.author.id)

    if(msg.length < amount) return false
    
    let lastTimeStamp = msg[msg.length - amount].timeStamp
    let currentTimeStamp = msg[msg.length - 1].timeStamp
    let msgInterval = currentTimeStamp - lastTimeStamp

    if( msgInterval <= interval) {
     
     
      this.messageLog.spamStatus = true
      return this.messageLog
    }
    return false
  },
  sameMessages: function(amount, interval){

    let msg = this.messageLog.filter(log => (new Date) - log.timeStamp < interval)
    msg = msg.filter(log => log.author == this.message.author.id)

    let msgContent = msg.map(log => log.content).join(' ')
    let currentMsg = this.message.content

    currentMsg = escape(currentMsg)
    let occurance = (msgContent.match(new RegExp(currentMsg, "g")) || []).length
    
    if (occurance >= amount) {



      this.messageLog.spamStatus = true
      return this.messageLog
    }
    return false
  }
}