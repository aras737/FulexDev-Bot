const {EmbedBuilder} = require("discord.js");
const { prefix } = require("../config.js")

exports.run = async (client, message, args) => {

  const user = message.mentions.users.first()
  if(!user) return message.channel.send("Lütfen birini etiketle!")
  
  const tahmin = Math.floor(Math.random() * 99) + 1
  var kalp;
  var yorum; 
  
  if(tahmin <= 25) {
    kalp = `❤️🖤🖤🖤🖤🖤`
    yorum = "Bu iş olmaz sen bunu unut."
  }
  
  if(tahmin >= 25) {
    kalp = `❤️❤️🖤🖤🖤🖤`
    yorum = "Azıcıkta olsa bir şeyler hissediyor sana :)"
  }
  
  if(tahmin >= 50) {
    kalp = `❤️❤️❤️🖤🖤🖤`
    yorum = "Eh biraz biraz bir şeyler var gibi."
  }
  
  if(tahmin >= 75) {
     kalp = `❤️❤️❤️❤️🖤🖤`
     yorum = "Biraz daha uğraşırsan bu iş olacak gibi :)"
  }

  if(tahmin >= 85) {
    kalp = `❤️❤️❤️❤️❤️🖤`
    yorum = "Oluyor gibi :))"
  }
  
  if(tahmin === 100) {
    kalp = `❤️❤️❤️❤️❤️❤️`
    yorum = "Sizi evlendirelim <3"
  }
  
  message.channel.send({ embeds: [
    new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Aşk Yüzdesi: %${tahmin}\n${kalp}\n\n${yorum}`)
  ]})
  
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "aşkölçer"
};
