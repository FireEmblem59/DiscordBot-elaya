const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const Database = require("../../../Schemas/infractions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName("target")
        .setDescription("Select the target member.")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("reason")
        .setDescription("Provide a reason for this ban.")
        .setMaxLength(512)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild, member } = interaction;

    const target = options.getMember("target");
    const reason = options.getString("reason") || "None specified.";

    const errorsArray = [];

    const errorsEmbed = new EmbedBuilder()
      .setAuthor({ name: "Could not timeout the member due to" })
      .setColor("Red");

    if (!target)
      return interaction.reply({
        embeds: [
          errorsEmbed.setDescription("Member has most likely left the guild."),
        ],
        ephemeral: true,
      });

    if (!target.manageable || !target.moderatable)
      errorsArray.push("Selected target is not moderatable by this bot.");

    if (member.roles.highest.position <= target.roles.highest.position)
      errorsArray.push("Selected member have a higher role position than you.");

    if (errorsArray.length)
      return interaction.reply({
        embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
        ephemeral: true,
      });

    target.ban(reason).catch((err) => {
      interaction.reply({
        embeds: [
          errorsEmbed.setDescription(
            "There where an error while executing this command"
          ),
        ],
      });
      return console.log("Error occured in ban.js".err);
    });

    const newInfractionsObject = {
      ModeratorID: member.id,
      ModeratorTag: member.user.tag,
      Reason: reason,
      Date: Date.now(),
    };

    let userData = await Database.findOne({
      GuildId: guild.id,
      GuildName: guild.name,
      UserId: target.id,
      Username: target.user.tag,
    });
    if (!userData)
      userData = await Database.create({
        GuildId: guild.id,
        GuildName: guild.name,
        UserId: target.id,
        Username: target.user.tag,
        Infractions: [newInfractionsObject],
      });
    else
      userData.Infractions.push(newInfractionsObject) &&
        (await userData.save());

    const sucessEmbed = new EmbedBuilder()
      .setAuthor({ name: "Ban issue", iconURL: guild.iconURL() })
      .setColor("Green")
      .setDescription(
        [
          `${target} was issued a ban by **${member}**`,
          `\nReason: ${reason}`,
        ].join("\n")
      );

    return interaction.reply({ embeds: [sucessEmbed] });
  },
};
