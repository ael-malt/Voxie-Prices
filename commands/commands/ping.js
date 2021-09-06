const { Message } = require("discord.js");

module.exports = {
    commands: 'ping',
    callback: (message, arguments, text, client) => {
        message.reply('Calculating ping...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
      
            resultMessage.edit(
                `Pong!\n**Bot latency:** ${ping}\n**API Latency:** ${client.ws.ping}`)
          })
    },
}