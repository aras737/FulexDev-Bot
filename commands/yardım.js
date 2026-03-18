const { EmbedBuilder } = require("discord.js");

exports.run = async (client, message, args) => {
    // Prefix'i buraya yaz veya ayarlar dosyasından çek: client.config.prefix gibi
    const prefix = "e!"; 

    // Kendi emojilerini buraya ID olarak giriyorsun
    // <a:isim:id> hareketli emojiler için, <:isim:id> sabit emojiler için kullanılır
    const emoji = {
        ayarlar: "<:ayarlar:1483918360495394980>", 
        eglence: "🎨",     // Kendi emoji ID'ni bulunca burayı da değiştir
        emojirrol: "🐱", 
        guvenlik: "🛡️", 
        kullanici: "🏃", 
        premium: "🥊", 
        puan: "🏆", 
        yetkili: "🔨", 
        bot: "🤖"
    };

    const yardimEmbed = new EmbedBuilder()
        .setColor("#fdfdfd") // Görseldeki o temiz beyaz/gri tonu
        .setTitle("Kategoriler")
        .setDescription(`
${emoji.ayarlar} | **${prefix}ayarlamalı** | Otomatik moderasyon komutlarını gösterir.

${emoji.eglence} | **${prefix}eğlence** | Eğlence komutlarını gösterir.

${emoji.emojirrol} | **${prefix}emojirrol** | Emojiyle Rol alma komutlarını gösterir.

${emoji.guvenlik} | **${prefix}güvenlik** | Güvenlik komutlarını gösterir.

${emoji.kullanici} | **${prefix}kullanıcı** | Kullanıcı komutlarını gösterir.

${emoji.premium} | **${prefix}premium** | Premium Üye paketlerini gösterir.

${emoji.puan} | **${prefix}puanmarket** | Puanla alınan ayrıcalıkları gösterir.

${emoji.yetkili} | **${prefix}yetkili** | Yetkili komutlarını gösterir.

${emoji.bot} | **${prefix}bot** | Ana komutları gösterir.

🔔 **ErensiBOT Bağlantılar** 🔔
[Botu Sunucuna Ekle](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)
[Destek Sunucum](https://discord.gg/DAVET_LINKI)
[Bota Oy Ver](https://top.gg/bot/${client.user.id}/vote)
        `)
        .setFooter({ 
            text: "ErensiBOT", 
            iconURL: client.user.displayAvatarURL({ dynamic: true }) 
        });

    message.channel.send({ embeds: [yardimEmbed] });
};

exports.conf = {
    aliases: ["y", "help", "h"],
    permLevel: 0
};

exports.help = {
    name: "yardım"
};
