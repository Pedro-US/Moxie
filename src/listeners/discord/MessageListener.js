const CommandContext = require('../../structures/command/CommandContext')

module.exports = class MessageListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'messageCreate'
  }

  /**
     *
     * @param {Message} message
     */
  async execute (message) {
    if (message.author.bot) return
    if (message.author.discriminator === '0000') return

    this.client.messageCollectors.forEach(collector => {
      if (collector.channel.id === message.channel.id) collector.collect(message)
    })

    if (!message.channel.permissionsOf(this.client.user.id).has('sendMessages')) return
    const prefix = await this.client.guildCache.get(message.guildID).prefix || process.env.PREFIX
    if (new RegExp(`^<@!?${this.client.user.id}>$`).test(message.content) && !message.content.split(' ')[1]) message.channel.createMessage(`Olá ${message.author.mention}, eu me chamo ${this.client.user.username}! Meu prefixo nesse servidor é \`${prefix}\`, para mais informações, use \`${prefix}help\``)
    if (!message.content.startsWith(prefix.toLowerCase())) return

    const args = message.content.trim().replace(prefix.toLowerCase(), '').split(' ')
    const commandName = args.shift().toLowerCase()
    const cmd = this.client.commandTools.getCommand(commandName)

    if (!cmd) return
    const ctx = new CommandContext(this.client, message, args, commandName)
    await cmd._execute(ctx)
  }
}
