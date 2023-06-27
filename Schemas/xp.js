const { model, Schema } = require("mongoose");

module.exports = model(
  "XP",
  new Schema({
    userId: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    guildId: { type: String },
  })
);
