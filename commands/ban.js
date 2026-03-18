const { EmbedBuilder, PermissionsBitField } = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply("Yeterli yetkiniz yok.");

    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    let sebep = args.slice(1).join(' ') || "Sebep belirtilmedi";

    if (!user) return message.reply("Lütfen bir kullanıcı belirtin.");

    try {
        await message.guild.members.ban(user.id, { reason: sebep });

        const banEmbed = new EmbedBuilder()
            .setColor("#2ecc71") // Görseldeki yeşil tonu
            .setDescription(`### Kullanıcı Başarıyla Yasaklandı\n\n**Yasaklanan Kullanıcı**\n${user.tag} (${user.id})\n**Yetkili**\n${message.author.username}\n**Sebep**\n${sebep}\n**Silinen Mesajlar**\n0 günlük\n**Tarih**\n<t:${Math.floor(Date.now() / 1000)}:F>`);

        message.channel.send({ embeds: [banEmbed] });
    } catch (e) {
        message.reply("Kullanıcıyı yasaklayamadım.");
    }
};

exports.conf = { aliases: ["yasakla"] };
exports.help = { name: "ban" };
