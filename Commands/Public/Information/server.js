const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server.")
    .setDMPermission(false),

  async execute(interaction) {
    const guild = interaction.guild;
    const serverName = guild.name;
    const memberCount = guild.memberCount;

    let region;
    switch (guild.preferredLocale) {
      case "en-US":
        region = ":flag_us: USA";
        break;
      case "en-GB":
        region = ":flag_gb: UK";
        break;
      case "bg":
        region = ":flag_bg: Bulgaria";
        break;
      case "zh-CN":
        region = ":flag_cn: China";
        break;
      case "zh-TW":
        region = ":flag_tw: Taiwan";
        break;
      case "hr":
        region = ":flag_hr: Croatia";
        break;
      case "cs":
        region = ":flag_cz: Czech Republic";
        break;
      case "da":
        region = ":flag_dk: Denmark";
        break;
      case "nl":
        region = ":flag_nl: Netherlands";
        break;
      case "fi":
        region = ":flag_fi: Finland";
        break;
      case "fr":
        region = ":flag_fr: France";
        break;
      case "de":
        region = ":flag_de: Germany";
        break;
      case "el":
        region = ":flag_gr: Greece";
        break;
      case "hi":
        region = ":flag_in: India";
        break;
      case "hu":
        region = ":flag_hu: Hungary";
        break;
      case "it":
        region = ":flag_it: Italy";
        break;
      case "ja":
        region = ":flag_jp: Japan";
        break;
      case "ko":
        region = ":flag_kr: South Korea";
        break;
      case "lt":
        region = ":flag_lt: Lithuania";
        break;
      case "no":
        region = ":flag_no: Norway";
        break;
      case "pl":
        region = ":flag_pl: Poland";
        break;
      case "pt-BR":
        region = ":flag_pt: Portugal";
        break;
      case "ro":
        region = ":flag_ro: Romania";
        break;
      case "ru":
        region = ":flag_ru: Russia";
        break;
      case "es-ES":
        region = ":flag_es: Spain";
        break;
      case "sv-SE":
        region = ":flag_se: Sweden";
        break;
      case "th":
        region = ":flag_th: Thailand";
        break;
      case "tr":
        region = ":flag_tr: Turkey";
        break;
      case "uk":
        region = ":flag_ua: Ukraine";
        break;
      case "vi":
        region = ":flag_vn: Vietnam";
        break;
    }

    const embed = new EmbedBuilder()
      .setTitle("Server Information")
      .setDescription(
        `This server is named ${serverName} and has currently ${memberCount} members.`
      )
      .setColor("Random")
      .addFields({
        name: "Server Owner",
        value: `<@${interaction.guild.ownerId}>`,
      })
      .addFields({
        name: "Server Language",
        value: region,
      })
      .addFields({
        name: "Creation Date",
        value: guild.createdAt.toDateString(),
      })
      .setThumbnail(guild.iconURL({ dynamic: true }));

    await interaction.reply({ embeds: [embed] });
  },
};
