
require("dotenv").config()

const { 
Client,
GatewayIntentBits,
Partials,
EmbedBuilder
} = require("discord.js")

const fs = require("fs")
const db = require("croxydb")

const client = new Client({
partials:[
Partials.Message,
Partials.Channel,
Partials.GuildMember,
Partials.Reaction,
Partials.User
],
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.GuildMessageReactions,
GatewayIntentBits.MessageContent,
GatewayIntentBits.DirectMessages
]
})

module.exports = client

// READY
client.once("ready",()=>{
console.log("✅ Bot Aktif:",client.user.tag)
client.user.setPresence({
activities:[{name:"TFA Moderasyon",type:0}],
status:"online"
})
})

// COMMAND LOADER
client.commands = new Map()

if(fs.existsSync("./commands")){
const files = fs.readdirSync("./commands")
for(const file of files){
if(!file.endsWith(".js")) continue
try{
const cmd = require(`./commands/${file}`)
client.commands.set(file.replace(".js",""),cmd)
console.log("Komut yüklendi:",file)
}catch(err){
console.log("Komut hatalı:",file,err)
}
}
}

// EVENT LOADER
if(fs.existsSync("./events")){
const events = fs.readdirSync("./events")
for(const file of events){
try{
require(`./events/${file}`)
console.log("Event yüklendi:",file)
}catch(err){
console.log("Event hatalı:",file,err)
}
}
}

// AFK sistemi
client.on("messageCreate", async message=>{

if(message.author.bot) return
if(!message.guild) return

try{

if(await db.get(`afk_${message.author.id}`)){
db.delete(`afk_${message.author.id}`)
message.channel.send("✅ Artık AFK değilsin")
}

const user = message.mentions.users.first()
if(!user) return

const sebep = await db.get(`afk_${user.id}`)
if(sebep){
message.reply(`💤 Bu kullanıcı AFK\nSebep: ${sebep}`)
}

}catch(err){
console.log("AFK hata:",err)
}

})

// Küfür engel
client.on("messageCreate", async message=>{

if(!message.guild) return
if(message.author.bot) return

const aktif = db.get(`kufurengel_${message.guild.id}`)
if(!aktif) return

const kufurler = ["amk","oç","piç","yarrak"]

if(kufurler.some(x=>message.content.toLowerCase().includes(x))){
if(message.member.permissions.has("Administrator")) return
message.delete()
message.channel.send("🚫 Küfür yasak!")
}

})

// Global hata koruma
process.on("unhandledRejection", err=>{
console.log("Unhandled Promise:",err)
})

process.on("uncaughtException", err=>{
console.log("Uncaught Exception:",err)
})

client.login(process.env.TOKEN)
