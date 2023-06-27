const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user")
    .setDMPermission(false)
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user").id ?? interaction.user.id;
    try {
      const guildMember = await interaction.guild.members.fetch(user);
      const userRoles = guildMember.roles.cache.map((role) => role.name);

      const userInformation = [
        `**Username:** ${interaction.user.username}`,
        `**Discriminator:** ${interaction.user.discriminator}`,
        `**User ID:** ${interaction.user.id}`,
        `**Joined Discord on:** <t:${interaction.user.createdAt.toDateString()}:D> | <t:${interaction.user.createdAt.toDateString()}:R>`,
        `**Joined this server on:** <t:${guildMember.joinedAt.toDateString()}:D> | <t:${guildMember.joinedAt.toDateString()}:R>`,
        `**User Roles:** ${userRoles.join(", ") || "None"}`,
        `${
          interaction.guild.ownerId === interaction.user.id
            ? "👑 Server Owner"
            : ""
        }`,
      ];

      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("User Information")
        .setDescription(userInformation.join("\n\n"))
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "An error occurred while trying to fetch user information.",
        ephemeral: true,
      });
    }
  },
};
