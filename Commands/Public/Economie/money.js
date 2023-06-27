const Money = require("../../../Schemas/money");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("money")
    .setDescription("How much money do you have?")
    .setDMPermission(false)
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user")
    ),
  async execute(interaction) {
    const userId =
      interaction.options.getUser("user").id ?? interaction.user.id;
    const guildId = interaction.guild.id;

    const user = await Money.findOne({ userId, guildId });

    if (user) {
      usermoneyis = `Money: ${user.money}`;
    } else {
      usermoneyis = "You have no money yet.";
    }

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(usermoneyis)
      .setFooter({
        text: `Action request by ${interaction.member.displayName}`,
      });

    interaction.reply({ embeds: [embed] });
  },
};
