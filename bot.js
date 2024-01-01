require('dotenv').config()
const token = process.env.BOT_TOKEN;
const {Client, IntentsBitField} = require('discord.js');
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
    ]
});
client.on('ready', () =>{
    console.log('The bot is online');
    client.user.setActivity('/poll');
    let commands = client.application.commands
    commands.create({
        name: 'poll',
        description: 'Create a poll thread',
        options: [
          {
            name: 'question',
            type: 3,
            description: 'The question for the poll',
            required: true,
          },
        ],
      })
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()){
        return
    }
    const {commandName, options} = interaction
    if (commandName === 'poll'){
        const question = options.getString('question');
        const channel = interaction.channel;
        let mention = `<@${interaction.user.id}>`;
        const thread = await channel.threads.create({
            name: question,
            autoArchiveDuration: 1440,
          });
        thread.send(`${mention} asked: ${question}`)
    }
    interaction.reply({
      content: 'Thread created',
      ephemeral: true
  })
})
client.login(process.env.BOT_TOKEN);
