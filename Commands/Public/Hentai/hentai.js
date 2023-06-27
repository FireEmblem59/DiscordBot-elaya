const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hentai")
    .setDescription("Provides a hentai image.")
    .setDMPermission(false),
  async execute(interaction) {
    interaction.reply("Bro you really though ? :skull:");
  },
};
