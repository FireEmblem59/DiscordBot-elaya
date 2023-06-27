const XP = require("../../Schemas/xp");
const Money = require("../../Schemas/money");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return; // Ignore messages from bots

    const userId = message.author.id;
    const guildId = message.guild.id;

    let userXp = await XP.findOne({ userId, guildId });
    let userMoney = await Money.findOne({ userId, guildId });

    if (!userXp) {
      userXp = new XP({ userId, guildId });
    } else if (!userMoney) {
      userMoney = new Money({ userId, guildId });
    }

    const xpToAdd = Math.floor(Math.random() * 4) + 5; // Random number between 5 and 8 (inclusive)
    userXp.xp += xpToAdd;

    const moneyToAdd = Math.floor(Math.random() * 4) + 5; // Random number between 5 and 8 (inclusive)
    userMoney.money += moneyToAdd;

    // Exponential XP threshold
    const levelThreshold = Math.pow(2, userXp.level) * 100; // 100 XP for level 1, 200 XP for level 2, 400 XP for level 3, and so on

    if (userXp.xp >= levelThreshold) {
      const oldLevel = userXp.level;
      userXp.level++;

      const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `Congratulations, ${message.author}! You leveled up from level ${oldLevel} to level ${userXp.level}!`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }

    await userXp.save();
    await userMoney.save();
  },
};
