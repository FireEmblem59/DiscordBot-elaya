const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Money = require("../../../Schemas/money");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removemoney")
    .setDescription("Remove money from a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of money to remove")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (!user || !amount || amount <= 0) {
      return interaction.reply("Invalid user or amount.");
    }

    if (user.bot) {
      return interaction.reply("You cannot remove the money of a bot.");
    }

    const userId = user.id;
    const guildId = interaction.guild.id;

    const moneyUser = await Money.findOne({ userId, guildId });

    if (!moneyUser) {
      moneyUser = new Money({ userId, guildId });
    }

    moneyUser.money -= amount;

    await moneyUser.save();

    interaction.reply(`Removed ${amount} money from <@${user.id}>.`);
  },
};
