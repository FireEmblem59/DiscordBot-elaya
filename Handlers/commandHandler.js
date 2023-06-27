async function loadCommands(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();
  await client.subCommands.clear();

  let commandsArrey = [];

  const Files = await loadFiles("Commands");

  Files.forEach((file) => {
    const command = require(file);

    if (command.subCommand)
      return client.subCommands.set(command.subCommand, command);

    client.commands.set(command.data.name, command);

    commandsArrey.push(command.data.toJSON());

    table.addRow(command.data.name, "🟩");
  });

  client.application.commands.set(commandsArrey);

  return console.log(table.toString(), "\nCommands loaded.");
}

module.exports = { loadCommands };
