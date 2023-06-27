const { SlashCommandBuilder } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Displays user profile."),
  async execute(interaction) {
    const canvas = createCanvas(640, 360);
    const context = canvas.getContext("2d");

    const background = await loadImage(
      "/Users/theophile/Desktop/code/Discord/moi/discord bot nsfw/images/beach.png"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.font = "28px sans-serif";
    context.fillStyle = "#000000";
    context.fillText("Profile", canvas.width / 2.5, canvas.height / 3.5);

    context.font = applyText(canvas, `${interaction.member.displayName}!`);
    context.fillStyle = "#000000";
    context.fillText(
      `${interaction.member.displayName}!`,
      0 + canvas.width / 10,
      canvas.height / 1.8
    );

    context.beginPath();
    context.arc(500, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const avatar = await loadImage(
      interaction.user.displayAvatarURL({ extension: "jpg" })
    );
    context.drawImage(avatar, 400, 25, 200, 200);

    const attachment = canvas.toBuffer("image/png");

    interaction.reply({ files: [attachment] });
  },
};

function applyText(canvas, text) {
  const context = canvas.getContext("2d");
  let fontSize = 70;

  do {
    context.font = `${(fontSize -= 10)}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);

  return context.font;
}
