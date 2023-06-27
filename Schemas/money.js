const { model, Schema } = require("mongoose");

module.exports = model(
  "Money",
  new Schema({
    userId: { type: String },
    money: { type: Number, default: 0 },
    guildId: { type: String },
  })
);
