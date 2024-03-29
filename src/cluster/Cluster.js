const Client = require('../Client')
init()

function init () {
  const client = new Client(process.env.DISCORD_TOKEN, {
    defaultImageFormat: 'png',
    restMode: true,
    maxShards: 1,
    defaultImageSize: 2048,
    getAllUsers: true,
    messageLimit: 100,
    allowedMentions: {
      everyone: false,
      roles: false,
      users: true,
      replied_user: true
    },
    intents: [
      'guilds',
      'guildMembers',
      'guildMessages',
      'guildMessageReactions',
      'guildInvites'
    ],
    disableEvents: {
      GUILD_MEMBER_ADD: true,
      GUILD_MEMBER_REMOVE: true,
      GUILD_MEMBER_UPDATE: true,
      GUILD_ROLE_CREATE: true,
      GUILD_ROLE_DELETE: true,
      GUILD_ROLE_UPDATE: true,
      PRESENCE_UPDATE: true,
      TYPING_START: true,
      VOICE_STATE_UPDATE: true
    }
  })
  client.connect()
}
