const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const XP = require("../../../Schemas/xp");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetxpserv")
    .setDescription("Reset XP for all users")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const guildId = interaction.guild.id;

    // Update XP to 0 for all users in the guild
    await XP.updateMany({ guildId }, { xp: 0 });

    interaction.reply("XP has been reset for all users.");
  },
};
