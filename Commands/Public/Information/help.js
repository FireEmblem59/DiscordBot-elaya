const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays the list of available commands.")
    .setDMPermission(false),
  async execute(interaction) {
    const categories = readdirSync("./Commands/Public", { withFileTypes: true })
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name);

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Command Categories")
      .setDescription("List of available command categories.");

    categories.forEach((category) => {
      const commandFiles = readdirSync(`./Commands/Public/${category}`).filter(
        (file) => file.endsWith(".js")
      );

      const categoryCommands = commandFiles.map((file) => {
        const command = require(`../../Public/${category}/${file}`);
        return `\`${command.data.name}\` - ${command.data.description}`;
      });

      embed.addFields({ name: category, value: categoryCommands.join("\n") });
    });

    await interaction.reply({ embeds: [embed] });
  },
};
