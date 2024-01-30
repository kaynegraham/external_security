const fs = require("fs");
const path = require("path");
const { GatewayIntentBits, Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const chalk = require("chalk");

// New Client
const exsecurity = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Command Collection
exsecurity.commands = new Collection();
const folderPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(folderPath);

for (const commandFolder of commandFolders) {
  const commandPath = path.join(folderPath, commandFolder);
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      exsecurity.commands.set(command.data.name, command);
    } else {
      console.log(
        chalk.red(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        )
      );
    }
  }
}

// Events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    exsecurity.once(event.name, (...args) => event.execute(...args));
  } else {
    exsecurity.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to discord
exsecurity.login(token);
