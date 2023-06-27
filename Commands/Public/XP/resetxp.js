const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const XP = require("../../../Schemas/xp");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetxp")
    .setDescription("Reset XP to a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");

    if (!user) {
      return interaction.reply("Invalid user or amount.");
    }

    if (user.bot) {
      return interaction.reply("You cannot reset the XP of a bot.");
    }

    const userId = user.id;
    const guildId = interaction.guild.id; // Get the ID of the current guild

    let xpUser = await XP.findOne({ userId, guildId });

    if (!xpUser) {
      xpUser = new XP({ userId, guildId });
    }

    xpUser.xp = 0;
    xpUser.level = 0;

    await xpUser.save();

    interaction.reply(`<@${user.id}> is now level 0 in this server.`);
  },
};
