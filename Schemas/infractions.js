const { model, Schema } = require("mongoose");

module.exports = model(
  "Infractions",
  new Schema({
    GuildId: String,
    GuildName: String,
    UserId: String,
    Username: String,
    Infractions: Array,
  })
);
