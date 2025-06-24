const { malvin } = require("../malvin");

malvin({
  pattern: "vv",
  alias: ["viewonce", "retrive"],
  react: '🐳',
  desc: "خاص بالمالك - استرجاع رسالة مشاهدة مرة واحدة",
  category: "المالك",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    if (!isCreator) {
      return await client.sendMessage(from, {
        text: "📛 *هذا الأمر خاص بالمالك فقط!*"
      }, { quoted: message });
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "🍁 *يرجى الرد على رسالة مشاهدة لمرة واحدة لاسترجاعها!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: (match.quoted.text || '') + "\n\n🔓 تم الاسترجاع بواسطة *طرزان الواقدي*",
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: (match.quoted.text || '') + "\n\n🔓 تم الاسترجاع بواسطة *طرزان الواقدي*",
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ *الأنواع المدعومة فقط: صورة، فيديو، صوت*"
        }, { quoted: message });
    }

    await client.sendMessage(from, messageContent, options);
  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ *حدث خطأ أثناء الاسترجاع:*\n" + error.message
    }, { quoted: message });
  }
});
