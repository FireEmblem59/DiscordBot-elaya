const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletemessage")
    .setDescription("Deletes a specified number of messages.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("Number of messages to delete")
        .setRequired(true)
    ),
  async execute(interaction) {
    const count = interaction.options.getInteger("count");

    if (count <= 0) {
      return interaction.reply({
        content: "Please enter a valid count (greater than 100).",
        ephemeral: true,
      });
    } else if (count >= 100) {
      return interaction.reply({
        content: "Please enter a valid count (under 100).",
        ephemeral: true,
      });
    }

    const channel = interaction.channel;

    try {
      const messages = await channel.messages.fetch({ limit: count });
      await channel.bulkDelete(messages);

      const actualCount = messages.size;
      const embed = new EmbedBuilder()
        .setTitle("Messages Deleted")
        .setDescription(`Successfully deleted ${actualCount} messages.`);

      const reply = await interaction.reply({ embeds: [embed] });

      setTimeout(() => {
        reply.delete();
      }, 2000);
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Failed to delete messages.",
        ephemeral: true,
      });
    }
  },
};
