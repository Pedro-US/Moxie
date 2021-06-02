const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");
const EmbedBuilder = require("../../utils/EmbedBuilder");

module.exports = class HelpCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["help", "ajuda", "comandos", "commands"],
            requirements: {},
            category: "miscellaneous",
        });
    }

    /**
     *
     * @param {CommandContext} ctx
     */
    async execute(ctx) {
        let embed = new EmbedBuilder()
            .setColor("DEFAULT")
        const categories = await this.client.commandTools.getAllCategories();
        for (let i = 0; i < categories.length; i++) {
            const commandCategory = await this.client.commandTools.getCommandsFromCategory(categories[i]);
            const a = []
            commandCategory.forEach(ds => a.push(ds.labels[0]));

            embed.addField(categories[i], `\`${a.join("| ")}\``);
        }
        await ctx.reply({embed});
    }
};