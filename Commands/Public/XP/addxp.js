const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const XP = require("../../../Schemas/xp");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addxp")
    .setDescription("Add XP to a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of XP to add")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (!user || !amount || amount <= 0) {
      return interaction.reply("Invalid user or amount.");
    }

    if (user.bot) {
      return interaction.reply("You cannot add XP to a bot.");
    }

    const userId = user.id;
    const guildId = interaction.guild.id;

    const xpUser = await XP.findOne({ userId, guildId });

    if (!xpUser) {
      xpUser = new XP({ userId, guildId });
    }

    xpUser.xp += amount;

    await xpUser.save();

    interaction.reply(`Added ${amount} XP to <@${user.id}>.`);
  },
};
