const XP = require("../../../Schemas/xp");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("Get XP and level.")
    .setDMPermission(false)
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user")
    ),
  async execute(interaction) {
    const userId =
      interaction.options.getUser("user").id ?? interaction.user.id;
    const guildId = interaction.guild.id;

    const user = await XP.findOne({ userId, guildId });

    if (user) {
      userxpis = `XP: ${user.xp}/${Math.pow(2, user.level) * 100}, Level: ${
        user.level
      }`;
    } else {
      userxpis = "You have no XP yet.";
    }

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`XP of <@${userId}>`)
      .setDescription(userxpis)
      .setFooter({
        text: `Action request by ${interaction.member.displayName}`,
      });

    interaction.reply({ embeds: [embed] });
  },
};
