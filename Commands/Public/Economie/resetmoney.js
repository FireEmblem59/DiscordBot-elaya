const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Money = require("../../../Schemas/money");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetmoney")
    .setDescription("Reset the money of a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");

    if (!user) {
      return interaction.reply("Invalid user.");
    }

    if (user.bot) {
      return interaction.reply("You cannot reset the money of a bot.");
    }

    const userId = user.id;
    const guildId = interaction.guild.id; // Get the ID of the current guild

    let moneyUser = await Money.findOne({ userId, guildId });

    if (!moneyUser) {
      moneyUser = new Money({ userId, guildId });
    }

    moneyUser.money = 0;
    moneyUser.level = 0;

    await moneyUser.save();

    interaction.reply(`<@${user.id}> has now 0 of money in this server.`);
  },
};
