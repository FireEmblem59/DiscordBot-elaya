const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Money = require("../../../Schemas/money");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetmoneyserv")
    .setDescription("Reset the money for all users")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const guildId = interaction.guild.id;

    // Update XP to 0 for all users in the guild
    await Money.updateMany({ guildId }, { Money: 0 });

    interaction.reply("The money has been reset for all users.");
  },
};
