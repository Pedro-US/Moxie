const EmbedBuilder = require('../utils/EmbedBuilder')

module.exports = class channelCreateListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'channelCreate'
  }

  /**
     *
     * @param {Channel} channel
     * @returns {Promise<void>}
     */
  async execute (channel) {
    const cachedGuild = await this.client.guildCache.get(channel.guild.id)
    if (!cachedGuild.logEventID && !cachedGuild.activedLogs?.includes(this.name)) return

    const channelLog = channel.guild.channels.get(cachedGuild.logEventID)
    if (!channelLog) return

    const channelType = {
      0: 'Canal de texto',
      2: 'Canal de voz',
      4: 'Categoria',
      5: 'Canal de anúncios',
      6: 'Canal de vendas',
      10: 'Subcanal de vendas temporário',
      11: 'Subcanal público temporário',
      12: 'Subcanal privado temporário',
      13: 'Canal estágio'
    }

    const embed = new EmbedBuilder()
      .setTitle('📑 Canal criado')
      .setColor('GREEN')
    embed.addField('Canal', `${channel.name} (\`${channel.id}\`)`, true)
    embed.addField('Tipo do canal', channelType[channel.type], true)
    channelLog.createMessage({ embed })
  }
}
