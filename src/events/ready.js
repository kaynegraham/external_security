const { Events, ActivityType } = require("discord.js");
const cliProgress = require("cli-progress");
const chalk = require("chalk");
const figlet = require("figlet");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const memberCount = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );
    const guildCount = client.guilds.cache.size;
    const statusTypes = [
      `out for new players!`,
      `over ${guildCount} guilds`,
      `over ${memberCount} members`,
    ];

    setInterval(() => {
      let randomStatus = Math.floor(Math.random() * statusTypes.length);
      client.user.setActivity({
        name: statusTypes[randomStatus],
        type: ActivityType.Watching,
      });
    }, 5000);

    // Log the Bot Starting
    const commandCount = client.commands.size;
    const botVersion = "1.0.0";
    const botOwner = "Kayne";

    async function displayAdvancedConsole() {
      console.clear();
      console.log(
        chalk.yellow(
          figlet.textSync("External Security Bot", { horizontalLayout: "full" })
        )
      );
      console.log(chalk.magenta("----------------------------------"));
      console.log(chalk.magenta(`Command Count: ${commandCount}`));
      console.log(chalk.cyan(`Total Members: ${memberCount}`));
      console.log(chalk.green(`Total Guilds: ${guildCount}`));
      console.log(chalk.red(`Bot Launch Time: ${new Date().toLocaleString()}`));
      console.log(chalk.blue(`Bot Version: ${botVersion}`));
      console.log(chalk.red(`Bot Developer: devkayne`));
      console.log(chalk.red("----------------------------------"));

      const progressBar = new cliProgress.SingleBar(
        {},
        cliProgress.Presets.shades_classic
      );
      progressBar.start(100, 0);

      try {
        for (let i = 0; i <= 100; i++) {
          await new Promise((resolve) => setTimeout(resolve, 20));
          progressBar.update(i);
        }
        progressBar.stop();
      } catch (e) {
        progressBar.stop();
        console.error("Error!", e);
      }
    }
    displayAdvancedConsole();
  },
};
