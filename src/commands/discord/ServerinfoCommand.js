const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')
const humanizeDuration = require('humanize-duration')

module.exports = class ServerinfoCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['serverinfo', 'guildinfo'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'guild',
          required: false,
          acceptLocal: true
        }
      ],
      description: 'Mostra informações de algum servidor que estou',
      example: '**🔹 Você pode usar nomes e IDs\n🔹 Os argumentos são opcionais, ou seja, você não precisa forncer um servidor.**\n\n**🔸 Possíveis usos**\n`<<1>><<2>>`\n`<<1>><<2>> 849000250168442901`\n`<<1>><<2>> Doce lar da Moxie`'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {Guild} guild
     */
  async execute (ctx, [guild]) {
    const owner = this.client.users.get(guild.ownerID)
    let text = 0
    let voice = 0
    let category = 0
    let news = 0
    const allChannels = guild.channels.size
    let users = 0
    let bots = 0
    const allMembers = guild.members.size
    const timeConfig = {
      largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: 'pt', round: true, conjunction: ' e ', serialComma: false
    }

    guild.channels.forEach(ch => {
      if (ch.type === 0) text++
      if (ch.type === 2) voice++
      if (ch.type === 4) category++
      if (ch.type === 5) news++
    })
    guild.members.forEach(u => {
      if (!u.bot) users++
      if (u.bot) bots++
    })

    const embed = new EmbedBuilder()
    embed.setTitle(`${guild.name} ${guild.premiumTier ? '<:boost:825875610425360494>' : ''}`)
    embed.setColor('DEFAULT')
    embed.setDescription(guild.description)
    embed.setThumbnail(guild.iconURL)
    embed.setImage(guild.splashURL || guild.bannerURL)
    embed.addField('💻 ID do servidor', `\`${guild.id}\``, true)
    embed.addField('👑 Dono', `${owner.username}#${owner.discriminator} \`(${owner.id})\``, true)
    embed.addField('💻 Shard', `\`${ctx.guild.shard.id + 1}/${this.client.shards.size}\``, true)
    embed.addField(`🔖 Canais ${allChannels}`, `Texto: ${text}\nVoz: ${voice}\nCategorias: ${category}${news > 0 ? `\n Anúncios: ${news}` : ''}`, true)
    embed.addField(`👥 Membros ${allMembers}`, `Usuários: ${users}\nBots: ${bots}`, true)
    embed.addField('📆 Criado há', humanizeDuration(Date.now() - guild.createdAt, timeConfig) + ` (${new Date(guild.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })})`, true)
    embed.addField('🔞 Servidor NSFW', guild.nsfw ? 'Sim' : 'Não', true)
    await ctx.reply({ embed })
  }
}
