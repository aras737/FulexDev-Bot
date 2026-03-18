const { EmbedBuilder } = require('discord.js');

const mapping = {
    ' ': '   ',
    '0': ':zero:', '1': ':one:', '2': ':two:', '3': ':three:', '4': ':four:',
    '5': ':five:', '6': ':six:', '7': ':seven:', '8': ':eight:', '9': ':nine:',
    '!': ':grey_exclamation:', '?': ':grey_question:', '#': ':hash:', '*': ':asterisk:',
    'i': ':regional_indicator_i:', 'İ': ':regional_indicator_i:',
    'ı': ':regional_indicator_i:', 'ş': ':regional_indicator_s:',
    'Ş': ':regional_indicator_s:', 'ğ': ':regional_indicator_g:',
    'Ğ': ':regional_indicator_g:', 'ü': ':regional_indicator_u:',
    'Ü': ':regional_indicator_u:', 'ö': ':regional_indicator_o:',
    'Ö': ':regional_indicator_o:', 'ç': ':regional_indicator_c:',
    'Ç': ':regional_indicator_c:'
};

// Alfabeyi otomatik eşleştiriyoruz
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = `:regional_indicator_${c}:`;
    mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

exports.run = async (client, message, args) => {
    let metin = args.join(' ');
    
    if (!metin) return message.reply('**❌ Bir mesaj belirtmelisin!**');
    if (metin.length > 50) return message.reply('**❌ En fazla 50 karakter kullanabilirsin!**');

    const emojiMetin = metin
        .split('')
        .map(c => mapping[c] || c)
        .join('');

    // Sadece metin olarak gönderiyoruz (Emoji olması için embed içine koymamak daha iyidir)
    message.channel.send(emojiMetin);
};

exports.conf = {
    aliases: ['emojiyazısı', 'emojiyaz', 'emoji-yazı'],
    permLevel: 0
};

exports.help = {
    name: 'emojiyazı'
};
