const { EmbedBuilder, PermissionsBitField } = require("discord.js");

exports.run = async (client, message, args) => {
    // Yetki kontrolü
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return message.reply("❌ | Bu komutu kullanmak için **Üyeleri Yasakla** yetkisine sahip olmalısın!");
    }

    // Yasaklı listesini çekiyoruz
    message.guild.bans.fetch().then(bans => {
        if (bans.size === 0) {
            const errorEmbed = new EmbedBuilder()
                .setTitle("❌ Hata!")
                .setColor("#ff0000")
                .setDescription("Sunucunuzda yasaklanmış kullanıcı bulunmuyor.");
            return message.channel.send({ embeds: [errorEmbed] });
        }

        // Görseldeki gibi numaralı ve detaylı liste oluşturma
        // İlk 15 kişiyi gösteriyoruz (Mesaj karakter sınırına takılmamak için)
        const data = bans.map((ban, index) => {
            return `**${index + 1}. ${ban.user.tag}**\n**ID:** ${ban.user.id}\n**Sebep:** ${ban.reason || "Sebep belirtilmedi"}`;
        }).slice(0, 15).join("\n\n");

        const listEmbed = new EmbedBuilder()
            .setColor("#e74c3c") // Görseldeki kırmızı tonu
            .setTitle("Yasaklı Kullanıcı Listesi")
            .setDescription(`Toplam yasaklı kullanıcı: ${bans.size}\n\n${data}`)
            .setFooter({ text: `${client.user.username} Ban Sistemi`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        message.channel.send({ embeds: [listEmbed] });
    }).catch(err => {
        console.error(err);
        message.reply("❌ | Yasaklı listesi alınırken bir hata oluştu.");
    });
};

exports.conf = {
    aliases: ["banlist", "yasaklılar"],
    permLevel: 0
};

exports.help = {
    name: "ban-list"
};
