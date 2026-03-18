const { 
  Client, 
  Collection, 
  GatewayIntentBits, 
  Partials, 
  Events, 
  REST, 
  Routes, 
  EmbedBuilder, 
  ActivityType 
} = require("discord.js");
const db = require("croxydb");
const fs = require("fs");
const path = require("path");
const noblox = require("noblox.js");
require("dotenv").config();

// Discord Client Ayarları
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

client.commands = new Collection();
client.db = db;
const commands = [];

// 🔒 YETKİ VE SUNUCU AYARLARI
const ALLOWED_USERS = ["752639955049644034", "1389930042200559706"];
const GUILD_ID = "SUNUCU_ID_BURAYA"; // Kendi sunucu ID'ni buraya yaz kanka

// --- KOMUT YÜKLEYİCİ ---
const commandsPath = path.join(__dirname, "commands");
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
            console.log(`📡 Komut Yüklendi: ${command.data.name}`);
        }
    }
}

// --- BOT HAZIR OLDUĞUNDA ---
client.once(Events.ClientReady, async () => {
    console.log(`✅ ${client.user.tag} Olarak Giriş Yapıldı!`);
    
    // Botun Durumu (Erensi Style)
    client.user.setPresence({
        activities: [{ name: `Erensi Bot v14`, type: ActivityType.Watching }],
        status: 'online',
    });

    // Slash Komutlarını Kaydet
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    try {
        console.log("🔄 Slash komutları güncelleniyor...");
        await rest.put(Routes.applicationGuildCommands(client.user.id, GUILD_ID), { body: commands });
        console.log("🚀 Komutlar başarıyla tanımlandı.");
    } catch (error) {
        console.error("❌ Komut Hatası:", error);
    }

    // Roblox Bağlantısı
    if (process.env.ROBLOX_COOKIE) {
        try {
            const user = await noblox.setCookie(process.env.ROBLOX_COOKIE);
            console.log(`🟦 Roblox: ${user.UserName} hesabı aktif.`);
        } catch (err) {
            console.log("🟥 Roblox Cookie hatalı veya süresi dolmuş.");
        }
    }
});

// --- KOMUT ÇALIŞTIRICI ---
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // Yetki Kontrolü
    if (!ALLOWED_USERS.includes(interaction.user.id)) {
        return interaction.reply({ content: "❌ Bu botun komutlarını kullanmaya yetkin yok!", ephemeral: true });
    }

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        const errorMsg = "Komut çalışırken bir hata oluştu!";
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: errorMsg, ephemeral: true });
        } else {
            await interaction.reply({ content: errorMsg, ephemeral: true });
        }
    }
});

// Hataları Yakala (Botun Çökmesini Engeller)
process.on('unhandledRejection', error => console.error('Hata:', error));
process.on('uncaughtException', error => console.error('Kritik Hata:', error));

client.login(process.env.TOKEN);
