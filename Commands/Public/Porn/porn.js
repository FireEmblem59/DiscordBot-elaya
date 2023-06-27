const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("porn")
    .setDescription("Provides a porn image.")
    .setDMPermission(false),
  async execute(interaction) {
    interaction.reply("Bro you really though ? :skull:");
  },
};
