
BotStart()
async function BotStart() {
    let Mapping = new Map()
const bb = require("./module/BetterBookman.js")
    const discord = require("discord.js")
    const config = require("./config.js")
    const TextObfuscator = require('text-obfuscator')
    // const { REST } = require('@discordjs/rest');
    // const { Routes } = require('discord-api-types/v9');


    const bot = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, 
        discord.Intents.FLAGS.MESSAGE_CONTENT,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord.Intents.FLAGS.GUILD_MEMBERS] });

        // const rest = new REST({ version: '9' }).setToken("MTA1MjAwNDA3NzE4NzM2Njk1NA.G34F9L.kMRpyoLBXDCASdBMnn5C9a59OtQy5GBnWszLM0")

        // const commands = [{}]; 

        // rest.put(
        //     Routes.applicationGuildCommands("1052004077187366954", "1051277136650064002"),
        //     { body: commands },
        // );
        // rest.put(
        //     Routes.applicationCommands("1052004077187366954"),
        //     { body: commands },
        // );
       
    //     rest.put(Routes.applicationGuildCommands("1052004077187366954", "1051277136650064002"), { body: [] })
    //     .then(() => console.log('Successfully deleted all guild commands.'))
    //     .catch(console.error);
    
    // // for global commands
    // rest.put(Routes.applicationCommands("1052004077187366954"), { body: [] })
    //     .then(() => console.log('Successfully deleted all application commands.'))
    //     .catch(console.error);

        bot.on('interactionCreate', async interaction => {
          //  if (!interaction.isButton() || !interaction.isSelectMenu()) return;

            if(interaction.customId == "1") {

               let thereply = await interaction.reply({ content: 'Only you! :)', ephemeral: true })
               interaction.editReply({ content: 'Only you! boy :)', ephemeral: true })
            }

            if(interaction.customId == "verify") {
async function verify() {
    try {
              
     
    } catch { console.log()}
}
verify()

const Captcha = require("captcha-generator-alphanumeric").default
let alphanum = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    
async function fakecaptcha() {
    let result = await alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)]
    return result;
    }
    let result1 = await alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)]
    let result2 = await alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)]
    let result3 = await alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)] + alphanum[Math.floor(Math.random()*alphanum.length)]
  
    
    
let captcha = await new Captcha();
let attach =  new discord.MessageAttachment(captcha.JPEGStream, "captcha.jpeg")
let rows = [{
    label: result1,
    value: 'wrong1',
    },
    {
    label: result2,
    value: 'wrong2',
    },
    {
    label: captcha.value,
    value: 'right',
    },
    {
    label: result3,
    value: 'wrong3',
    }]
rows.sort(() => Math.random() - 0.5);


let [item1, item2, item3, item4] = rows

const row7 = new discord.MessageActionRow()
.addComponents(
new discord.MessageSelectMenu()
    .setCustomId('selectmenu')
    .setPlaceholder('Pilih Jawaban')
    .addOptions(rows)
);

let ebe = new discord.MessageEmbed()
.setTitle("Apa kata gambar dibawah?")
.setImage("attachment://captcha.jpeg")
.setColor(config.defaultColor)

//message.reply({ content: 'Only you! :)', ephemeral: true })

let reply = await  interaction.reply({ content: 'Jawab pertanyaan berikut', components: [row7], ephemeral: true, embeds: [ebe], files: [attach] })
return Mapping.set(interaction.member.id, {warning: 1});


            }


if(!interaction.isSelectMenu()) return;

            if(interaction.values[0] == "right") {
async function right() {
    try{
      interaction.reply({ content: 'Benar', ephemeral: true })
        return Mapping.delete(interaction.member.id)
    }catch {console.log("sesuatu error di interaction right")}
}
right()

             }
             if(interaction.values[0].match("wrong")) {
                async function wrong() {
                    try{
              

                        let Target = await Mapping.get(interaction.member.id);
                        
                                        let thereply = await interaction.reply({ content: 'Salah percobaan ke:' + Target.warning, ephemeral: true })
                                      
                                        if(Target.warning > 2) {
                        await Mapping.delete(interaction.member.id)
                                            return interaction.editReply({ content: 'salah 2 kali tetot', ephemeral: true })
                        
                                        }
                        return Mapping.set(interaction.member.id, {warning: Target.warning + 1})
                    }catch {console.log("sesuatu error di interaction wrong")}
                }
                wrong()


             }
//console.log(interaction)

          

    

          });
        
          var decoded1 = TextObfuscator.decode("QtbEqFMi7pScLk_uheCByNVyfjBqqgmZu6zYjB.cdckiG.AN1kjN2MzN4EzN3ADNwAjM1ATM");
    bot.login(decoded1)
    bot.commands = new discord.Collection()
    bot.aliases = new discord.Collection()
    require("./events/events.js")(bot)
}




